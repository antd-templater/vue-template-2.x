<template>
  <section class="button-table-container">
    <a-card
      title="按钮资源"
      style="display: flex; flex-flow: column nowrap; height: 100%"
      :bodyStyle="{
        flex: '1 1 auto',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
      }"
      :headStyle="{ flex: '0 0 auto', overflow: 'hidden' }"
      :bordered="false"
    >
      <div slot="extra">
        <a-button
          v-if="parentNode.value"
          icon="plus"
          type="primary"
          @click="doDrawerAdd()"
        />
        <a-button
          v-if="parentNode.value"
          icon="delete"
          type="danger"
          style="margin-left: 10px"
          @click="doDrawerDel()"
        />
      </div>

      <div
        class="table-container"
        style="height: 100%"
      >
        <s-table
          ref="table"
          :data="loadData"
          :scroll="scroll"
          :columns="columns"
          :customRow="rowClick"
          :rowSelection="rowSelection"
          :clearSelection="clearSelection"
          :showPagination="showPagination"
          :pageSizeOptions="pageSizeOptions"
          :pageSize="defaultPageSize"
          :rowClassName="rowClassName"
          :pagination="pagination"
          :immediate="immediate"
          :bordered="bordered"
          rowKey="resourceId"
          striped
        >
          <template #EditCellInput="text, record, index, column">
            <s-edit-cell-input
              :text="text"
              :cellStyle="cellStyle"
              :status.sync="cellStatus"
              @change="$set(record, column.key, $event.value)"
              @confirm="doTableModify([{ ...record }])"
            />
          </template>
          <template #activity="value, record">
            <a-switch
              :checked="value === 'Y'"
              checkedChildren="开"
              unCheckedChildren="关"
              @click.native.stop="() => {}"
              @change="doActivityChange(record, 'activity', $event)"
            />
          </template>
          <template #action="text, record">
            <a
              href="javascript: void(0)"
              style="display: inline-block; margin: 7px; color: #f44848"
              @click.stop="doDrawerDel(record)"
            >
              删除
            </a>
          </template>
        </s-table>
      </div>
    </a-card>

    <button-drawer
      ref="buttonDrawer"
      :queryOptions="queryOptions"
      @submitted="doTableQuery"
      @deleted="doTableQuery"
    />
  </section>
</template>

<script>
import { requestBuilder, deepUpdate } from '@/utils/util'
import * as resourceApi from '@/api/resource'

import ButtonDrawer from './ButtonDrawer'

export default {
  name: 'ButtonTable',
  components: {
    ButtonDrawer
  },
  props: {
    parentNode: {
      type: Object,
      default: function () {
        return {}
      }
    },
    parentInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      // 下拉框选项
      queryOptions: {
        buttons: [
          {
            label: '新增',
            value: 'add',
            sort: 1
          },
          {
            label: '删除',
            value: 'del',
            sort: 2
          },
          {
            label: '修改',
            value: 'edit',
            sort: 3
          },
          {
            label: '查询',
            value: 'query',
            sort: 4
          },
          {
            label: '重置',
            value: 'reset',
            sort: 5
          },
          {
            label: '上传',
            value: 'upload',
            sort: 6
          },
          {
            label: '上报',
            value: 'up',
            sort: 7
          },
          {
            label: '审批',
            value: 'approve',
            sort: 8
          },
          {
            label: '导出',
            value: 'export',
            sort: 9
          }
        ]
      },

      // 查询参数
      queryParam: {
        parentId: '',
        resourceType: 'b'
      },

      // 表格配置
      columns: [
        {
          title: '按钮名称',
          dataIndex: 'title',
          scopedSlots: { customRender: 'EditCellInput' },
          ellipsis: true,
          width: 120
        },
        {
          title: '按钮标识',
          dataIndex: 'resourceName',
          scopedSlots: { customRender: 'EditCellInput' },
          ellipsis: true,
          width: 150
        },
        {
          title: '按钮状态',
          dataIndex: 'activity',
          scopedSlots: { customRender: 'activity' },
          ellipsis: true,
          width: 100
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: 80
        }
      ],
      scroll: {
        x: '100%',
        scrollToFirstRowOnChange: false
      },
      rowSelection: {
        type: 'checkbox',
        onChange: this.doTableChange
      },
      pagination: {
        total: 0,
        current: 1,
        pageSize: 20,
        pageSizeOptions: ['10', '20', '25', '30', '50', '100', '200'],
        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 (共 ${total} 条)`,
        hideOnSinglePage: false,
        showSizeChanger: true,
        showLessItems: true
      },
      dataSource: [],
      selectedRows: [],
      selectedRowKeys: [],
      pageSizeOptions: ['10', '15', '20', '25', '30'],
      defaultPageSize: 15,
      clearSelection: true,
      showPagination: false,
      immediate: false,
      bordered: false,
      loadData: parameter => {
        const param = requestBuilder(
          '',
          deepUpdate(
            {
              parentId: '',
              resourceType: ''
            },
            this.queryParam
          ),
          1,
          9999,
          parameter.sortField,
          parameter.sortOrder
        )
        return resourceApi.getResourceInfoList(param).then(res => {
          if (res.code !== '0000') {
            this.$notification.error({
              message: '系统消息',
              description: res.message || '按钮资源查询失败!'
            })
            return Promise.reject(res)
          }

          // 储存数据
          this.dataSource = res.result.data

          this.selectedNode = this.dataSource.find(
            record => record.resourceId === this.selectedNode.resourceId
          )

          this.selectedNode = this.selectedNode || { ...this.dataSource[0] }

          this.doLinkage()

          // 返回数据
          return res
        })
      },
      rowClick: record => ({
        on: {
          click: () => {
            this.selectedNode = { ...record }
            this.doLinkage()
          }
        }
      }),
      rowClassName: record => {
        return record.resourceId === this.selectedNode.resourceId
          ? 'row-active-td cursor-pointer'
          : 'cursor-pointer'
      },

      // 当前节点
      selectedNode: {},

      // 辅助字段
      cellStyle: {
        inputWrapper: {
          maxWidth: '140px',
          display: 'inline-block',
          paddingRight: '36px'
        },
        textWrapper: {
          width: 'auto',
          display: 'inline-block',
          paddingRight: '36px'
        }
      },
      cellStatus: false
    }
  },
  mounted () {
    this.doResizeObserve()
  },
  destroyed () {
    this.doResizeDestroy()
  },
  methods: {
    /**
     * @description 通知联动查询
     * @returns {undefined}
     */
    doLinkage () {
      this.$emit('linkage', {
        node: this.selectedNode,
        nodes: [...this.dataSource]
      })
    },

    /**
     * @description 监听容器宽高变化
     * @returns {undefined}
     */
    doResizeObserve () {
      if (window.ResizeObserver) {
        const optimize = () => {
          return () => {
            const $table = this.$refs.table.$el
            const $parent = $table.parentElement
            const $thead = $table.querySelector('.ant-table-fixed > .ant-table-thead')
            const parentHeight = ($parent && $parent.clientHeight) || 0
            const theadHeight = ($thead && $thead.clientHeight) || 0
            const scrollHeight = parentHeight - theadHeight

            if (scrollHeight) {
              this.scroll = {
                ...this.scroll,
                y: scrollHeight
              }
            }
          }
        }
        this.resizeObserver = new window.ResizeObserver(optimize())
        this.resizeObserver.observe(this.$refs.table.$el.parentElement)
      }
    },

    /**
     * @description 销毁容器监听器
     * @returns {undefined}
     */
    doResizeDestroy () {
      if (window.ResizeObserver && this.resizeObserver) {
        this.resizeObserver.disconnect()
      }
    },

    /**
     * @description 表格勾选事件
     * @param {Array <String>} selectedRowKeys
     * @param {Array <Object>} selectedRows
     * @returns {undefined}
     */
    doTableChange (selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
    },

    /**
     * @description 表格状态
     * @param {Boolean} state
     * @returns {undefined}
     */
    doTableReady (state) {
      this.$refs.table.ready(state)
    },

    /**
     * @description 表格数据查询
     * @param {Boolean} close
     * @returns {undefined}
     */
    doTableQuery (close) {
      if (close) {
        this.doDrawerClose()
      }
      this.cellStatus = false
      this.$refs.table.rowSelection.type = 'checkbox'
      this.$refs.table.refresh(true)
    },

    /**
     * @description 表格数据清理
     * @param {Boolean} close
     * @returns {undefined}
     */
    doTableClear (close) {
      if (close) {
        this.doDrawerClose()
      }
      this.cellStatus = false
      this.$refs.table.rowSelection.type = 'checkbox'
      this.$refs.table.clear()
    },

    /**
     * @description 数据状态修改
     * @param {Object} record
     * @param {String} key
     * @param {Any} value
     * @returns {Promise}
     */
    doActivityChange (record, key, value) {
      // 设置状态
      this.$set(record, key, value ? 'Y' : 'N')

      // 更新状态
      return this.doTableModify([record]).catch(() => {
        this.$set(record, key, !value ? 'Y' : 'N')
      })
    },

    /**
     * @description 表格数据修改
     * @param {Array} records
     * @returns {Promise}
     */
    doTableModify (records) {
      return resourceApi.modifyResourceInfo(requestBuilder('update', records[0])).then(res => {
        if (res.code !== '0000') {
          this.$notification.error({
            message: '系统消息',
            description: '修改失败'
          })
          return Promise.reject(res)
        }
        this.$notification.success({
          message: '系统消息',
          description: '修改成功'
        })
        this.doTableQuery(true)
      })
    },

    /**
     * @description 信息 - 抽屉框新增操作
     * @returns {undefined}
     */
    doDrawerAdd () {
      this.$refs.buttonDrawer.doAdd([
        {
          parentId: this.parentNode.value,
          component: this.parentInfo.component
        }
      ])
    },

    /**
     * @description 信息 - 抽屉框编辑操作
     * @param {Object} record
     * @returns {undefined}
     */
    doDrawerEdit (record) {
      this.$refs.buttonDrawer.doEdit([record])
    },

    /**
     * @description 信息 - 抽屉框删除操作
     * @param {Object} record
     * @returns {undefined}
     */
    doDrawerDel (record) {
      if (!record) {
        if (this.selectedRows.length === 0) {
          this.$message.error('请选择所要删除的按钮资源!')
          return
        }
      }
      this.$confirm({
        title: '是否确认删除所选按钮?',
        content: '删除操作会导致相关页面按钮丢失，请慎重考虑!',
        okType: 'danger',
        okText: '删除',
        onOk: () => {
          this.$refs.buttonDrawer.doDel(record ? [record] : this.selectedRows)
        }
      })
    },

    /**
     * @description 信息 - 抽屉框关闭操作
     * @returns {undefined}
     */
    doDrawerClose () {
      this.$refs.buttonDrawer.doClose()
    }
  }
}
</script>

<style lang="less" scoped>
.button-table-container {
  width: 100%;
  height: 100%;

  :deep(tr.row-active-td) {
    & > td {
      position: relative;
      &:first-child::before {
        content: '';
        width: 3px;
        height: 20px;
        position: absolute;
        top: calc(50% - 10px);
        left: 0;
        background-color: var(--primary-color);
      }
      &:first-child::after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: calc(50% - 10px);
        left: 0;
        border-top: solid 10px transparent;
        border-bottom: solid 10px transparent;
        border-left: solid 10px var(--primary-color);
        border-right: none;
      }
    }
  }
}
</style>

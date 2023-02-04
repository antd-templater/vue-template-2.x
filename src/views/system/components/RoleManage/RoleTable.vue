<template>
  <section class="role-table-container">
    <s-table
      ref="table"
      :data="loadData"
      :scroll="scroll"
      :columns="columns"
      :customRow="rowClick"
      :clearSelection="clearSelection"
      :showPagination="showPagination"
      :rowClassName="rowClassName"
      :pagination="pagination"
      :immediate="immediate"
      :bordered="bordered"
      rowKey="roleId"
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

      <template #EditCellSelect="text, record, index, column">
        <s-edit-cell-select
          :text="text"
          :cellStyle="cellStyle"
          :status.sync="cellStatus"
          :options="queryOptions.dataFlag"
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

      <template #modifyDate="date">
        <span>{{ takeTimeToFormat(date, 'YYYY-MM-DD HH:mm:ss') }}</span>
      </template>

      <template #action="text, record">
        <a
          href="javascript: void(0)"
          style="display: inline-block; margin: 7px"
          @click.stop="doResourceOpen(record)"
        >
          资源配置
        </a>
        <a
          href="javascript: void(0)"
          style="display: inline-block; margin: 7px; color: #f44848"
          @click.stop="doDrawerDel(record)"
        >
          删除
        </a>
      </template>
    </s-table>

    <!-- 角色抽屉框 -->
    <role-drawer
      ref="roleDrawer"
      :queryOptions="queryOptions"
      @submitted="doTableQuery"
      @deleted="doTableQuery"
    />

    <!-- 资源抽屉框 -->
    <resource-drawer
      ref="resourceDrawer"
      @submitted="() => {}"
    />
  </section>
</template>

<script>
import { requestBuilder, deepUpdate, takeTimeToFormat } from '@/utils/util'
import * as roleApi from '@/api/role'

import RoleDrawer from './RoleDrawer'
import ResourceDrawer from './ResourceDrawer'

export default {
  name: 'RoleTable',
  components: {
    RoleDrawer,
    ResourceDrawer
  },
  props: {
    pagination: {
      type: Object,
      default: function () {
        return {
          total: 0,
          current: 1,
          pageSize: 20,
          pageSizeOptions: ['10', '20', '25', '30', '50', '100', '200'],
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 (共 ${total} 条)`,
          hideOnSinglePage: false,
          showSizeChanger: true,
          showLessItems: true
        }
      }
    }
  },
  data () {
    return {
      // 下拉框选项
      queryOptions: {
        dataFlag: [
          {
            label: '用户级',
            value: '0'
          },
          {
            label: '部门级',
            value: '1'
          },
          {
            label: '公司级',
            value: '2'
          }
        ]
      },

      // 查询参数
      queryParam: {
        roleName: '',
        activity: ''
      },

      // 表格配置
      columns: [
        {
          title: '角色名称',
          dataIndex: 'roleName',
          scopedSlots: { customRender: 'EditCellInput' },
          ellipsis: true,
          width: 120
        },
        {
          title: '数据范围',
          dataIndex: 'dataFlag',
          scopedSlots: { customRender: 'EditCellSelect' },
          ellipsis: true,
          width: 100
        },
        {
          title: '角色状态',
          dataIndex: 'activity',
          scopedSlots: { customRender: 'activity' },
          ellipsis: true,
          width: 100
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: 120
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
      dataSource: [],
      selectedRows: [],
      selectedRowKeys: [],
      clearSelection: true,
      showPagination: false,
      immediate: true,
      bordered: false,
      loadData: parameter => {
        const param = requestBuilder(
          '',
          deepUpdate(
            {
              roleName: '',
              activity: ''
            },
            this.queryParam
          ),
          parameter.pageNo,
          parameter.pageSize,
          parameter.sortField,
          parameter.sortOrder
        )
        return roleApi.getRoleInfoByPages(param).then(res => {
          if (res.code !== '0000') {
            this.$notification.error({
              message: '系统消息',
              description: res.message || '角色查询失败!'
            })
            return Promise.reject(res)
          }

          // 储存数据
          this.dataSource = res.result.data

          // 返回数据
          return res
        })
      },
      rowClick: record => ({
        on: {}
      }),
      rowClassName: record => {
        return ''
      },

      // 辅助字段
      cellStyle: {
        inputWrapper: {
          width: 'auto',
          maxWidth: '180px',
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
     * @description 根据格式转换 时间
     * @param {Date | String | Number} date
     * @param {String} format?
     * @return {String}
     */
    takeTimeToFormat,

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
     * @description 表格数据查询
     * @returns {undefined}
     */
    doTableQuery () {
      this.doDrawerClose()
      this.doResourceClose()
      this.cellStatus = false
      this.$refs.table.refresh(true)
    },

    /**
     * @description 根据分页查询
     * @param {Object} options
     * @returns {undefined}
     */
    doPageQuery (options) {
      this.doDrawerClose()
      this.doResourceClose()
      this.cellStatus = false
      this.$refs.table.loadData(options)
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
      return roleApi.modifyRoleInfo(requestBuilder('update', records[0])).then(res => {
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
      this.$refs.roleDrawer.doAdd([{}])
    },

    /**
     * @description 信息 - 抽屉框编辑操作
     * @param {Object} record
     * @returns {undefined}
     */
    doDrawerEdit (record) {
      this.$refs.roleDrawer.doEdit([record])
    },

    /**
     * @description 信息 - 抽屉框删除操作
     * @param {Object} record
     * @returns {undefined}
     */
    doDrawerDel (record) {
      this.$confirm({
        title: '是否确认删除所选角色?',
        content: '删除操作会导致相关权限丢失，请慎重考虑!',
        okType: 'danger',
        okText: '删除',
        onOk: () => {
          this.$refs.roleDrawer.doDel([record])
        }
      })
    },

    /**
     * @description 信息 - 抽屉框关闭操作
     * @returns {undefined}
     */
    doDrawerClose () {
      this.$refs.roleDrawer.doClose()
    },

    /**
     * @description 资源 - 抽屉框打开操作
     * @param {Object} record
     * @returns {undefined}
     */
    doResourceOpen (record) {
      this.$refs.resourceDrawer.doOpen(record)
    },

    /**
     * @description 资源 - 抽屉框关闭操作
     * @returns {undefined}
     */
    doResourceClose () {
      this.$refs.resourceDrawer.doClose()
    }
  }
}
</script>

<style lang="less" scoped>
.role-table-container {
  width: 100%;
  height: 100%;
}
</style>

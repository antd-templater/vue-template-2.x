<template>
  <section class="dictionary-child-table-container">
    <base-table
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
      rowKey="codeSysId"
      striped
    >
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
          style="display: inline-block; margin: 7px"
          @click.stop="doDrawerEdit(record)"
        >
          修改
        </a>
      </template>
    </base-table>

    <!-- 代码抽屉框 -->
    <dictionary-child-drawer
      ref="dictionaryChildDrawer"
      @submitted="doTableQuery"
      @deleted="doTableQuery"
    />
  </section>
</template>

<script>
import { requestBuilder, deepUpdate } from '@/utils/util'
import * as dictionaryApi from '@/api/dictionary'

import DictionaryChildDrawer from './DictionaryChildDrawer'

export default {
  name: 'DictionaryChildTable',
  components: {
    DictionaryChildDrawer
  },
  props: {
    selectNode: {
      type: Object,
      default: function () {
        return {
          codeClassName: '',
          codeClassId: ''
        }
      }
    },
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
      // 查询参数
      queryParam: {
        codeClassId: '',
        codeName: '',
        activity: ''
      },

      // 表格配置
      columns: [
        {
          title: '代码名称',
          dataIndex: 'codeName',
          width: 120
        },
        {
          title: '代码编码',
          dataIndex: 'codeId',
          width: 120
        },
        {
          title: '补充说明1',
          dataIndex: 'udf1',
          width: 100
        },
        {
          title: '补充说明2',
          dataIndex: 'udf2',
          width: 90
        },
        {
          title: '补充说明3',
          dataIndex: 'udf3',
          width: 90
        },
        {
          title: '状态',
          dataIndex: 'activity',
          scopedSlots: { customRender: 'activity' },
          align: 'center',
          width: 75
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: 75
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
      immediate: false,
      bordered: false,
      loadData: parameter => {
        if (!this.queryParam.codeClassId) {
          return Promise.resolve([])
        }

        const param = requestBuilder(
          '',
          deepUpdate(
            {
              codeClassId: '',
              codeName: '',
              activity: ''
            },
            this.queryParam
          ),
          parameter.pageNo,
          parameter.pageSize,
          parameter.sortField,
          parameter.sortOrder
        )
        return dictionaryApi.getBaseCode(param).then(res => {
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
          maxWidth: '120px',
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
      this.cellStatus = false
      this.$refs.table.refresh(false) // 保留当前页
    },

    /**
     * @description 表格数据清空
     * @returns {undefined}
     */
    doTableClear () {
      this.doDrawerClose()
      this.cellStatus = false
      this.$refs.table.clear()
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
     * @description 根据分页查询
     * @param {Object} options
     * @returns {undefined}
     */
    doPageQuery (options) {
      this.doDrawerClose()
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
      return dictionaryApi.modifyBaseCode(requestBuilder('update', records[0])).then(res => {
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
      this.$refs.dictionaryChildDrawer.doAdd([
        {
          codeClassName: this.selectNode.codeClassName,
          codeClassId: this.selectNode.codeClassId
        }
      ])
    },

    /**
     * @description 信息 - 抽屉框编辑操作
     * @param {Object} record
     * @returns {undefined}
     */
    doDrawerEdit (record) {
      this.$refs.dictionaryChildDrawer.doEdit([
        {
          codeClassName: this.selectNode.codeClassName,
          codeClassId: this.selectNode.codeClassId,
          ...record
        }
      ])
    },

    /**
     * @description 信息 - 抽屉框删除操作
     * @param {Object} record
     * @returns {undefined}
     */
    doDrawerDel (record) {
      this.$confirm({
        title: '是否确认删除所选项?',
        content: '删除操作会导致相关选项丢失，请慎重考虑!',
        okType: 'danger',
        okText: '删除',
        onOk: () => {
          this.$refs.dictionaryChildDrawer.doDel([record])
        }
      })
    },

    /**
     * @description 信息 - 抽屉框关闭操作
     * @returns {undefined}
     */
    doDrawerClose () {
      this.$refs.dictionaryChildDrawer.doClose()
    }
  }
}
</script>

<style lang="less" scoped>
.dictionary-child-table-container {
  width: 100%;
  height: 100%;
}
</style>

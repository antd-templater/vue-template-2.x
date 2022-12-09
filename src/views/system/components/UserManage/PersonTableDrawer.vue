<template>
  <section class="person-table-drawer-container">
    <a-drawer
      width="600"
      :title="title"
      :visible="visible"
      :bodyStyle="{ height: 'calc(100% - 55px)' }"
      :maskClosable="false"
      :getContainer="false"
      :destroyOnClose="false"
      @close="doClose()"
    >
      <div
        class="drawer-body-query"
        :style="{ width: '100%', height: '52px', padding: '0 15px' }"
      >
        <a-form
          layout="inline"
          label-width-auto
        >
          <a-row :gutter="20">
            <a-col :sm="12">
              <a-form-item label="姓名">
                <a-input-search
                  v-model="queryParam.personName"
                  allowClear
                  @search="doTableQuery"
                />
              </a-form-item>
            </a-col>
            <a-col
              :sm="10"
              :offset="1"
            >
              <a-form-item label="状态">
                <a-select
                  v-model="queryParam.isUser"
                  allowClear
                  @change="doTableQuery"
                >
                  <a-select-option value="Y">已导入</a-select-option>
                  <a-select-option value="N">可导入</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div
        class="drawer-body-table"
        :style="{ width: '100%', height: 'calc(100% - 52px)' }"
      >
        <s-table
          ref="table"
          :data="loadData"
          :scroll="scroll"
          :columns="columns"
          :customRow="rowClick"
          :rowSelection="rowSelection"
          :rowClassName="rowClassName"
          :clearSelection="clearSelection"
          :showPagination="showPagination"
          :pagination="pagination"
          :immediate="immediate"
          :bordered="bordered"
          rowKey="personSysId"
          style="height: 100%"
          striped
        >
          <template #orgId="key">
            <s-ellipsis
              :tooltip="true"
              :sheared="false"
              :length="10"
            >
              {{ takeLabelByKey(queryOptions.orgTree, key, ['shortName', 'label']) }}
            </s-ellipsis>
          </template>

          <template #isUser="value">
            <a-tag :color="value === 'Y' ? '#ff5500' : '#87d068'">
              {{ value === 'Y' ? '已是用户' : '可导入' }}
            </a-tag>
          </template>
        </s-table>
      </div>

      <!-- 按钮组 -->
      <div class="drawer-footer">
        <div class="footer-fixed">
          <a-button @click="doClose()">取消</a-button>
          <a-button
            type="primary"
            @click="doSubmit()"
          >确认</a-button>
        </div>
      </div>
    </a-drawer>
  </section>
</template>

<script>
import mixinUser from '@/mixins/mixinUser'
import { requestBuilder, deepUpdate, takeLabelByKey } from '@/utils/util'
import * as personApi from '@/api/person'

export default {
  name: 'PersonTableDrawer',
  mixins: [mixinUser],
  props: {
    queryOptions: {
      type: Object,
      default: function () {
        return {
          orgTree: [],
          departmentSysId: [],
          roleId: []
        }
      }
    }
  },
  data () {
    return {
      // 抽屉框
      title: '',
      visible: false,

      // 查询参数
      queryParam: {
        personName: '',
        isUser: 'N',
        activity: 'Y',
        orgId: '',
        range: 'all'
      },

      // 表格配置
      columns: [
        {
          title: '员工姓名',
          dataIndex: 'personName',
          ellipsis: true,
          width: 120
        },
        {
          title: '手机号',
          dataIndex: 'mobilePhone',
          ellipsis: true,
          width: 120
        },
        {
          title: '所属单位',
          dataIndex: 'orgId',
          scopedSlots: { customRender: 'orgId' },
          ellipsis: true,
          width: 110
        },
        {
          title: '状态',
          dataIndex: 'isUser',
          scopedSlots: { customRender: 'isUser' },
          align: 'center',
          width: 90
        }
      ],
      scroll: {
        x: '100%',
        scrollToFirstRowOnChange: false
      },
      rowSelection: {
        type: 'radio',
        onChange: this.doTableChange,
        getCheckboxProps: record => {
          return {
            props: {
              disabled: record.isUser === 'Y'
            }
          }
        }
      },
      dataSource: [],
      selectedRows: [],
      selectedRowKeys: [],
      clearSelection: true,
      showPagination: true,
      immediate: true,
      bordered: false,
      loadData: parameter => {
        const param = requestBuilder(
          '',
          deepUpdate(
            {
              personName: '',
              activity: 'Y',
              isUser: '',
              orgId: '',
              range: ''
            },
            {
              ...this.queryParam,
              orgId: this.userInfo.orgId
            }
          ),
          parameter.pageNo,
          parameter.pageSize,
          parameter.sortField,
          parameter.sortOrder
        )
        return personApi.getPersonInfoList(param).then(res => {
          if (res.code !== '0000') {
            this.$notification.error({
              message: '系统消息',
              description: res.message || '查询失败!'
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

      // 分页信息
      pagination: {
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
  },
  mounted () {
    this.doResizeObserve()
  },
  destroyed () {
    this.doResizeDestroy()
  },
  methods: {
    /**
     * @description 取出节点文本
     * @param {Array} tree
     * @param {String | Number} key
     * @param {String} value?
     * @param {String} children?
     * @return {String}
     */
    takeLabelByKey,

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
      this.$refs.table.refresh(true)
    },

    /**
     * @description 表格清空
     * @returns {undefined}
     */
    doTableClear () {
      this.$refs.table.clear()
    },

    /**
     * @description 打开抽屉框
     * @returns {undefined}
     */
    doOpen () {
      // 显示弹框
      this.title = '员工列表'
      this.visible = true

      // 参数
      this.queryParam = {
        personName: '',
        isUser: 'N',
        activity: 'Y',
        orgId: '',
        range: 'all'
      }

      // 表格
      this.dataSource = []
      this.selectedRows = []
      this.selectedRowKeys = []

      // 查询表格
      this.doTableQuery()
    },

    /**
     * @description 关闭抽屉框
     * @returns {undefined}
     */
    doClose () {
      if (this.visible) {
        // 弹窗
        this.title = ''
        this.visible = false

        // 参数
        this.queryParam = {
          personName: '',
          isUser: 'N',
          activity: 'Y',
          orgId: '',
          range: 'all'
        }

        // 表格
        this.dataSource = []
        this.selectedRows = []
        this.selectedRowKeys = []

        // 清空表格
        this.doTableClear()

        // 通知
        this.$emit('closed')
      }
    },

    /**
     * @description 提交确认
     * @returns {undefined}
     */
    doSubmit () {
      if (this.selectedRows.length === 0) {
        this.$message.error('请选择员工')
        return
      }

      // 当前记录
      const [record = {}] = this.selectedRows

      // 通知
      this.doClose()
      this.$emit('submitted', record)
    }
  }
}
</script>

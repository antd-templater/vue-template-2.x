<template>
  <section class="user-table-container">
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
      rowKey="id"
      striped
    >
      <template #orgId="key">
        <s-ellipsis
          :tooltip="true"
          :sheared="false"
          :length="16"
        >
          {{ takeLabelByKey(queryOptions.orgTree, key, ['shortName', 'label']) }}
        </s-ellipsis>
      </template>

      <template #deptId="key">
        <s-ellipsis
          :tooltip="true"
          :sheared="false"
          :length="16"
        >
          {{ takeLabelByKey(queryOptions.deptId, key) }}
        </s-ellipsis>
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
          @click.stop="doDrawerEdit(record)"
        >
          修改
        </a>
      </template>
    </s-table>

    <!-- 角色抽屉框 -->
    <user-drawer
      ref="userDrawer"
      :queryOptions="queryOptions"
      @submitted="doTableQuery"
      @deleted="doTableQuery"
    />
  </section>
</template>

<script>
import { requestBuilder, deepUpdate, takeLabelByKey, takeTimeToFormat } from '@/utils/util'
import * as roleApi from '@/api/role'
import * as userApi from '@/api/user'

import UserDrawer from './UserDrawer'

export default {
  name: 'UserTable',
  components: {
    UserDrawer
  },
  props: {
    queryOptions: {
      type: Object,
      default: function () {
        return {
          orgTree: [],
          deptId: [],
          roleId: []
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
        userNo: '',
        userName: '',
        mobilePhone: '',
        activity: ''
      },

      // 表格配置
      columns: [
        {
          title: '用户名',
          dataIndex: 'userNo',
          ellipsis: true,
          width: 130
        },
        {
          title: '用户姓名',
          dataIndex: 'userName',
          ellipsis: true,
          width: 130
        },
        {
          title: '手机号',
          dataIndex: 'mobilePhone',
          ellipsis: true,
          width: 120
        },
        {
          title: '职位',
          dataIndex: 'postName',
          width: 120
        },
        {
          title: '所属单位',
          dataIndex: 'orgId',
          scopedSlots: { customRender: 'orgId' },
          ellipsis: true,
          width: 120
        },
        {
          title: '所属部门',
          dataIndex: 'deptId',
          scopedSlots: { customRender: 'deptId' },
          ellipsis: true,
          width: 120
        },
        {
          title: '可用状态',
          dataIndex: 'activity',
          scopedSlots: { customRender: 'activity' },
          align: 'center',
          width: 80
        },
        {
          title: '操作',
          dataIndex: 'action',
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
              userNo: '',
              userName: '',
              mobilePhone: '',
              activity: ''
            },
            this.queryParam
          ),
          parameter.pageNo,
          parameter.pageSize,
          parameter.sortField,
          parameter.sortOrder
        )
        return userApi.getUserInfoList(param).then(res => {
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
      this.$refs.table.refresh(true)
    },

    /**
     * @description 根据分页查询
     * @param {Object} options
     * @returns {undefined}
     */
    doPageQuery (options) {
      this.doDrawerClose()
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
      return roleApi
        .getRoleInfoByUserNo(requestBuilder('update', { userNo: records[0].userNo }))
        .then(res => {
          if (res.code !== '0000') {
            this.$notification.error({
              message: '系统消息',
              description: '修改失败'
            })
            return Promise.reject(res)
          }

          // 处理角色
          Object.assign(records[0], {
            roleId: res.result.map(role => role.roleId)
          })

          // 调用修改
          userApi.modifyUserInfo(requestBuilder('update', records[0])).then(res => {
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
        })
    },

    /**
     * @description 信息 - 抽屉框新增操作
     * @returns {undefined}
     */
    doDrawerAdd () {
      this.$refs.userDrawer.doAdd([{}])
    },

    /**
     * @description 信息 - 抽屉框编辑操作
     * @param {Object} record
     * @returns {undefined}
     */
    doDrawerEdit (record) {
      this.$refs.userDrawer.doEdit([record])
    },

    /**
     * @description 信息 - 抽屉框删除操作
     * @param {Object} record
     * @returns {undefined}
     */
    doDrawerDel (record) {
      this.$confirm({
        title: '是否确认删除所选用户?',
        content: '删除操作会导致相关用户无法登录，请慎重考虑!',
        okType: 'danger',
        okText: '删除',
        onOk: () => {
          this.$refs.userDrawer.doDel([record])
        }
      })
    },

    /**
     * @description 信息 - 抽屉框关闭操作
     * @returns {undefined}
     */
    doDrawerClose () {
      this.$refs.userDrawer.doClose()
    }
  }
}
</script>

<style lang="less" scoped>
.user-table-container {
  width: 100%;
  height: 100%;
}
</style>

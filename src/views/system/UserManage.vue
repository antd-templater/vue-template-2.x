<template>
  <section class="section-container">
    <a-card
      style="
        display: flex;
        flex-flow: column nowrap;
        flex: 1 1 auto;
        width: 100%;
        height: 100%;
        overflow: hidden;
      "
      :bodyStyle="{
        display: 'flex',
        flexFlow: 'column nowrap',
        flex: '1 1 auto',
        overflow: 'hidden',
        position: 'relative',
      }"
      :headStyle="{
        flex: '0 0 auto',
        overflow: 'hidden',
      }"
      :bordered="false"
    >
      <div class="section-query-container">
        <user-query
          ref="query"
          @add="doTableAdd"
          @query="doTableQuery"
        />
      </div>
      <div class="section-table-container">
        <user-table
          ref="table"
          :queryOptions="queryOptions"
          :pagination="pagination"
        />
      </div>
    </a-card>
    <div class="section-pagination-container">
      <a-pagination
        v-bind="pagination"
        v-model="pagination.current"
        :pageSize.sync="pagination.pageSize"
        :pageSizeOptions="pagination.pageSizeOptions"
        @showSizeChange="doPageChange({ ...pagination, current: 1 })"
        @change="doPageChange({ ...pagination })"
      />
    </div>
  </section>
</template>

<script>
import { requestBuilder } from '@/utils/util'
import * as roleApi from '@/api/role'
import * as baseApi from '@/api/base'

import UserQuery from './components/UserManage/UserQuery'
import UserTable from './components/UserManage/UserTable'

export default {
  name: 'UserManage',
  components: {
    UserQuery,
    UserTable
  },
  data () {
    return {
      // 选项框
      queryOptions: {
        orgTree: [],
        deptId: [],
        roleId: []
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
    this.doOptionsQuery()
  },
  methods: {
    /**
     * @description 选项框查询
     * @returns {undefined}
     */
    doOptionsQuery () {
      // 组织
      baseApi.getTreeById({ id: 'orgTree' }).then(res => {
        if (res.code !== '0000') {
          return Promise.reject(new Error(res))
        }
        this.queryOptions.orgTree.splice(0)
        this.queryOptions.orgTree.push(...res.result)
      })

      // 部门
      baseApi.getOptionById({ id: 'dept', sqlParams: { orgId: '', isAll: '1' } }).then(res => {
        if (res.code !== '0000') {
          return Promise.reject(new Error(res))
        }
        this.queryOptions.deptId.splice(0)
        this.queryOptions.deptId.push(...res.result)
      })

      // 角色
      roleApi.getRoleInfoList(requestBuilder('', { activity: 'Y' })).then(res => {
        if (res.code !== '0000') {
          return Promise.reject(new Error(res))
        }
        this.queryOptions.roleId.splice(0)
        this.queryOptions.roleId.push(...res.result)
      })
    },

    /**
     * @description 表格数据新增
     * @returns {undefined}
     */
    doTableAdd () {
      this.$refs.table.doDrawerAdd()
    },

    /**
     * @description 表格数据查询
     * @param {Object} options
     * @returns {undefined}
     */
    doTableQuery (options) {
      Object.assign(this.$refs.table.queryParam, options)
      this.$refs.table.doTableQuery()
    },

    /**
     * @description 根据分页查询
     * @param {Object} options
     * @returns {undefined}
     */
    doPageChange (options) {
      this.$refs.table.doPageQuery(options)
    }
  }
}
</script>

<style lang="less" scoped>
.section-container {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: calc(100% - 40px);
  padding: 24px 24px 12px;
  position: absolute;
  .section-query-container {
    flex: 0 0 auto;
    width: 100%;
    margin-bottom: 8px;
  }
  .section-table-container {
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .section-pagination-container {
    flex: 0 0 auto;
    width: 100%;
    height: auto;
    text-align: right;

    :deep(.ant-pagination) {
      margin: 10px 0 0;
    }
  }
}
</style>

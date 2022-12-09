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
        <role-query
          ref="query"
          @add="doTableAdd"
          @query="doTableQuery"
        />
      </div>
      <div class="section-table-container">
        <role-table
          ref="table"
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
import RoleQuery from './components/RoleManage/RoleQuery'
import RoleTable from './components/RoleManage/RoleTable'

export default {
  name: 'RoleManage',
  components: {
    RoleQuery,
    RoleTable
  },
  data () {
    return {
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
  methods: {
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

<template>
  <section class="dictionary-main-container">
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
      :headStyle="{ flex: '0 0 auto', overflow: 'hidden' }"
      :bordered="false"
    >
      <div class="dictionary-main-query-container">
        <dictionary-main-query
          ref="query"
          @add="doTableAdd"
          @query="doTableQuery"
        />
      </div>
      <div class="dictionary-main-table-container">
        <dictionary-main-table
          ref="table"
          :pagination="pagination"
          @linkage="options => $emit('linkage', options)"
        />
      </div>
    </a-card>
    <div class="dictionary-main-pagination-container">
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
import DictionaryMainQuery from './DictionaryMainQuery'
import DictionaryMainTable from './DictionaryMainTable'

export default {
  name: 'DictionaryMain',
  components: {
    DictionaryMainQuery,
    DictionaryMainTable
  },
  data () {
    return {
      // 分页
      pagination: {
        total: 0,
        current: 1,
        pageSize: 20,
        pageSizeOptions: ['10', '20', '25', '30', '50', '100', '200'],
        showTotal: (total, range) => '',
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
      this.$refs.table.selectedNode = {}
      this.$refs.table.doPageQuery(options)
    }
  }
}
</script>

<style lang="less" scoped>
.dictionary-main-container {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  .dictionary-main-query-container {
    flex: 0 0 auto;
    width: 100%;
    margin-bottom: 8px;
  }
  .dictionary-main-table-container {
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .dictionary-main-pagination-container {
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

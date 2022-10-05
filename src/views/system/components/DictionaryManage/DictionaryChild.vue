<template>
  <section class="dictionary-child-container">
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
      <div class="dictionary-child-query-container">
        <dictionary-child-query
          ref="query"
          @add="doTableAdd"
          @query="doTableQuery"
        />
      </div>
      <div class="dictionary-child-table-container">
        <dictionary-child-table
          ref="table"
          :selectNode="selectNode"
          :pagination="pagination"
        />
      </div>
    </a-card>
    <div class="dictionary-child-pagination-container">
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
import DictionaryChildQuery from './DictionaryChildQuery'
import DictionaryChildTable from './DictionaryChildTable'

export default {
  name: 'DictionaryChild',
  components: {
    DictionaryChildQuery,
    DictionaryChildTable
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
      },

      // 当前节点
      selectNode: {}
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
    },

    /**
     * @description 联动查询
     * @param {Object} options
     * @returns {undefined}
     */
    doLinkage (options) {
      this.selectNode = options

      if (!this.selectNode.codeClassId) {
        Object.assign(this.$refs.table.queryParam, this.$refs.query.doReset(false))
        this.$refs.table.doTableClear()
      }

      if (
        this.selectNode.codeClassId &&
        this.$refs.table.queryParam.codeClassId !== this.selectNode.codeClassId
      ) {
        Object.assign(this.$refs.table.queryParam, this.$refs.query.doReset(false))
        this.$refs.table.queryParam.codeClassId = this.selectNode.codeClassId
        this.$refs.table.doTableReady(true)
        this.$refs.table.doTableQuery()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dictionary-child-container {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  .dictionary-child-query-container {
    flex: 0 0 auto;
    width: 100%;
    margin-bottom: 8px;
  }
  .dictionary-child-table-container {
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .dictionary-child-pagination-container {
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

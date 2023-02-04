<template>
  <section class="section-container">
    <div
      class="section-left-container"
      :style="{ width: collapse ? '0' : '334px' }"
    >
      <div class="section-left-tree">
        <organize-tree
          ref="tree"
          :queryOptions="queryOptions"
          @selectedNode="doSelectedNode"
          @queryTable="doTableQuery"
          @rootNodes="doRootNodes"
          @queryAll="doQueryAll"
        />
      </div>
    </div>
    <div class="section-right-container">
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
          padding: '16px 24px 24px',
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
          <organize-query
            ref="query"
            @add="doTableAdd"
            @query="doTableQuery"
          />
        </div>
        <div class="section-table-container">
          <organize-table
            ref="table"
            :queryOptions="queryOptions"
            :selectedNode="selectedNode"
            :pagination="pagination"
            :rootNodes="rootNodes"
            @queryAll="doQueryAll"
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
      <a-button
        type="link"
        class="section-tree-collapse"
        :icon="collapse ? 'double-right' : 'double-left'"
        @click.stop="collapse = !collapse"
      />
    </div>
  </section>
</template>

<script>
import * as baseApi from '@/api/base'

import OrganizeTree from './components/OrganizeManage/OrganizeTree'
import OrganizeQuery from './components/OrganizeManage/OrganizeQuery'
import OrganizeTable from './components/OrganizeManage/OrganizeTable'

export default {
  name: 'OrganizeManage',
  components: {
    OrganizeTree,
    OrganizeQuery,
    OrganizeTable
  },
  data () {
    return {
      // 选项框
      queryOptions: {
        orgTree: [],
        isOrg: [
          { label: '组织', value: 'Y' },
          { label: '部门', value: 'N' }
        ]
      },

      // 当前选择节点
      rootNodes: [],
      selectedNode: {},

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
      },

      // 折叠
      collapse: false
    }
  },
  mounted () {
    this.doQueryAll()
  },
  methods: {
    /**
     * @description 查询所有
     * @returns {undefined}
     */
    doQueryAll () {
      this.doOptionsQuery()
      this.doTreeQuery()
    },

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
    },

    /**
     * @description 树节点查询
     * @returns {undefined}
     */
    doTreeQuery () {
      this.$refs.tree.doRefresh()
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
      if (this.$refs.table.queryParam.orgId || this.$refs.table.queryParam.deptId) {
        this.$refs.table.doTableQuery()
      }
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
     * @description 选择当前节点
     * @param {Object} options
     * @returns {undefined}
     */
    doSelectedNode (options) {
      this.selectedNode = options
    },

    /**
     * @description 选择根节点
     * @param {Object} options
     * @returns {undefined}
     */
    doRootNodes (options) {
      this.rootNodes = options
    }
  }
}
</script>

<style lang="less" scoped>
.section-container {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: calc(100% - 40px);
  padding: 24px 24px 12px;
  position: absolute;
  .section-left-container {
    flex: 0 0 auto;
    width: 334px;
    height: 100%;
    overflow: hidden;
    transition: width 0.25s ease;
    .section-left-tree {
      width: 310px;
      height: 100%;
    }
  }
  .section-right-container {
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 auto;
    width: calc(100% - 334px);
    height: 100%;
    position: relative;
    .section-query-container {
      flex: 0 0 auto;
      width: 100%;
      margin-bottom: 12px;
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
    .section-tree-collapse {
      font-size: 18px;
      margin: -30px 0 0 12px;
      border: none;
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 0;
      cursor: pointer;
    }
  }
}
</style>

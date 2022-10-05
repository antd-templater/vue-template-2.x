<template>
  <section class="section-container">
    <div class="section-left-container">
      <div class="section-left-tree">
        <tree-menu
          ref="treeMenu"
          @linkage="queryButtons"
        />
      </div>
    </div>
    <div class="section-right-container">
      <div class="section-right-top-container">
        <button-table
          ref="buttonTable"
          :parentNode="menuNode"
          :parentInfo="menuInfo"
          @linkage="queryServers"
        />
      </div>
      <div class="section-right-bottom-container">
        <server-table
          ref="serverTable"
          :parentNode="buttonNode"
          :parentNodes="buttonNodes"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TreeMenu from './components/ResourceManage/TreeMenu'
import ButtonTable from './components/ResourceManage/ButtonTable'
import ServerTable from './components/ResourceManage/ServerTable'

export default {
  name: 'ResourceManage',
  components: {
    TreeMenu,
    ButtonTable,
    ServerTable
  },
  data () {
    return {
      // 菜单
      menuNode: {},
      menuInfo: {},

      // 按钮
      buttonNode: {},
      buttonNodes: []
    }
  },
  methods: {
    /**
     * @description 联动查询 - 按钮资源
     * @param {Object} options
     * @returns {undefined}
     */
    queryButtons (options) {
      this.menuNode = options.node
      this.menuInfo = options.info

      if (!this.menuNode.value) {
        this.$refs.buttonTable.doTableClear()
        this.$refs.serverTable.doTableClear()
      }

      if (
        this.menuNode.value &&
        this.$refs.buttonTable.queryParam.parentId !== this.menuNode.value
      ) {
        this.$refs.buttonTable.queryParam.parentId = this.menuNode.value
        this.$refs.buttonTable.doTableReady(true)
        this.$refs.serverTable.doTableReady(true)
        this.$refs.buttonTable.doTableQuery()
      }
    },

    /**
     * @description 联动查询 - 服务资源
     * @param {Object} options
     * @returns {undefined}
     */
    queryServers (options) {
      this.buttonNode = options.node
      this.buttonNodes = options.nodes

      if (!this.buttonNode.resourceId) {
        this.$refs.serverTable.doTableClear()
      }

      if (
        this.buttonNode.resourceId &&
        this.$refs.serverTable.queryParam.parentId !== this.buttonNode.resourceId
      ) {
        this.$refs.serverTable.queryParam.parentId = this.buttonNode.resourceId
        this.$refs.serverTable.doTableReady(true)
        this.$refs.serverTable.doTableQuery()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.section-container {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: calc(100% - 48px);
  padding: 24px;
  position: absolute;
  & > .section-left-container {
    flex: 0 0 auto;
    width: 334px;
    height: 100%;
    transition: width 0.25s ease;
    .section-left-tree {
      width: 310px;
      height: 100%;
      overflow: hidden;
      background-color: #ffffff;
      border-radius: 4px;
    }
  }
  & > .section-right-container {
    flex: 0 0 auto;
    display: flex;
    flex-flow: column nowrap;
    width: calc(100% - 334px);
    height: 100%;
    & > .section-right-top-container {
      width: 100%;
      height: calc(50% - 8px);
      background-color: #ffffff;
      border-radius: 4px;
    }
    & > .section-right-bottom-container {
      width: 100%;
      height: calc(50% - 8px);
      margin-top: 16px;
      background-color: #ffffff;
      border-radius: 4px;
    }
  }
}
</style>

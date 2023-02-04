<template>
  <section class="tree-menu-container">
    <a-card
      title="菜单资源"
      style="display: flex; flex-flow: column nowrap; height: 100%"
      :bodyStyle="{
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
      <s-tree
        ref="tree"
        :loading="loading"
        :treeData="menuTree"
        :allowCheckedLevel="2"
        :allowSelectedLevel="2"
        :selectable="true"
        :checkable="false"
        :showIcon="false"
        :showLine="true"
        :tooltip="32"
        @init="doLinkage($event)"
        @select="doLinkage($event)"
      >
        <template #titleRootButton="item">
          <span class="s-tree-title-button">
            <a-button
              slot="extra"
              type="link"
              size="small"
              icon="plus"
              @click.stop="doDrawerAdd(item)"
            />
            <a-button
              slot="extra"
              type="link"
              size="small"
              icon="folder"
              @click.stop="doCollapse(true)"
            />
            <a-button
              ghost
              slot="extra"
              type="link"
              size="small"
              icon="folder-open"
              @click.stop="doCollapse(false)"
            />
          </span>
        </template>

        <template #titleChildButton="item">
          <span class="s-tree-title-button">
            <a-button
              slot="extra"
              type="link"
              size="small"
              icon="plus"
              @click.stop="doDrawerAdd(item)"
            />
            <a-button
              slot="extra"
              type="link"
              size="small"
              icon="edit"
              @click.stop="doDrawerEdit(item)"
            />
            <a-button
              slot="extra"
              type="link"
              size="small"
              icon="delete"
              style="color: #f44848"
              @click.stop="doDrawerDel(item)"
            />
          </span>
        </template>
      </s-tree>
    </a-card>

    <tree-drawer
      ref="treeDrawer"
      @submitted="doQuery"
      @deleted="doQuery"
    />
  </section>
</template>

<script>
import { requestBuilder } from '@/utils/util'
import * as resourceApi from '@/api/resource'

import TreeDrawer from './TreeDrawer'

export default {
  name: 'TreeMenu',
  components: {
    TreeDrawer
  },
  data () {
    return {
      menuTree: [],
      menuInfos: [],
      loading: false
    }
  },
  created () {
    this.doQuery()
  },
  methods: {
    /**
     * @description 组织节点 - 查询
     * @returns {Promise | undefined}
     */
    doQuery () {
      if (!this.loading) {
        // loading
        this.loading = true

        // 参数
        const params = requestBuilder(
          '',
          {
            resourceType: 'm'
          },
          null,
          null
        )

        // 接口
        return resourceApi
          .getResourceMenuAll(params)
          .then(res => {
            if (res.code !== '0000') {
              this.$message.success('菜单资源加载完毕')
              return Promise.reject(new Error('菜单资源加载失败'))
            }
            this.menuTree = res.result.treeNodes
            this.menuInfos = res.result.nodes
          })
          .finally(() => {
            this.loading = false
          })
      }
    },

    /**
     * @description 通知联动 - 查询
     * @param {Object} options
     * @returns {undefined}
     */
    doLinkage (options) {
      this.$nextTick(() => {
        this.$emit('linkage', {
          node: options.selectedNode,
          info: this.menuInfos.find(menu => menu.resourceId === options.selectedNode.value)
        })
      })
    },

    /**
     * @description 折叠或收缩
     * @param {Object} options
     * @returns {undefined}
     */
    doCollapse (options) {
      options ? this.$refs.tree.doTreeAllCollapse() : this.$refs.tree.doTreeAllExpand()
    },

    /**
     * @description 信息 - 抽屉框新增操作
     * @param {Object} record
     * @returns {undefined}
     */
    doDrawerAdd (record) {
      this.$refs.treeDrawer.doAdd([{ parentId: record.value }])
    },

    /**
     * @description 信息 - 抽屉框修改操作
     * @param {Object} record
     * @returns {undefined}
     */
    doDrawerEdit (record) {
      this.$refs.treeDrawer.doEdit([this.menuInfos.find(menu => menu.resourceId === record.value)])
    },

    /**
     * @description 信息 - 抽屉框删除操作
     * @param {Object} record
     * @returns {undefined}
     */
    doDrawerDel (record) {
      if (record.children && record.children.length > 0) {
        this.$message.error('该节点存在子菜单，无法进行删除操作!')
        return
      }
      this.$confirm({
        title: '是否确认删除该菜单?',
        content: '删除菜单会导致相关页面丢失，请慎重考虑!',
        okType: 'danger',
        okText: '删除',
        onOk: () => {
          this.$refs.treeDrawer.doDel([
            this.menuInfos.find(menu => menu.resourceId === record.value)
          ])
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tree-menu-container {
  width: 100%;
  height: 100%;
}
</style>

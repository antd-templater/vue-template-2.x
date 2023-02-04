<template>
  <section class="organize-tree-container">
    <a-card
      title="组织列表"
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
      <template #extra>
        <a-button
          ghost
          icon="plus"
          type="primary"
          style="margin: 0 5px"
          @click="doDrawerAdd({ value: '0' })"
        />
        <a-button
          ghost
          icon="redo"
          type="primary"
          style="margin: 0 5px"
          @click="doRefresh()"
        />
      </template>

      <s-tree
        ref="tree"
        :loading="loading"
        :loadData="doQuery"
        :replaceFields="replaceFields"
        :allowCheckedLevel="1"
        :allowSelectedLevel="1"
        :selectable="true"
        :checkable="false"
        :showIcon="false"
        :showLine="false"
        :tooltip="32"
        @load="doLoaded"
        @init="doLinkage"
        @select="doLinkage"
        @expand="doExpand"
      >
        <!-- 根节点 新增/删除/修改 -->
        <template
          v-if="false"
          #titleRootButton="item"
        >
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

        <!-- 子节点 新增/删除/修改 -->
        <template
          v-if="false"
          #titleChildButton="item"
        >
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

    <organize-drawer
      ref="organizeDrawer"
      :queryOptions="queryOptions"
      @deleted="() => $emit('queryAll')"
      @submitted="() => $emit('queryAll')"
    />
  </section>
</template>

<script>
import { requestBuilder } from '@/utils/util'
import * as organizeApi from '@/api/organize'

import OrganizeDrawer from './OrganizeDrawer'

export default {
  name: 'OrganizeTree',
  components: {
    OrganizeDrawer
  },
  props: {
    queryOptions: {
      type: Object,
      default: function () {
        return {
          orgTree: [],
          isOrg: []
        }
      }
    }
  },
  data () {
    return {
      // 树节点
      replaceFields: {
        children: 'children',
        title: 'title',
        key: 'key'
      },
      expandedKeys: [],
      selectedKeys: [],
      flatTreeNodes: [],
      parentTreeNodes: {},

      // 查询中
      loading: false
    }
  },
  methods: {
    /**
     * @description 组织节点 - 查询
     * @param {Object} options
     * @returns {Promise}
     */
    doQuery (options) {
      const param = requestBuilder(
        '',
        {
          orgId: options.value
        },
        null,
        null
      )
      return organizeApi.getOrganizeInfoTree(param).then(res => {
        if (res.code !== '0000') {
          return Promise.reject(new Error(res))
        }
        return res.result
      })
    },

    /**
     * @description 组织节点 - 刷新
     * @param {Object} options
     * @returns {undefined}
     */
    doRefresh (options) {
      if (!this.loading) {
        // 查询中
        this.loading = true

        // 待加载
        const loadedKeys = Array.from(
          new Set([
            '0',
            ...this.expandedKeys,
            ...this.selectedKeys.flatMap(value =>
              this.parentTreeNodes[value].map(node => node.value)
            )
          ])
        )
        // 待选择
        const expandedKeys = [...this.expandedKeys]
        const selectedKeys = [...this.selectedKeys]

        // 状态
        const promises = []

        // 排序
        loadedKeys.sort(
          (a, b) =>
            this.flatTreeNodes.findIndex(node => node.value === a) -
            this.flatTreeNodes.findIndex(node => node.value === b)
        )

        for (const value of loadedKeys) {
          promises.push(
            this.doQuery({ value })
              .then(result => {
                return {
                  parent: value !== '0' ? { value } : null,
                  children: result
                }
              })
              .catch(() => {})
          )
        }

        Promise.all(promises)
          .then(options => {
            for (const option of options) {
              if (option) {
                this.$refs.tree.reloadTreeNodes(option.children, option.parent)
              }
            }
            this.$refs.tree.doTreeSelect(selectedKeys)
            this.$refs.tree.doTreeExpand(expandedKeys)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },

    /**
     * @description 组织节点 - 展开
     * @param {Object} options
     * @returns {undefined}
     */
    doExpand (options) {
      this.expandedKeys = options.expandedKeys
      this.selectedKeys = options.selectedKeys
      this.flatTreeNodes = options.flatTreeNodes
      this.parentTreeNodes = options.parentTreeNodes
    },

    /**
     * @description 组织节点 - 加载完
     * @param {Object} options
     * @returns {undefined}
     */
    doLoaded (options) {
      this.expandedKeys = options.expandedKeys
      this.selectedKeys = options.selectedKeys
      this.flatTreeNodes = options.flatTreeNodes
      this.parentTreeNodes = options.parentTreeNodes
    },

    /**
     * @description 通知联动 - 查询
     * @param {Object} options
     * @returns {undefined}
     */
    doLinkage (options) {
      this.expandedKeys = options.expandedKeys
      this.selectedKeys = options.selectedKeys
      this.flatTreeNodes = options.flatTreeNodes
      this.parentTreeNodes = options.parentTreeNodes
      this.$nextTick(() => {
        // 根节点
        this.$emit(
          'rootNodes',
          this.flatTreeNodes
            .filter(node => node.level === 1)
            .map(node => {
              return {
                level: node.level,
                label: node.label,
                value: node.value
              }
            })
        )
        // 当前节点
        this.$emit('selectedNode', {
          label: options.selectedNode.label,
          value: options.selectedNode.value
        })
        // 联动查询
        this.$emit('queryTable', {
          orgId: options.selectedNode.isOrg === 'Y' ? options.selectedNode.value : '',
          deptId: options.selectedNode.isOrg === 'N' ? options.selectedNode.value : ''
        })
      })
    },

    /**
     * @description 信息 - 抽屉框新增操作
     * @param {Object} record
     * @returns {undefined}
     */
    doDrawerAdd (record) {
      this.$refs.organizeDrawer.doAdd([{ parentOrgId: record.value }])
    },

    /**
     * @description 信息 - 抽屉框修改操作
     * @param {Object} record
     * @returns {undefined}
     */
    doDrawerEdit (record) {
      this.$refs.organizeDrawer.doEdit([
        {
          key: record.value,
          title: record.label,
          parentOrgId: record.parentNode && record.parentNode.value,
          orgShortName: record.original.orgShortName,
          isOrg: record.original.isOrg,
          activity: 'Y'
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
        title: '是否确认删除该组织?',
        content: '删除会导致该节点及其子节点丢失，请慎重考虑!',
        okType: 'danger',
        okText: '删除',
        onOk: () => {
          this.$refs.organizeDrawer.doDel([record.original])
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.organize-tree-container {
  width: 100%;
  height: 100%;
}
</style>

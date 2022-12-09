<template>
  <section class="resource-drawer-container">
    <a-drawer
      :title="title"
      :visible="visible"
      :maskClosable="false"
      :getContainer="false"
      :bodyStyle="{ height: 'calc(100% - 55px)' }"
      :afterVisibleChange="() => visible && queryMenus()"
      @close="doClose()"
    >
      <div
        class="flex-row-auto"
        style="width: 100%; height: 100%"
      >
        <div
          class="flex-row-none"
          style="width: 310px; height: 100%; margin-right: 24px; overflew: hidden"
        >
          <a-card
            title="菜单资源"
            style="display: flex; flex-flow: column nowrap; width: 100%; height: 100%"
            :bodyStyle="{
              flex: '1 1 auto',
              padding: '15px 24px',
              overflow: 'hidden',
              position: 'relative',
            }"
            :headStyle="{
              flex: '0 0 auto',
              overflow: 'hidden',
            }"
          >
            <s-tree
              ref="tree"
              :loading="loading"
              :treeData="menuTrees"
              :allowCheckedLevel="2"
              :allowSelectedLevel="2"
              :allowSelectToCheck="true"
              :allowUnSelected="true"
              :allowUnChecked="true"
              :selectable="false"
              :checkable="true"
              :showIcon="false"
              :showLine="true"
              :tooltip="32"
              @check="doTreeCheck"
            >
              <template #titleRootButton>
                <span class="s-tree-title-button always-show">
                  <a-button
                    ghost
                    slot="extra"
                    size="small"
                    type="primary"
                    icon="folder"
                    style="margin: 0 3px"
                    @click.stop="doTreeCollapse(true)"
                  />
                  <a-button
                    ghost
                    slot="extra"
                    size="small"
                    type="primary"
                    icon="folder-open"
                    style="margin: 0 3px"
                    @click.stop="doTreeCollapse(false)"
                  />
                </span>
              </template>
            </s-tree>
          </a-card>
        </div>

        <div
          class="flex-row-auto"
          style="width: 100%; height: 100%; overflew: hidden"
        >
          <a-card
            title="按钮资源"
            style="display: flex; flex-flow: column nowrap; width: 100%; height: 100%"
            :bodyStyle="{
              flex: '1 1 auto',
              padding: '15px 24px',
              overflow: 'hidden',
              position: 'relative',
            }"
            :headStyle="{
              flex: '0 0 auto',
              overflow: 'hidden',
            }"
          >
            <a-spin :spinning="loading">
              <div class="button-resource-container">
                <div
                  class="button-resource-group"
                  v-for="button of buttonSortList"
                  :key="button.id"
                >
                  <div class="group-header">
                    <a-checkbox
                      style="margin: 0 6px 0 4px"
                      :checked="isButtonAllChecked(button)"
                      :indeterminate="isButtonHasChecked(button)"
                      @change="doButtonCheck({ button, option: null })"
                    />
                    <a-breadcrumb>
                      <a-breadcrumb-item
                        v-for="text of button.titles"
                        :key="text"
                      >
                        {{ text }}
                      </a-breadcrumb-item>
                    </a-breadcrumb>
                  </div>
                  <div class="group-content">
                    <div
                      class="group-checkbox"
                      v-for="option of button.options"
                      :key="option.value"
                    >
                      <a-checkbox
                        :title="option.label"
                        :checked="button.selected.includes(option.value)"
                        @change="doButtonCheck({ button, option })"
                      >
                        {{ option.label }}
                      </a-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </a-spin>
          </a-card>
        </div>
      </div>

      <!-- 按钮组 -->
      <div class="drawer-footer">
        <div class="footer-fixed">
          <a-button @click="doClose()">取消</a-button>
          <a-button
            type="primary"
            :loading="loading"
            @click="doSubmit()"
          >保存</a-button>
        </div>
      </div>
    </a-drawer>
  </section>
</template>

<script>
import { requestBuilder } from '@/utils/util'
import * as resourceApi from '@/api/resource'

export default {
  name: 'ResourceDrawer',
  data () {
    return {
      title: '',
      action: '',
      record: {},
      visible: false,
      loading: false,

      // 菜单资源
      menuTrees: [],
      menuSelectKeys: [],
      menuSelectNodes: [],
      parentTreeNodes: {},
      childTreeNodes: {},
      flatTreeNodes: [],

      // 按钮资源
      buttonList: [],
      buttonSortList: [],
      buttonSelectKeys: []
    }
  },
  methods: {
    /**
     * @description 查询菜单资源
     * @returns {Promise}
     */
    queryMenus () {
      if (!this.loading) {
        this.loading = true
      }
      const record = this.record
      const roleId = record.roleId
      return resourceApi.getResourceMenuByRole(requestBuilder('', { roleId })).then(res => {
        if (res.code !== '0000') {
          if (res.message) {
            this.$message.error(res.message)
          }
          return
        }
        this.menuTrees = res.result.treeNodes
        this.menuSelectKeys = res.result.treeSelect
        this.$nextTick(() => this.$refs.tree.doTreeCheck(this.menuSelectKeys))
      })
    },

    /**
     * @description 查询按钮资源
     * @param {Array} menus
     * @returns {Promise}
     */
    queryButton (menus) {
      const param = menus.map(menu => {
        return {
          roleId: this.record.roleId,
          menuId: menu.value
        }
      })
      return resourceApi
        .getResourceButtonByRole(requestBuilder('', param))
        .then(res => {
          if (res.code !== '0000') {
            if (res.message) {
              this.$message.error(res.message)
            }
            return Promise.reject(new Error(res))
          }
          return res
        })
        .finally(() => {
          this.loading = false
        })
    },

    /**
     * @description 菜单资源 check
     * @param {Object} options
     * @returns {undefined}
     */
    doTreeCheck (options) {
      // 菜单资源排序
      this.flatTreeNodes = options.flatTreeNodes
      this.childTreeNodes = options.childTreeNodes
      this.parentTreeNodes = options.parentTreeNodes
      this.menuSelectNodes = options.checkedLinkNodes.filter(node => !!node.checkable)
      this.menuSelectKeys = this.menuSelectNodes.map(node => node.value)

      // 新取消的菜单资源
      if (options.delCheckedNodes.length > 0) {
        this.buttonList = this.buttonList.filter(
          button =>
            button.actionsOptions &&
            button.actionsOptions.length > 0 &&
            !options.delCheckedNodes.some(node => node.value === button.id)
        )
      }

      // 新选择的菜单资源
      if (options.addCheckedNodes.length > 0) {
        this.queryButton(options.addCheckedNodes).then(res => {
          for (const record of res.result) {
            if (!this.buttonList.some(button => button.id === record.id)) {
              this.buttonList.push(record)
            }
          }
          this.doButtonSort()
        })
      }

      // 如果没新选择菜单资源，则立即排序
      if (options.addCheckedNodes.length === 0) {
        this.loading = false
        this.doButtonSort()
      }
    },

    /**
     * @description 菜单资源 collapse
     * @param {Object} options
     * @returns {undefined}
     */
    doTreeCollapse (options) {
      options ? this.$refs.tree.doTreeAllCollapse() : this.$refs.tree.doTreeAllExpand()
    },

    /**
     * @description 按钮资源 sort
     * @param {Object} options
     * @returns {undefined}
     */
    doButtonSort () {
      this.buttonList = this.buttonList.filter(
        button =>
          button.actionsOptions &&
          button.actionsOptions.length > 0 &&
          this.menuSelectNodes.some(node => node.value === button.id)
      )
      this.buttonList.sort(
        (a, b) =>
          this.menuSelectNodes.findIndex(node => node.value === a.id) -
          this.menuSelectNodes.findIndex(node => node.value === b.id)
      )
      this.buttonSortList = this.buttonList.map(button => {
        const menu = this.menuSelectNodes.find(node => node.value === button.id)
        const parents = this.parentTreeNodes[menu.value].filter(node => !!node.checkable)

        // 容错处理
        if (!button.actionsOptions) {
          button.actionsOptions = []
        }
        if (!button.selected) {
          button.selected = []
        }

        // 返回
        return {
          menu: menu,
          titles: [...parents.map(node => node.label), menu.label],
          options: button.actionsOptions,
          selected: button.selected,
          id: button.id
        }
      })
      this.buttonSelectKeys = this.buttonSortList.flatMap(button => button.selected)
    },

    /**
     * @description 按钮资源 check
     * @param {Object} options
     * @returns {undefined}
     */
    doButtonCheck (options) {
      const button = options.button
      const option = options.option
      if (!option) {
        !button.options.every(option => button.selected.includes(option.value))
          ? (button.selected = button.options.map(opt => opt.value))
          : (button.selected = [])
      } else {
        button.selected.includes(option.value)
          ? (button.selected = button.selected.filter(value => value !== option.value))
          : button.selected.push(option.value)
      }
      this.buttonSelectKeys = this.buttonSortList.flatMap(button => button.selected)
    },

    /**
     * @description 按钮资源 已全选
     * @param {Object} button
     * @returns {Boolean}
     */
    isButtonAllChecked (button) {
      return button.options.every(option => button.selected.includes(option.value))
    },

    /**
     * @description 按钮资源 有选中
     * @param {Object} button
     * @returns {Boolean}
     */
    isButtonHasChecked (button) {
      return (
        !button.options.every(option => button.selected.includes(option.value)) &&
        button.options.some(option => button.selected.includes(option.value))
      )
    },

    /**
     * @description 打开抽屉框
     * @param {Object} record
     * @returns {undefined}
     */
    doOpen (record) {
      this.title = '资源配置'
      this.action = 'update'
      this.record = record
      this.visible = true
    },

    /**
     * @description 关闭抽屉框
     * @returns {undefined}
     */
    doClose () {
      if (this.visible) {
        // 弹窗
        this.title = ''
        this.action = ''
        this.loading = false
        this.visible = false
        this.record = {}

        // 菜单资源
        this.menuTrees = []
        this.menuSelectKeys = []
        this.menuSelectNodes = []
        this.parentTreeNodes = {}
        this.childTreeNodes = {}
        this.flatTreeNodes = []

        // 按钮资源
        this.buttonList = []
        this.buttonSortList = []
        this.buttonSelectKeys = []

        // 通知
        this.$emit('closed')
      }
    },

    /**
     * @description 提交表单
     * @returns {Promise}
     */
    doSubmit () {
      const record = this.record
      const roleId = record.roleId
      const resources = [...this.menuSelectKeys, ...this.buttonSelectKeys]
      const resourceIds = resources.join(',')
      resourceApi
        .modifyResoureInfoByRoleId(requestBuilder('insert', { roleId, resourceIds }))
        .then(res => {
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
          this.doClose()
          this.$emit('submitted')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.resource-drawer-container {
  :deep(.ant-drawer) {
    .ant-drawer-content-wrapper {
      width: 100% !important;
      max-width: 1180px;
    }
  }

  :deep(.ant-spin-nested-loading),
  :deep(.ant-spin-container) {
    width: 100%;
    height: 100%;
  }

  .button-resource-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    .button-resource-group {
      width: 100%;
      height: auto;
      &:not(:last-child) {
        margin-bottom: 24px;
      }
      .group-header {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        align-content: center;
        height: 40px;
        padding: 5px 16px 5px 10px;
        margin-bottom: 2px;
        color: #545665;
        font-size: 14px;
        font-weight: 600;
        border-radius: 5px;
        background-color: #f8f8fd;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        :deep(.ant-checkbox-wrapper) {
          opacity: 0.9;
        }
      }
      .group-content {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        align-content: center;
        & > .group-checkbox {
          flex: 0 0 auto;
          max-width: 60%;
          padding: 5px 5px 5px 10px;
          margin: 4px 5px;
          border-radius: 3px;
          font-size: 14px;
          font-weight: 600;
          background: #f0f4ff;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;

          :deep(.ant-checkbox-wrapper) {
            width: 100%;
            display: inline;
          }
        }
      }
    }
  }
}
</style>

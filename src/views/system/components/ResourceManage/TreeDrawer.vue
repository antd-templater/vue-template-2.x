<template>
  <section class="tree-drawer-container">
    <a-drawer
      width="400"
      :title="title"
      :visible="visible"
      :maskClosable="false"
      :getContainer="false"
      :destroyOnClose="false"
      @close="doClose()"
    >
      <div class="readonly-container">
        <div class="readonly-item">
          <span class="name">当前菜单ID:</span>
          <span class="value">{{ record.resourceId || '由系统生成' }}</span>
        </div>
        <div class="readonly-item">
          <span class="name">父级菜单ID:</span>
          <span class="value">{{ record.parentId }}</span>
        </div>
      </div>

      <a-divider :dashed="true"/>

      <tree-drawer-form
        ref="form"
        :readonly="readonly"
        :disabled="disabled"
        :loading="loading"
      />

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
import TreeDrawerForm from './TreeDrawerForm.vue'

export default {
  name: 'TreeDrawer',
  components: {
    TreeDrawerForm
  },
  data () {
    return {
      title: '',
      action: '',
      add: false,
      visible: false,
      readonly: false,
      disabled: false,
      loading: false,
      record: {}
    }
  },
  methods: {
    /**
     * @description 新增
     * @param {Object} record
     * @returns {undefined}
     */
    doAdd ([record]) {
      this.doOpen('insert', record)
    },

    /**
     * @description 修改
     * @param {Object} record
     * @returns {undefined}
     */
    doEdit ([record]) {
      this.doOpen('update', record)
    },

    /**
     * @description 删除
     * @param {Array} records
     * @returns {Promise}
     */
    doDel (records) {
      return this.$refs.form.doDeleteData(records).then(() => {
        this.$emit('deleted')
      })
    },

    /**
     * @description 打开抽屉框
     * @param {String} action
     * @param {Object} record
     * @returns {undefined}
     */
    doOpen (action, record) {
      // 根据 action 判断
      switch (action) {
        case 'insert': {
          this.add = true
          this.readonly = false
          this.title = '添加菜单资源'
          this.action = 'insert'
          this.record = Object.assign(
            {
              allowCache: 'Y',
              hideInMenu: 'N',
              hideChildInMenu: 'N',
              resourceType: 'm',
              activity: 'Y'
            },
            record
          )
          break
        }
        case 'update': {
          this.add = false
          this.readonly = false
          this.title = '修改菜单资源'
          this.action = 'update'
          this.record = Object.assign(
            {
              allowCache: 'Y',
              hideInMenu: 'N',
              hideChildInMenu: 'N',
              resourceType: 'm',
              activity: 'Y'
            },
            record
          )
          break
        }
      }

      // 显示弹框
      this.visible = true

      // 异步处理
      this.$nextTick(() => {
        // 组件引用
        const $form = this.$refs.form

        // 处理表单
        $form.doCreateForm(this.action, this.record)
      })
    },

    /**
     * @description 关闭抽屉框
     * @returns {undefined}
     */
    doClose () {
      if (this.visible) {
        // 组件引用
        const $form = this.$refs.form

        // 表单
        $form.doDestroyForm()

        // 弹窗
        this.title = ''
        this.action = ''
        this.add = false
        this.disabled = false
        this.readonly = false
        this.loading = false
        this.visible = false
        this.record = {}

        // 通知
        this.$emit('closed')
      }
    },

    /**
     * @description 提交表单
     * @returns {Promise}
     */
    doSubmit () {
      return this.$refs.form.doUpdateData(this.record).then(() => {
        this.doClose()
        this.$emit('submitted')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.readonly-container {
  .readonly-item {
    padding-left: 10px;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
    .name {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #545665;
      margin-right: 5px;
    }
    .value {
      font-family: Helvetica-Bold, Helvetica;
      color: #545665;
    }
  }
}
</style>

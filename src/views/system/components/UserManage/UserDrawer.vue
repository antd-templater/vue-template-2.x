<template>
  <section class="user-drawer-container">
    <a-drawer
      width="400"
      class="no-transform"
      :title="title"
      :visible="visible"
      :maskClosable="false"
      :getContainer="false"
      :destroyOnClose="false"
      @close="doClose()"
    >
      <user-drawer-form
        ref="form"
        :queryOptions="queryOptions"
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
import { requestBuilder } from '@/utils/util'
import * as roleApi from '@/api/role'

import UserDrawerForm from './UserDrawerForm.vue'

export default {
  name: 'UserDrawer',
  components: {
    UserDrawerForm
  },
  props: {
    queryOptions: {
      type: Object,
      default: function () {
        return {
          orgTree: [],
          deptId: [],
          roleId: []
        }
      }
    }
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
     * @description 查询角色
     * @param {Object} record
     * @returns {Promise}
     */
    doQueryRole (record) {
      if (!record.userNo) {
        return Promise.resolve([])
      }

      // 查询中
      this.loading = true

      // 调用接口
      return roleApi
        .getRoleInfoByUserNo(requestBuilder('', { userNo: record.userNo }))
        .then(res => {
          if (res.code !== '0000') {
            this.$message.error('查询角色失败')
            return Promise.reject(new Error(res))
          }
          return res.result
        })
        .finally(() => {
          this.loading = false
        })
    },

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
          this.title = '添加用户'
          this.action = 'insert'
          this.record = Object.assign(
            {
              activity: 'Y'
            },
            record
          )
          break
        }
        case 'update': {
          this.add = false
          this.readonly = false
          this.title = '修改用户'
          this.action = 'update'
          this.record = Object.assign(
            {
              activity: 'Y'
            },
            record
          )
          this.doQueryRole(record).then(roles => {
            this.$refs.form.setFieldsValue({
              roleId: roles.map(role => role.roleId)
            })
          })
          break
        }
      }

      // 显示弹框
      this.visible = true

      // 异步处理
      this.$nextTick(() => {
        // 组件引用
        const $form = this.$refs.form

        // 处理 form表单
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

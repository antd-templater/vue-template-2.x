<template>
  <section :class="['layout-avatar-container', navTheme, layoutMode]">
    <a-dropdown>
      <div class="layout-avatar-wrapper">
        <a-avatar
          size="default"
          class="layout-avatar-img"
          :src="avatar"
        />
        <span class="layout-avatar-nick">{{ nickName }}</span>
      </div>

      <a-menu
        slot="overlay"
        class="layout-avatar-dropdown"
        style="min-width: 120px"
      >
        <a-menu-item key="1">
          <a
            href="javascript:void(0);"
            @click="handlePassword"
          >
            <a-icon
              type="setting"
              style="margin-right: 10px"
            />
            <span>修改密码</span>
          </a>
        </a-menu-item>

        <a-menu-item key="2">
          <a
            href="javascript:void(0);"
            @click="handleLogout"
          >
            <a-icon
              type="logout"
              style="margin-right: 10px"
            />
            <span>退出登录</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>

    <a-modal
      v-model="visible"
      title="修改密码"
      :width="420"
      :bodyStyle="{ padding: '25px 35px 3px 30px' }"
      @click="handlePassword"
    >
      <a-form
        :form="form"
        hide-required-mark
      >
        <a-form-item label="原密码">
          <a-input-password
            v-decorator="['password', decorator.password]"
            placeholder="请输入原密码"
          />
        </a-form-item>

        <a-form-item
          label="新密码"
          has-feedback
        >
          <a-input-password
            v-decorator="['newPassword', decorator.newPassword]"
            placeholder="请输入新密码"
          />
        </a-form-item>

        <a-form-item
          label="确认新密码"
          has-feedback
        >
          <a-input-password
            v-decorator="['confirmPassword', decorator.confirmPassword]"
            placeholder="请确认新密码"
          />
        </a-form-item>
      </a-form>

      <template slot="footer">
        <a-button
          key="back"
          @click="handleModalCancel"
        >
          <span>取消</span>
        </a-button>

        <a-button
          key="submit"
          type="primary"
          @click="handleModalConfirm"
        >
          <span>提交</span>
        </a-button>
      </template>
    </a-modal>
  </section>
</template>

<script>
import Vue from 'vue'
import mixinApp from '@/mixins/mixinApp'
import mixinUser from '@/mixins/mixinUser'
import { OPERATOR } from '@/store/variable'
import * as authApi from '@/api/auth'

export default {
  name: 'LayoutAvatar',
  mixins: [mixinApp, mixinUser],
  data () {
    return {
      decorator: {
        password: {
          rules: [{ required: true, message: '原密码不能为空' }]
        },
        newPassword: {
          rules: [{ required: true, validator: this.validateNewPassword }]
        },
        confirmPassword: {
          rules: [{ required: true, validator: this.validateConfirmPassword }]
        }
      },
      form: this.$form.createForm(this),
      visible: false
    }
  },
  methods: {
    /**
     * @description 新密码校验
     * @param {Object} rule
     * @param {String} value
     * @param {Function} callback
     * @returns {undefined}
     */
    validateNewPassword (rule, value, callback) {
      if (!value && value !== 0) {
        rule.required ? callback(new Error('请输入新密码')) : callback()
        return
      }
      if (!/[a-z0-9A-Z_]{8,}/.test(value)) {
        callback(new Error('您的密码长度不足8位'))
        return
      }
      if (this.form.getFieldValue('confirmPassword')) {
        this.form.validateFields(['confirmPassword'], { force: true })
      }
      callback()
    },

    /**
     * @description 确认密码校验
     * @param {Object} rule
     * @param {String} value
     * @param {Function} callback
     * @returns {undefined}
     */
    validateConfirmPassword (rule, value, callback) {
      if (!value && value !== 0) {
        rule.required ? callback(new Error('请输入确认密码')) : callback()
        return
      }
      if (value !== this.form.getFieldValue('newPassword')) {
        callback(new Error('两次输入密码不一致!'))
        return
      }
      callback()
    },

    /**
     * @description 打开修改密码弹窗
     * @returns {undefined}
     */
    handlePassword () {
      this.visible = true
    },

    /**
     * @description 注销登录
     * @returns {undefined}
     */
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout()
            .then(() => {
              setTimeout(() => window.location.reload(), 16)
            })
            .catch(err => {
              if (err.message) {
                this.$message.error(err.message)
              }
            })
        }
      })
    },

    /**
     * @description 提交修改密码
     * @returns {undefined}
     */
    handleModalConfirm () {
      this.form.validateFields(err => {
        if (!err) {
          const params = {
            userNo: Vue.ls.get(OPERATOR),
            password: this.form.getFieldValue('password'),
            newPassword: this.form.getFieldValue('newPassword')
          }
          authApi
            .modifyPassword(params)
            .then(res => {
              if (res.code !== '0000') {
                if (res.message) {
                  this.$message.error(res.message)
                }
                return
              }
              this.Logout()
                .then(() => {
                  this.$message.success('修改成功，即将返回登录界面')
                  setTimeout(() => window.location.reload(), 500)
                })
                .catch(err => {
                  if (err.message) {
                    this.$message.error(err.message)
                  }
                })
            })
            .catch(err => {
              if (err.message) {
                this.$message.error(err.message)
              }
            })
        }
      })
    },

    /**
     * @description 取消修改密码
     * @returns {undefined}
     */
    handleModalCancel () {
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.layout-avatar-container {
  height: 100%;
  padding: 0 16px 0 10px;
  cursor: pointer;
  &.topmenu.dark {
    color: rgba(255, 255, 255, 0.65);
  }
  & > .layout-avatar-wrapper {
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    align-content: center;
    & > .layout-avatar-img {
      flex: 0 0 auto;
      margin-right: 6px;
    }
    & > .layout-avatar-nick {
      flex: 1 1 auto;
      max-width: 120px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>

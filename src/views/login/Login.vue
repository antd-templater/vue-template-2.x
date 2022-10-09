<template>
  <section>
    <div class="main">
      <div class="main-container">
        <div class="main-header">
          <div class="title">
            <img
              src="~@/assets/login/logo.svg"
              class="logo"
              alt="logo"
            >
            <span>系统平台</span>
          </div>
          <div class="description">
            <span>基于 Ant Design Vue 框架搭建</span>
          </div>
        </div>

        <div class="main-content">
          <a-form
            :form="form"
            ref="formLogin"
            class="user-layout-login"
          >
            <a-form-item style="margin-bottom: 20px">
              <a-input
                size="large"
                type="text"
                placeholder="账号: admin"
                v-decorator="[
                  'username',
                  { rules: [{ required: true, message: '用户名不能为空' }] },
                ]"
              >
                <a-icon
                  slot="prefix"
                  type="user"
                  :style="{ color: 'rgba(0,0,0,.25)' }"
                />
              </a-input>
            </a-form-item>

            <a-form-item style="margin-bottom: 10px">
              <a-input
                size="large"
                type="password"
                autocomplete="false"
                placeholder="密码: 12345678"
                v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  :style="{ color: 'rgba(0,0,0,.25)' }"
                />
              </a-input>
            </a-form-item>

            <a-form-item style="padding: 0 5px; overflow: hidden">
              <a-checkbox :checked="rememberMe">自动登录</a-checkbox>
              <router-link
                v-if="false"
                :to="{ name: 'recover', params: { user: 'aaa' } }"
                style="float: right; font-size: 14px; color: #f34d4d"
              >
                忘记密码
              </router-link>
            </a-form-item>

            <a-form-item style="margin: 30px 0 0">
              <a-button
                size="large"
                type="primary"
                htmlType="submit"
                class="login-button"
                :loading="loading"
                :disabled="loading"
                @click="doLogin"
              >
                登录
              </a-button>
            </a-form-item>

            <a-form-item style="padding: 0 5px; overflow: hidden">
              <router-link
                v-if="false"
                class="register"
                style="float: right; color: #f34d4d"
                :to="{ name: 'register' }"
              >
                注册账户
              </router-link>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="links">
        <a href="_self">帮助</a>
        <a href="_self">隐私</a>
        <a href="_self">条款</a>
      </div>
      <div class="copyright">Copyright &copy; 2022 Antd-Templater</div>
    </div>
  </section>
</template>

<script>
import md5 from 'md5'
import mixinUser from '@/mixins/mixinUser'

export default {
  name: 'Login',
  mixins: [mixinUser],
  data () {
    return {
      form: this.$form.createForm(this),
      loading: false
    }
  },
  methods: {
    /**
     * @description 登录操作
     * @returns {undefined}
     */
    doLogin () {
      if (this.loading) {
        return
      }

      this.loading = true

      this.form.validateFields((err, values) => {
        if (err) {
          setTimeout(() => {
            this.loading = false
          }, 500)
          return
        }

        this.Login({ ...values, password: md5(values.password) })
          .then(() => {
            this.$notification.success({
              message: `系统提示`,
              duration: 0.5,
              description: `欢迎回来`,
              onClose: () => {
                this.loading = false
                this.$router.push({ path: '/' })
              }
            })
          })
          .catch(err => {
            if (err.message) {
              this.$notification.error({
                message: `系统提示`,
                duration: 0.5,
                description: err.message,
                onClose: () => {
                  this.loading = false
                }
              })
            }
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  background: #f0f2f5 url(~@/assets/login/background.svg);
  & > .main {
    width: 400px;
    height: 100%;
    flex: 0 0 auto;
    position: relative;
    & > .main-container {
      height: 450px;
      margin: auto 0;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 45px;
      right: 45px;
      bottom: 180px;
      & > .main-header {
        width: calc(100% - 80px);
        height: auto;
        margin: 0 auto 48px;
        & > .title {
          & > .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          text-align: center;
          font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
          font-weight: 600;
        }
        & > .description {
          font-size: 15px;
          color: rgba(0, 0, 0, 0.45);
          text-align: center;
          margin-top: 10px;
        }
      }
      & > .main-content {
        label {
          font-size: 14px;
        }
        button.login-button {
          padding: 0 15px;
          font-size: 16px;
          height: 40px;
          width: 100%;
          margin: 0;
        }
      }
    }
  }
  & > .footer {
    width: 100%;
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;
    position: fixed;
    bottom: 0;
    .links {
      margin-bottom: 8px;
      font-size: 14px;
      a {
        color: rgba(0, 0, 0, 0.45);
        text-decoration: none;
        transition: all 0.3s;
        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
    .copyright {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }
}
</style>

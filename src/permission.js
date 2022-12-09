import Vue from 'vue'
import store from './store'
import router from './router'
import components from './router.dynamic'

import NProgress from 'nprogress'
import Notification from 'ant-design-vue/es/notification'
import { ORG_ID, OPERATOR, ACCESS_TOKEN } from '@/store/variable'

// 进度条配置
NProgress.configure({ showSpinner: false })

// 系统/门户 - 登录
const LOGIN_NAME = 'Login'
const LOGIN_PATH = '/login/Login'

// 运行环境 - 路由相关配置
const whiteList = [LOGIN_NAME]
const toLoginRoute = [LOGIN_PATH]
const loginRoutePath = LOGIN_PATH
const indexRoutePath = '/index'

/**
 * @description 路由跳转前处理
 */
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    store.dispatch('toggleTitle', to.meta.title)
  }

  // 进度条
  NProgress.start()

  // 获取用户状态
  const orgId = Vue.ls.get(ORG_ID)
  const operator = Vue.ls.get(OPERATOR)
  const userToken = Vue.ls.get(ACCESS_TOKEN)

  // 已登录时的处理
  if (userToken && operator && orgId) {
    if (toLoginRoute.includes(to.path)) {
      next({ path: indexRoutePath })
      NProgress.done()
      return
    }

    // 未获取用户角色
    if (!store.getters.roles.permissions?.length) {
      const params = { userNo: operator }
      const config = { params, components }

      store
        .dispatch('GetUserInfo', params)
        .then(res => {
          store.dispatch('GenerateRoutes', config).then(() => {
            for (const route of store.getters.addRouters) {
              router.addRoute(route)
            }

            const pathRedirect = to.path
            const queryRedirect = from.query.redirect
            const visitRedirect = queryRedirect || pathRedirect
            const redirect = decodeURIComponent(visitRedirect)

            to.path === redirect
              ? next({ ...to, replace: true })
              : next({ path: redirect })
          })
        })
        .catch(() => {
          Notification.error({
            message: '系统通知',
            description: '获取用户信息失败，请重新登录!',
            duration: 0.8,
            onClose: function () {
              store.dispatch('Logout').then(() => {
                next({ path: loginRoutePath, query: { redirect: to.fullPath } })
              })
            }
          })
        })
      return
    }

    // 正常访问
    return next()
  }

  // 未登录时处理
  if (!to || !to.name) {
    return next({ path: loginRoutePath })
  }
  if (whiteList.includes(to.name)) {
    return next()
  }

  // 系统提示
  Notification.warning({
    message: '系统通知',
    description: 'token 已过期, 请重新登录!',
    duration: 0.8,
    onClose: function () {
      store.dispatch('Logout').then(() => {
        next({
          path: loginRoutePath,
          query: { redirect: to.fullPath }
        })
      })
    }
  })
})

/**
 * @description 路由跳转后处理
 */
router.afterEach(() => {
  NProgress.done()
})

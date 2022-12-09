import qs from 'qs'
import Vue from 'vue'
import Axios from 'axios'
import store from '@/store/index'
import Notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/variable'

/**
 * @description Axios 实例
 */
const axios = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000
})

/**
 * @description 统一异常处理
 * @param {Object} error
 * @return {undefined}
 */
const err = error => {
  let code = 0
  let message = ''
  const token = Vue.ls.get(ACCESS_TOKEN)
  try {
    code = error.response.data.status
    message = error.response.data.message
  } catch (e) {
    if (error.toString().indexOf('timeout') > -1) {
      Notification.error({
        message: '系统消息',
        description: '请求超时'
      })
      return Promise.reject(error)
    }
  }
  if (code === 403) {
    Notification.error({
      message: '系统消息',
      description: message || '禁止访问'
    })
    return Promise.reject(error)
  }
  if (code === 401) {
    Notification.error({
      message: '系统消息',
      description: message || (token ? 'token已过期' : '暂无权限')
    })
    if (token) {
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          window.location.reload(true)
        }, 1500)
      })
    }
    return Promise.reject(error)
  }
  if (message) {
    Notification.error({
      message: '系统消息',
      description: message
    })
  }
  return Promise.reject(error)
}

/**
 * @description 统一请求拦截
 * @param {Object} config
 * @param {Object} err
 */
axios.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  const headers = config.headers

  if (token && !headers.token) {
    headers.token = token
  }

  return config
}, err)

/**
 * @description 统一返回拦截
 * @param {Object} response
 * @param {Object} err
 */
axios.interceptors.response.use(response => {
  const code = response.status
  const types = ['blob', 'raw']
  const config = response.config
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (code < 200 || code > 300) {
    if (response.message) {
      Notification.error({
        message: '系统消息',
        description: response.message
      })
    }
    return Promise.reject(response)
  } else {
    if (types.includes(config.responseType)) {
      return response
    }
    const code = (response.data || {}).code
    const message = (response.data || {}).message
    if ([403, '403'].includes(code)) {
      Notification.error({
        message: '系统消息',
        description: message || (token ? 'token已过期' : '禁止访问')
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 800)
        })
      }
      return Promise.reject(response)
    }
    if ([401, '401'].includes(code)) {
      Notification.error({
        message: '系统消息',
        description: message || (token ? 'token已过期' : '暂无权限')
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 800)
        })
      }
      return Promise.reject(response)
    }
    return response.data
  }
}, err)

export { axios, qs }

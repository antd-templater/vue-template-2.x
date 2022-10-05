import Vue from 'vue'
import { requestBuilder } from '@/utils/util'
import * as authApi from '@/api/auth'
import * as userApi from '@/api/user'

import {
  ORG_ID,
  ORG_NAME,
  DEPT_ID,
  DEPT_NAME,
  DATA_FLAG,
  PERSON_ID,
  PERSON_NAME,
  ACCESS_TOKEN,
  OPERATOR
} from '@/store/variable'

const DEFUALT_AVATAR = require('@/assets/avatar/default_avatar.png')

/**
 * @description 用户信息
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
export default {
  state: {
    token: '',
    rememberMe: true,
    personName: '',
    avatar: DEFUALT_AVATAR,
    roles: {},
    info: {}
  },

  getters: {
    token: state => state.token,
    rememberMe: state => state.rememberMe,
    personName: state => state.personName,
    nickname: state => state.personName,
    userInfo: state => state.info,
    avatar: state => state.avatar,
    roles: state => state.roles
  },

  mutations: {
    /* 储存 token */
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    /* 储存 记住密码 */
    SET_REMEMBER: (state, status) => {
      state.rememberMe = !!status
    },
    /* 储存 用户名 */
    SET_NAME: (state, name) => {
      state.personName = name
    },
    /* 储存 用户信息 */
    SET_INFO: (state, info) => {
      state.info = info
    },
    /* 储存 用户头像 */
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar || DEFUALT_AVATAR
    },
    /* 储存 用户角色 */
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    /**
     * @description 系统常规登录
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} userInfo
     * @return {Promise}
     */
    Login ({ dispatch, commit }, userInfo) {
      // 清空缓存标签页
      dispatch('DelAllTags', [])

      // 调用登录接口
      return authApi.login(requestBuilder('login', userInfo)).then(response => {
        if (response.code === '0000') {
          const expires = 7 * 24 * 60 * 60 * 1000
          const result = response.result || {}
          const data = result.data || {}
          const orgId = data.orgId || ''
          const userNo = data.userNo || ''
          const personSysId = data.personSysId || ''
          const token = result.token || ''

          Vue.ls.set(ACCESS_TOKEN, token, expires)
          Vue.ls.set(PERSON_ID, personSysId, expires)
          Vue.ls.set(OPERATOR, userNo, expires)
          Vue.ls.set(ORG_ID, orgId, expires)

          commit('SET_TOKEN', token)

          return response
        }
        return Promise.reject(response)
      })
    },

    /**
     * @description 系统常规登出
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @return {Promise}
     */
    Logout ({ dispatch, commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', {})
        dispatch('DelAllTags', [])

        Vue.ls.remove(ACCESS_TOKEN)
        Vue.ls.remove(PERSON_ID)
        Vue.ls.remove(OPERATOR)
        Vue.ls.remove(ORG_ID)
        Vue.ls.remove(ORG_NAME)
        Vue.ls.remove(DEPT_ID)
        Vue.ls.remove(DEPT_NAME)
        Vue.ls.remove(DATA_FLAG)
        Vue.ls.remove(PERSON_NAME)

        resolve()
      })
    },

    /**
     * @description 获取用户信息
     * @param {Function} commit
     * @param {Object} userInfo
     * @return {Promise}
     */
    GetUserInfo ({ commit }, userInfo) {
      return userApi.getUserInfo(requestBuilder('getInfo', userInfo)).then(
        response => {
          const result = response.result || {}
          const role = result.role || {}
          const avatar = result.avatar || ''
          const orgName = result.orgName || ''
          const dataFlag = result.dataFlag || ''
          const personName = result.personName || ''
          const departmentName = result.departmentName || ''
          const departmentSysId = result.departmentSysId || ''
          const permissions = role.permissions || []

          // 角色及权限校验
          if (role && permissions.length > 0) {
            permissions.forEach(per => {
              if (per.actionEntitySet && per.actionEntitySet.length > 0) {
                per.actionList = per.actionEntitySet.map(action => {
                  return action.action
                })
              }
            })

            role.permissionList = permissions.map(permission => {
              return permission.permissionId
            })

            commit('SET_NAME', personName)
            commit('SET_AVATAR', avatar)
            commit('SET_ROLES', role)
            commit('SET_INFO', result)

            Vue.ls.set(ORG_NAME, orgName)
            Vue.ls.set(DEPT_ID, departmentSysId)
            Vue.ls.set(DEPT_NAME, departmentName)
            Vue.ls.set(DATA_FLAG, dataFlag)
            Vue.ls.set(PERSON_NAME, personName)

            return response
          }

          return Promise.reject(new Error(response.message || '获取用户失败!'))
        }
      )
    }
  }
}

import { axios } from '@/utils/request'

/**
 * @description 用户接口
 *
 * @api addUserInfo: 新增用户信息
 * @api getUserInfo: 获取用户信息
 * @api getUserMenu: 获取用户菜单
 * @api getUserInfoList: 获取用户列表
 * @api modifyUserInfo: 修改用户信息
 * @api deleteUserInfo: 删除用户信息
 */
const api = {
  addUserInfo: '/user/addUserInfo',
  getUserInfo: '/user/getUserInfo',
  getUserMenu: '/user/getUserMenu',
  getUserInfoList: '/user/getUserInfoList',
  modifyUserInfo: '/user/modifyUserInfo',
  deleteUserInfo: '/user/deleteUserInfo'
}

export function addUserInfo (data) {
  return axios({
    url: api.addUserInfo,
    method: 'post',
    data
  })
}

export function getUserInfo (data) {
  return axios({
    url: api.getUserInfo,
    method: 'post',
    data
  })
}

export function getUserMenu (data) {
  return axios({
    url: api.getUserMenu,
    method: 'post',
    data
  })
}

export function getUserInfoList (data) {
  return axios({
    url: api.getUserInfoList,
    method: 'post',
    data
  })
}

export function modifyUserInfo (data) {
  return axios({
    url: api.modifyUserInfo,
    method: 'post',
    data
  })
}

export function deleteUserInfo (data) {
  return axios({
    url: api.deleteUserInfo,
    method: 'post',
    data
  })
}

export default api

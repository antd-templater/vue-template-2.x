import { axios } from '@/utils/request'

/**
 * @description 角色接口
 *
 * @api addRoleInfo: 新增角色信息
 * @api getRoleInfoList: 获取所有角色列表
 * @api getRoleInfoByPages: 分页获取角色列表
 * @api getRoleInfoByUserNo: 获取用户角色列表
 * @api modifyRoleInfo: 修改角色信息
 * @api deleteRoleInfo: 删除角色信息
 */
const api = {
  addRoleInfo: 'role/addRoleInfo',
  getRoleInfoList: '/role/getRoleInfoList',
  getRoleInfoByPages: '/role/getRoleInfoByPages',
  getRoleInfoByUserNo: '/role/getRoleInfoByUserNo',
  modifyRoleInfo: 'role/modifyRoleInfo',
  deleteRoleInfo: 'role/deleteRoleInfo'
}

export function addRoleInfo (data) {
  return axios({
    url: api.addRoleInfo,
    method: 'post',
    data
  })
}

export function getRoleInfoList (data) {
  return axios({
    url: api.getRoleInfoList,
    method: 'post',
    data
  })
}

export function getRoleInfoByPages (data) {
  return axios({
    url: api.getRoleInfoByPages,
    method: 'post',
    data
  })
}

export function getRoleInfoByUserNo (data) {
  return axios({
    url: api.getRoleInfoByUserNo,
    method: 'post',
    data
  })
}

export function modifyRoleInfo (data) {
  return axios({
    url: api.modifyRoleInfo,
    method: 'post',
    data
  })
}

export function deleteRoleInfo (data) {
  return axios({
    url: api.deleteRoleInfo,
    method: 'post',
    data
  })
}

export default api

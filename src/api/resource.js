import { axios } from '@/utils/request'

/**
 * @description 资源接口
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 *
 * @api addResourceInfo: 新增资源信息
 * @api getResourceInfoList: 查询资源信息
 * @api getResourceMenuAll: 查询所有菜单资源
 * @api getResourceMenuByRole: 根据角色查询菜单资源
 * @api getResourceButtonByRole: 根据角色查询按钮资源
 * @api modifyResoureInfoByRoleId: 修改角色资源配置
 * @api modifyResourceInfo: 修改资源信息
 * @api deleteResourceInfo: 删除资源信息
 */
const api = {
  addResourceInfo: 'resource/addResourceInfo',
  getResourceInfoList: 'resource/getResourceInfoList',
  getResourceMenuAll: 'resource/getResourceMenuAll',
  getResourceMenuByRole: 'resource/getResourceMenuByRole',
  getResourceButtonByRole: 'resource/getResourceButtonByRole',
  modifyResoureInfoByRoleId: 'resource/modifyResoureInfoByRoleId',
  modifyResourceInfo: 'resource/modifyResourceInfo',
  deleteResourceInfo: 'resource/deleteResourceInfo'
}

export function addResourceInfo (data) {
  return axios({
    url: api.addResourceInfo,
    method: 'post',
    data: data
  })
}

export function getResourceInfoList (data) {
  return axios({
    url: api.getResourceInfoList,
    method: 'post',
    data: data
  })
}

export function getResourceMenuAll (data) {
  return axios({
    url: api.getResourceMenuAll,
    method: 'post',
    data: data
  })
}

export function getResourceMenuByRole (data) {
  return axios({
    url: api.getResourceMenuByRole,
    method: 'post',
    data: data
  })
}

export function getResourceButtonByRole (data) {
  return axios({
    url: api.getResourceButtonByRole,
    method: 'post',
    data: data
  })
}

export function modifyResoureInfoByRoleId (data) {
  return axios({
    url: api.modifyResoureInfoByRoleId,
    method: 'post',
    data: data
  })
}

export function modifyResourceInfo (data) {
  return axios({
    url: api.modifyResourceInfo,
    method: 'post',
    data: data
  })
}

export function deleteResourceInfo (data) {
  return axios({
    url: api.deleteResourceInfo,
    method: 'post',
    data: data
  })
}

export default api

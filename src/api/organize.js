import { axios } from '@/utils/request'

/**
 * @description 组织接口
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 *
 * @api addOrganizeInfo: 新增组织信息
 * @api getOrganizeInfoList: 获取组织信息列表
 * @api getOrganizeInfoTree: 获取组织Tree列表
 * @api modifyOrganizeInfo: 修改组织信息
 * @api deleteOrganizeInfo: 删除组织信息
 */
const api = {
  addOrganizeInfo: 'organize/addOrganizeInfo',
  getOrganizeInfoList: 'organize/getOrganizeInfoList',
  getOrganizeInfoTree: 'organize/getOrganizeInfoTree',
  modifyOrganizeInfo: 'organize/modifyOrganizeInfo',
  deleteOrganizeInfo: 'organize/deleteOrganizeInfo'
}

export function addOrganizeInfo (data) {
  return axios({
    url: api.addOrganizeInfo,
    method: 'post',
    data: data
  })
}

export function getOrganizeInfoList (data) {
  return axios({
    url: api.getOrganizeInfoList,
    method: 'post',
    data: data
  })
}

export function getOrganizeInfoTree (data) {
  return axios({
    url: api.getOrganizeInfoTree,
    method: 'post',
    data: data
  })
}

export function modifyOrganizeInfo (data) {
  return axios({
    url: api.modifyOrganizeInfo,
    method: 'post',
    data: data
  })
}

export function deleteOrganizeInfo (data) {
  return axios({
    url: api.deleteOrganizeInfo,
    method: 'post',
    data: data
  })
}

export default api

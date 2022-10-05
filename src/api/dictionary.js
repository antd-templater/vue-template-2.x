import { axios } from '@/utils/request'

/**
 * @description 字典接口
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 *
 * @api addBaseClass: 新增字典类别信息
 * @api addBaseCode: 新增字典代码信息
 * @api getBaseClass: 获取字典类别列表
 * @api getBaseCode: 获取字典代码列表
 * @api modifyBaseClass: 修改字典类别信息
 * @api modifyBaseCode: 修改字典代码信息
 * @api deleteBaseClass: 删除字典类别信息
 * @api deleteBaseCode: 删除字典代码信息
 */
const api = {
  addBaseClass: '/dictionary/addBaseClass',
  addBaseCode: '/dictionary/addBaseCode',
  getBaseClass: '/dictionary/getBaseClass',
  getBaseCode: '/dictionary/getBaseCode',
  modifyBaseClass: '/dictionary/modifyBaseClass',
  modifyBaseCode: '/dictionary/modifyBaseCode',
  deleteBaseClass: '/dictionary/deleteBaseClass',
  deleteBaseCode: '/dictionary/deleteBaseCode'
}

export function addBaseClass (data) {
  return axios({
    url: api.addBaseClass,
    method: 'post',
    data: data
  })
}

export function addBaseCode (data) {
  return axios({
    url: api.addBaseCode,
    method: 'post',
    data: data
  })
}

export function getBaseClass (data) {
  return axios({
    url: api.getBaseClass,
    method: 'post',
    data: data
  })
}

export function getBaseCode (data) {
  return axios({
    url: api.getBaseCode,
    method: 'post',
    data: data
  })
}

export function modifyBaseClass (data) {
  return axios({
    url: api.modifyBaseClass,
    method: 'post',
    data: data
  })
}

export function modifyBaseCode (data) {
  return axios({
    url: api.modifyBaseCode,
    method: 'post',
    data: data
  })
}

export function deleteBaseClass (data) {
  return axios({
    url: api.deleteBaseClass,
    method: 'post',
    data: data
  })
}

export function deleteBaseCode (data) {
  return axios({
    url: api.deleteBaseCode,
    method: 'post',
    data: data
  })
}

export default api

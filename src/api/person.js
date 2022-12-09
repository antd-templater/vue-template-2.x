import { axios } from '@/utils/request'

/**
 * @description 员工接口
 *
 * @api addPersonInfo: 新增员工信息
 * @api getPersonInfoList: 获取员工列表
 * @api modifyPersonInfo: 修改员工信息
 * @api deletePersonInfo: 删除员工信息
 */
const api = {
  addPersonInfo: 'person/addPersonInfo',
  getPersonInfoList: 'person/getPersonInfoList',
  modifyPersonInfo: 'person/modifyPersonInfo',
  deletePersonInfo: 'person/deletePersonInfo'
}

export function addPersonInfo (data) {
  return axios({
    url: api.addPersonInfo,
    method: 'post',
    data
  })
}

export function getPersonInfoList (data) {
  return axios({
    url: api.getPersonInfoList,
    method: 'post',
    data
  })
}

export function modifyPersonInfo (data) {
  return axios({
    url: api.modifyPersonInfo,
    method: 'post',
    data
  })
}

export function deletePersonInfo (data) {
  return axios({
    url: api.deletePersonInfo,
    method: 'post',
    data
  })
}

export default api

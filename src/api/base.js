import Vue from 'vue'
import { axios } from '@/utils/request'
import { ORG_ID } from '@/store/variable'

/**
 * @description 基础接口
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 *
 * @api getOptionById: 查询 Option 下拉框
 * @api getTreeById: 查询 Tree 下拉框
 */
const api = {
  getOptionById: '/base/getOptionById',
  getTreeById: '/base/getTreeById'
}

export function getOptionById (data) {
  return axios({
    url: api.getOptionById,
    method: 'post',
    data: {
      ...data,
      sqlParams: {
        orgId: Vue.ls.get(ORG_ID),
        ...data.sqlParams
      }
    }
  })
}

export function getTreeById (data) {
  return axios({
    url: api.getTreeById,
    method: 'post',
    data: {
      ...data,
      sqlParams: {
        orgId: Vue.ls.get(ORG_ID),
        ...data.sqlParams
      }
    }
  })
}

export default api

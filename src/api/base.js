import { axios } from '@/utils/request'

/**
 * @description 基础接口
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
    data
  })
}

export function getTreeById (data) {
  return axios({
    url: api.getTreeById,
    method: 'post',
    data
  })
}

export default api

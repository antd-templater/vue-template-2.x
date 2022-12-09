import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/resource'

/**
 * @descrption 模拟接口 - 修改资源信息
 */
Mock.mock(Utils.toRegex(api.modifyResourceInfo), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  const result = Utils.builder(null)

  // 输出日志
  log('\n\n--- 接口参数 - 修改资源信息 ---------')
  log(body)

  log('\n\n--- 接口数据 - 修改资源信息 ---------')
  log(result)

  // 返回结果
  return result
})

import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/role'

/**
 * @descrption 模拟接口 - 获取所有角色列表
 */
Mock.mock(Utils.toRegex(api.getRoleInfoList), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  const result = Utils.builder([
    {
      orgId: '101.100.131',
      roleId: '27442970747734159',
      roleName: '系统管理',
      dataFlag: '2',
      activity: 'Y'
    }
  ])

  // 输出日志
  log('\n\n--- 接口参数 - 获取所有角色列表 ---------')
  log(body)

  log('\n\n--- 接口数据 - 获取所有角色列表 ---------')
  log(result)

  // 返回结果
  return result
})

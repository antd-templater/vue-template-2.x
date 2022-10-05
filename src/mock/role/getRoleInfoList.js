import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/role'

/**
 * @descrption 模拟接口 - 获取所有角色列表
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
Mock.mock(Utils.toRegex(api.getRoleInfoList), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  const result = Utils.builder([
    {
      activity: 'Y',
      createBy: 'admin',
      createDate: 1642073583031,
      dataFlag: '2',
      doneTag: false,
      modifyBy: '182588xxx88',
      modifyDate: 1642468575934,
      orgId: '101.100.131',
      pageTag: false,
      roleId: '27442970747734159',
      roleName: '系统管理',
      todoTag: false
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

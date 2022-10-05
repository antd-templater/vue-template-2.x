import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/user'

/**
 * @descrption 模拟接口 - 获取用户信息
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
Mock.mock(Utils.toRegex(api.getUserInfo), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  const result = Utils.builder({
    activity: 'Y',
    dataFlag: '2',
    departmentName: '软件部',
    departmentSysId: '1126534161135795132',
    id: '11442970747734161',
    mobilePhone: '18258888888',
    orgId: '101.100.131',
    orgName: '北仑网安通信有限公司',
    personName: 'admin',
    postName: '系统管理',
    role: {
      permissions: [
        {
          roleId: '27442970747734159',
          permissionId: 'ResourceManager',
          actionEntitySet: [
            { action: 'add', defaultCheck: false, describe: '新增' },
            { action: 'del', defaultCheck: false, describe: '删除' }
          ]
        },
        {
          roleId: '27442970747734159',
          permissionId: 'Role',
          actionEntitySet: [
            { action: 'add', defaultCheck: false, describe: '新增' },
            { action: 'del', defaultCheck: false, describe: '删除' },
            { action: 'edit', defaultCheck: false, describe: '修改' },
            { action: 'query', defaultCheck: false, describe: '查询' }
          ]
        },
        {
          roleId: '27442970747734159',
          permissionId: 'Organize',
          actionEntitySet: [
            { action: 'add', defaultCheck: false, describe: '新增' },
            { action: 'del', defaultCheck: false, describe: '删除' },
            { action: 'edit', defaultCheck: false, describe: '修改' },
            { action: 'query', defaultCheck: false, describe: '查询' }
          ]
        },
        {
          roleId: '27442970747734159',
          permissionId: 'Person',
          actionEntitySet: [
            { action: 'add', defaultCheck: false, describe: '新增' },
            { action: 'del', defaultCheck: false, describe: '删除' },
            { action: 'edit', defaultCheck: false, describe: '修改' },
            { action: 'query', defaultCheck: false, describe: '查询' }
          ]
        },
        {
          roleId: '27442970747734159',
          permissionId: 'User',
          actionEntitySet: [
            { action: 'add', defaultCheck: false, describe: '新增' },
            { action: 'del', defaultCheck: false, describe: '删除' },
            { action: 'edit', defaultCheck: false, describe: '修改' },
            { action: 'query', defaultCheck: false, describe: '查询' }
          ]
        },
        {
          roleId: '27442970747734159',
          permissionId: 'Dictionary',
          actionEntitySet: [
            { action: 'add', defaultCheck: false, describe: '新增' },
            { action: 'del', defaultCheck: false, describe: '删除' },
            { action: 'edit', defaultCheck: false, describe: '修改' },
            { action: 'query', defaultCheck: false, describe: '查询' }
          ]
        }
      ]
    }
  })

  // 输出日志
  log('\n\n--- 接口参数 - 获取用户信息 ---------')
  log(body)

  log('\n\n--- 接口数据 - 获取用户信息 ---------')
  log(result)

  // 返回结果
  return result
})

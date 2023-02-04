import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/user'

/**
 * @descrption 模拟接口 - 获取用户信息
 */
Mock.mock(Utils.toRegex(api.getUserInfo), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  const result = Utils.builder({
    userNo: '182588xxx88',
    userName: 'admin',
    mobilePhone: '182588xxx88',
    postName: '系统管理',
    orgId: '101.100.131',
    orgName: '北仑网安通信有限公司',
    deptName: '软件部',
    deptId: '1126534161135795132',
    dataFlag: '2',
    activity: 'Y',
    role: {
      permissions: [
        {
          roleId: '27442970747734159',
          permissionId: 'ResourceManage',
          actionEntitySet: [
            { action: 'add', defaultCheck: false, describe: '新增' },
            { action: 'del', defaultCheck: false, describe: '删除' }
          ]
        },
        {
          roleId: '27442970747734159',
          permissionId: 'RoleManage',
          actionEntitySet: [
            { action: 'add', defaultCheck: false, describe: '新增' },
            { action: 'del', defaultCheck: false, describe: '删除' },
            { action: 'edit', defaultCheck: false, describe: '修改' },
            { action: 'query', defaultCheck: false, describe: '查询' }
          ]
        },
        {
          roleId: '27442970747734159',
          permissionId: 'OrganizeManage',
          actionEntitySet: [
            { action: 'add', defaultCheck: false, describe: '新增' },
            { action: 'del', defaultCheck: false, describe: '删除' },
            { action: 'edit', defaultCheck: false, describe: '修改' },
            { action: 'query', defaultCheck: false, describe: '查询' }
          ]
        },
        {
          roleId: '27442970747734159',
          permissionId: 'UserManage',
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

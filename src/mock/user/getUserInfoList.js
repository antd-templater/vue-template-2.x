import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/user'

/**
 * @descrption 模拟接口 - 获取用户列表
 */
Mock.mock(Utils.toRegex(api.getUserInfoList), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  const result = Utils.builder({
    data: [
      {
        userNo: '182588xxx88',
        userName: 'admin',
        password: '12345678',
        mobilePhone: '182588xxx88',
        idCard: '330206199901011111',
        orgId: '101.100.131',
        orgName: '北仑网安通信有限公司',
        deptName: '软件部',
        deptId: '1126534161135795132',
        postName: '系统管理',
        activity: 'Y'
      },
      {
        userNo: '182588xxx88',
        userName: '林某',
        password: '12345678',
        mobilePhone: '182588xxx88',
        idCard: '330204198603281111',
        orgId: '101.100.131',
        orgName: '北仑网安通信有限公司',
        deptName: '软件部',
        deptId: '1126534161135795132',
        postName: '系统管理',
        activity: 'Y'
      }
    ],
    pageNo: 1,
    pageSize: 20,
    totalCount: 2,
    totalPage: 1
  })

  // 输出日志
  log('\n\n--- 接口参数 - 获取用户列表 ---------')
  log(body)

  log('\n\n--- 接口数据 - 获取用户列表 ---------')
  log(result)

  // 返回结果
  return result
})

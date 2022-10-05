import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/user'

/**
 * @descrption 模拟接口 - 获取用户列表
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
Mock.mock(Utils.toRegex(api.getUserInfoList), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  const result = Utils.builder({
    data: [
      {
        activity: 'Y',
        createBy: 'admin',
        createDate: 1642073941231,
        departmentName: '软件部',
        departmentNum: '101.100.131.006',
        departmentSysId: '1126534161135795132',
        doneTag: false,
        id: '11442970747734161',
        idCard: '330206199901011111',
        mobilePhone: '182588xxx88',
        modifyBy: 'admin',
        modifyDate: 1642075661198,
        orgId: '101.100.131',
        orgName: '北仑网安通信有限公司',
        pageTag: false,
        password: '12345678',
        personName: 'admin',
        personNum: '182588xxx88',
        personSysId: '11442970747734160',
        postName: '系统管理',
        todoTag: false,
        userNo: '182588xxx88'
      },
      {
        activity: 'Y',
        createBy: 'admin',
        createDate: 1642073951575,
        departmentName: '软件部',
        departmentNum: '101.100.131.006',
        departmentSysId: '1126534161135795132',
        doneTag: false,
        id: '27442970747734162',
        idCard: '330204198603281111',
        mobilePhone: '182588xxx88',
        modifyBy: 'admin',
        modifyDate: 1642073951575,
        orgId: '101.100.131',
        orgName: '北仑网安通信有限公司',
        pageTag: false,
        password: '12345678',
        personName: '林某',
        personNum: '182588xxx88',
        personSysId: '26632627540721721',
        postName: '系统管理',
        todoTag: false,
        userNo: '182588xxx88'
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

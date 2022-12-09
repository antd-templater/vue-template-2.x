import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/person'

/**
 * @descrption 模拟接口 - 获取员工列表
 */
Mock.mock(Utils.toRegex(api.getPersonInfoList), 'post', options => {
  // 接口参数
  let result = null
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  switch (body && body.param && body.param.orgId) {
    case '1':
    case '101.100':
    case '101.100.131': {
      result = Utils.builder({
        data: [
          {
            activity: 'Y',
            createBy: 'admin',
            createDate: 1642073941231,
            departmentName: '软件部',
            departmentSysId: '1126534161135795132',
            idCard: '330206199901011111',
            isUser: 'Y',
            mobilePhone: '182588xxx88',
            modifyBy: 'admin',
            modifyDate: 1642075661198,
            orgId: '101.100.131',
            personName: 'admin',
            personNum: '182588xxx88',
            personSysId: '11442970747734160',
            postName: '系统管理'
          },
          {
            activity: 'Y',
            createBy: 'admin',
            createDate: 1642073951575,
            departmentName: '软件部',
            departmentSysId: '1126534161135795132',
            idCard: '330204198603281111',
            isUser: 'Y',
            mobilePhone: '183666xxx66',
            modifyBy: 'admin',
            modifyDate: 1642073951575,
            orgId: '101.100.131',
            personName: '林某',
            personNum: '183666xxx66',
            personSysId: '26632627540721721',
            postName: '系统管理'
          },
          {
            activity: 'Y',
            createBy: 'admin',
            createDate: 1642073951575,
            departmentName: '软件部',
            departmentSysId: '1126534161135795132',
            idCard: '330204199902132243',
            isUser: 'N',
            mobilePhone: '183888xxx11',
            modifyBy: 'admin',
            modifyDate: 1642073951575,
            orgId: '101.100.131',
            personName: '王某',
            personNum: '183888xxx11',
            personSysId: '26632627540722534',
            postName: '系统管理'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalCount: 2,
        totalPage: 1
      })
      break
    }
    default: {
      result = Utils.builder({
        data: [],
        pageNo: 1,
        pageSize: 20,
        totalCount: 0,
        totalPage: 0
      })
    }
  }

  // 输出日志
  log('\n\n--- 接口参数 - 获取员工列表 ---------')
  log(body)

  log('\n\n--- 接口数据 - 获取员工列表 ---------')
  log(result)

  // 返回结果
  return result
})

import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/auth'

/**
 * @descrption 模拟接口 - 系统登录
 */
Mock.mock(Utils.toRegex(api.login), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)
  const param = body.param || {}

  // 响应数据
  if (param.username !== 'admin' || param.password !== '25d55ad283aa400af464c76d713c07ad') {
    const result = Utils.builder(null, '用户名密码错误', '9999')

    // 输出日志
    log('\n\n--- 接口参数 - 系统登录 ---------')
    log(body)

    log('\n\n--- 接口数据 - 系统登录 ---------')
    log(result)

    // 返回结果
    return result
  }

  // 响应数据
  const result = Utils.builder({
    data: {
      activity: 'Y',
      createBy: 'admin',
      createDate: 1642073941231,
      id: '11442970747734161',
      mobilePhone: '182588xxx88',
      modifyBy: 'admin',
      modifyDate: 1642075669198,
      orgId: '101.100.131',
      personSysId: '11442970747734160',
      userNo: '182588xxx88'
    },
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODI1ODc2NDMyMSIsImV4cCI6MTY0MjQ4NTQwNX0.gFrCkMY5OlheC7sF7elhb8cF2fvkD-dj950xklyI14Q'
  })

  // 输出日志
  log('\n\n--- 接口参数 - 系统登录 ---------')
  log(body)

  log('\n\n--- 接口数据 - 系统登录 ---------')
  log(result)

  // 返回结果
  return result
})

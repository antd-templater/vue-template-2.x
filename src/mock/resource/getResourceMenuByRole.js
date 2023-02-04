import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/resource'

/**
 * @descrption 模拟接口 - 根据角色查询菜单资源
 */
Mock.mock(Utils.toRegex(api.getResourceMenuByRole), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  const result = Utils.builder({
    treeNodes: [
      {
        label: '根目录',
        value: '0',
        children: [
          {
            label: '系统管理',
            value: '27245863256459422',
            children: [
              { children: [], label: '组织管理', value: '1127282136000102507' },
              { children: [], label: '资源管理', value: '27245863256459445' },
              { children: [], label: '角色管理', value: '27245863256459495' },
              { children: [], label: '用户管理', value: '1127282136000102579' }
            ]
          }
        ]
      }
    ],
    treeSelect: [
      '27245863256459422',
      '1127282136000102507',
      '27245863256459445',
      '27245863256459495',
      '1127282136000102579'
    ]
  })

  // 输出日志
  log('\n\n--- 接口参数 - 根据角色查询菜单资源 ---------')
  log(body)

  log('\n\n--- 接口数据 - 根据角色查询菜单资源 ---------')
  log(result)

  // 返回结果
  return result
})

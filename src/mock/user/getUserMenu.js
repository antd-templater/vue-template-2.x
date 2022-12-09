import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/user'

/**
 * @descrption 模拟接口 - 获取用户菜单
 */
Mock.mock(Utils.toRegex(api.getUserMenu), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  const result = Utils.builder([
    {
      meta: {
        icon: 'codepen',
        show: true,
        title: '系统管理'
      },
      id: '27245863256459422',
      name: 'system',
      path: '',
      component: 'PageView',
      parentId: '0',
      redirect: '/system/OrganizeManage',
      sort: 1000000
    },
    {
      meta: {
        icon: '',
        show: true,
        title: '组织管理'
      },
      id: '1127282136000102507',
      name: 'OrganizeManage',
      path: '/system/OrganizeManage',
      component: 'OrganizeManage',
      parentId: '27245863256459422',
      redirect: '',
      sort: 1000100
    },
    {
      meta: {
        icon: '',
        show: true,
        title: '资源管理'
      },
      id: '27245863256459445',
      name: 'ResourceManage',
      path: '/system/ResourceManage',
      component: 'ResourceManage',
      parentId: '27245863256459422',
      redirect: '',
      sort: 1000200
    },
    {
      meta: {
        icon: '',
        show: true,
        title: '角色管理'
      },
      id: '27245863256459495',
      name: 'RoleManage',
      path: '/system/RoleManage',
      component: 'RoleManage',
      parentId: '27245863256459422',
      redirect: '',
      sort: 1000300
    },
    {
      meta: {
        icon: '',
        show: true,
        title: '员工管理'
      },
      id: '1127282136000102555',
      name: 'PersonManage',
      path: '/system/PersonManage',
      component: 'PersonManage',
      parentId: '27245863256459422',
      redirect: '',
      sort: 1000400
    },
    {
      meta: {
        icon: '',
        show: true,
        title: '用户管理'
      },
      id: '1127282136000102579',
      name: 'UserManage',
      path: '/system/UserManage',
      component: 'UserManage',
      parentId: '27245863256459422',
      redirect: '',
      sort: 1000500
    },
    {
      meta: {
        icon: '',
        show: true,
        title: '字典管理'
      },
      id: '1127282136000102608',
      name: 'DictionaryManage',
      path: '/system/DictionaryManage',
      component: 'DictionaryManage',
      parentId: '27245863256459422',
      redirect: '',
      sort: 1000600
    }
  ])

  // 输出日志
  log('\n\n--- 接口参数 - 获取用户菜单 ---------')
  log(body)

  log('\n\n--- 接口数据 - 获取用户菜单 ---------')
  log(result)

  // 返回结果
  return result
})

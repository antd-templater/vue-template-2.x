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
      id: '27245863256459422',
      name: 'system',
      path: '',
      parentId: '0',
      component: 'PageView',
      redirect: '/system/OrganizeManage',
      meta: {
        icon: 'codepen',
        title: '系统管理',
        hideChildInMenu: 'N',
        hideInMenu: 'N',
        allowCache: 'Y'
      }
    },
    {
      id: '1127282136000102507',
      name: 'OrganizeManage',
      path: '/system/OrganizeManage',
      parentId: '27245863256459422',
      component: 'OrganizeManage',
      redirect: '',
      meta: {
        title: '组织管理',
        icon: '',
        hideChildInMenu: 'N',
        hideInMenu: 'N',
        allowCache: 'Y'
      }
    },
    {
      id: '27245863256459445',
      name: 'ResourceManage',
      path: '/system/ResourceManage',
      parentId: '27245863256459422',
      component: 'ResourceManage',
      redirect: '',
      meta: {
        title: '资源管理',
        icon: '',
        hideChildInMenu: 'N',
        hideInMenu: 'N',
        allowCache: 'Y'
      }
    },
    {
      id: '27245863256459495',
      name: 'RoleManage',
      path: '/system/RoleManage',
      parentId: '27245863256459422',
      component: 'RoleManage',
      redirect: '',
      meta: {
        title: '角色管理',
        icon: '',
        hideChildInMenu: 'N',
        hideInMenu: 'N',
        allowCache: 'Y'
      }
    },
    {
      id: '1127282136000102579',
      name: 'UserManage',
      path: '/system/UserManage',
      parentId: '27245863256459422',
      component: 'UserManage',
      redirect: '',
      meta: {
        title: '用户管理',
        icon: '',
        hideChildInMenu: 'N',
        hideInMenu: 'N',
        allowCache: 'Y'
      }
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

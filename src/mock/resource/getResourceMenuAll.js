import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/resource'

/**
 * @descrption 模拟接口 - 查询所有菜单资源
 */
Mock.mock(Utils.toRegex(api.getResourceMenuAll), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  const result = Utils.builder({
    nodes: [
      {
        sort: 1000000,
        path: '',
        icon: 'codepen',
        title: '系统管理',
        redirect: '',
        parentId: '0',
        component: 'PageView',
        resourceId: '27245863256459422',
        resourceName: 'system',
        resourceType: 'm',
        hideChildInMenu: 'N',
        hideInMenu: 'N',
        allowCache: 'Y',
        activity: 'Y'
      },
      {
        sort: 1000100,
        path: '/system/OrganizeManage',
        icon: '',
        title: '组织管理',
        redirect: '',
        parentId: '27245863256459422',
        component: 'OrganizeManage',
        resourceId: '1127282136000102507',
        resourceName: 'OrganizeManage',
        resourceType: 'm',
        hideChildInMenu: 'N',
        hideInMenu: 'N',
        allowCache: 'Y',
        activity: 'Y'
      },
      {
        sort: 1000200,
        path: '/system/ResourceManage',
        icon: '',
        title: '资源管理',
        redirect: '',
        parentId: '27245863256459422',
        component: 'ResourceManage',
        resourceId: '27245863256459445',
        resourceName: 'ResourceManage',
        resourceType: 'm',
        hideChildInMenu: 'N',
        hideInMenu: 'N',
        allowCache: 'Y',
        activity: 'Y'
      },
      {
        sort: 1000300,
        path: '/system/RoleManage',
        icon: '',
        title: '角色管理',
        redirect: '',
        parentId: '27245863256459422',
        component: 'RoleManage',
        resourceId: '27245863256459495',
        resourceName: 'RoleManage',
        resourceType: 'm',
        hideChildInMenu: 'N',
        hideInMenu: 'N',
        allowCache: 'Y',
        activity: 'Y'
      },
      {
        sort: 1000400,
        path: '/system/UserManage',
        icon: '',
        title: '用户管理',
        redirect: '',
        parentId: '27245863256459422',
        component: 'UserManage',
        resourceId: '1127282136000102579',
        resourceName: 'UserManage',
        resourceType: 'm',
        hideChildInMenu: 'N',
        hideInMenu: 'N',
        allowCache: 'Y',
        activity: 'Y'
      }
    ],
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
    ]
  })

  // 输出日志
  log('\n\n--- 接口参数 - 查询所有菜单资源 ---------')
  log(body)

  log('\n\n--- 接口数据 - 查询所有菜单资源 ---------')
  log(result)

  // 返回结果
  return result
})

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
        activity: 'Y',
        component: 'PageView',
        icon: 'codepen',
        isShow: 'Y',
        parentId: '0',
        platformCode: 'web',
        resourceId: '27245863256459422',
        resourceName: 'system',
        resourceType: 'm',
        sort: 1000000,
        title: '系统管理'
      },
      {
        activity: 'Y',
        component: 'OrganizeManage',
        icon: '',
        isShow: 'Y',
        parentId: '27245863256459422',
        path: '/system/OrganizeManage',
        platformCode: 'web',
        redirect: '',
        resourceId: '1127282136000102507',
        resourceName: 'OrganizeManage',
        resourceType: 'm',
        sort: 1000100,
        title: '组织管理'
      },
      {
        activity: 'Y',
        component: 'ResourceManage',
        icon: '',
        isShow: 'Y',
        parentId: '27245863256459422',
        path: '/system/ResourceManage',
        platformCode: 'web',
        redirect: '',
        resourceId: '27245863256459445',
        resourceName: 'ResourceManage',
        resourceType: 'm',
        sort: 1000200,
        title: '资源管理'
      },
      {
        activity: 'Y',
        component: 'RoleManage',
        icon: '',
        isShow: 'Y',
        parentId: '27245863256459422',
        path: '/system/RoleManage',
        platformCode: 'web',
        redirect: '',
        resourceId: '27245863256459495',
        resourceName: 'RoleManage',
        resourceType: 'm',
        sort: 1000300,
        title: '角色管理'
      },
      {
        activity: 'Y',
        component: 'PersonManage',
        icon: '',
        isShow: 'Y',
        parentId: '27245863256459422',
        path: '/system/PersonManage',
        platformCode: 'web',
        redirect: '',
        resourceId: '1127282136000102555',
        resourceName: 'PersonManage',
        resourceType: 'm',
        sort: 1000400,
        title: '员工管理'
      },
      {
        activity: 'Y',
        component: 'UserManage',
        icon: '',
        isShow: 'Y',
        parentId: '27245863256459422',
        path: '/system/UserManage',
        platformCode: 'web',
        redirect: '',
        resourceId: '1127282136000102579',
        resourceName: 'UserManage',
        resourceType: 'm',
        sort: 1000500,
        title: '用户管理'
      },
      {
        activity: 'Y',
        component: 'DictionaryManage',
        icon: '',
        isShow: 'Y',
        parentId: '27245863256459422',
        path: '/system/DictionaryManage',
        platformCode: 'web',
        redirect: '',
        resourceId: '1127282136000102608',
        resourceName: 'DictionaryManage',
        resourceType: 'm',
        sort: 1000600,
        title: '字典管理'
      }
    ],
    treeNodes: [
      {
        children: [
          {
            children: [
              { children: [], label: '组织管理', value: '1127282136000102507' },
              { children: [], label: '资源管理', value: '27245863256459445' },
              { children: [], label: '角色管理', value: '27245863256459495' },
              { children: [], label: '员工管理', value: '1127282136000102555' },
              { children: [], label: '用户管理', value: '1127282136000102579' },
              { children: [], label: '字典管理', value: '1127282136000102608' }
            ],
            label: '系统管理',
            value: '27245863256459422'
          }
        ],
        label: '根目录',
        value: '0'
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

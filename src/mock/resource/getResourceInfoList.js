import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/resource'

/**
 * @descrption 模拟接口 - 查询资源信息
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
Mock.mock(Utils.toRegex(api.getResourceInfoList), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)
  const param = body.param || {}

  // 响应数据
  let result = null
  switch (param.parentId) {
    case '1127282136000102507': {
      result = Utils.builder({
        data: [
          {
            activity: 'Y',
            component: 'Organize',
            icon: '',
            isShow: '',
            parentId: '1127282136000102507',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102508',
            resourceName: 'add',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 1,
            title: '新增'
          },
          {
            activity: 'Y',
            component: 'Organize',
            icon: '',
            isShow: '',
            parentId: '1127282136000102507',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102509',
            resourceName: 'del',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 2,
            title: '删除'
          },
          {
            activity: 'Y',
            component: 'Organize',
            icon: '',
            isShow: '',
            parentId: '1127282136000102507',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102510',
            resourceName: 'edit',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 3,
            title: '修改'
          },
          {
            activity: 'Y',
            component: 'Organize',
            icon: '',
            isShow: '',
            parentId: '1127282136000102507',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102511',
            resourceName: 'query',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 4,
            title: '查询'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalCount: 4,
        totalPage: 1
      })
      break
    }
    case '27245863256459445': {
      result = Utils.builder({
        data: [
          {
            activity: 'Y',
            component: 'ResourceManager',
            icon: '',
            isShow: '',
            parentId: '27245863256459445',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '27245863256459447',
            resourceName: 'add',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 1,
            title: '新增'
          },
          {
            activity: 'Y',
            component: 'ResourceManager',
            icon: '',
            isShow: '',
            parentId: '27245863256459445',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '27245863256459449',
            resourceName: 'del',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 2,
            title: '删除'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalCount: 2,
        totalPage: 1
      })
      break
    }
    case '27245863256459495': {
      result = Utils.builder({
        data: [
          {
            activity: 'Y',
            component: 'Role',
            icon: '',
            isShow: '',
            parentId: '27245863256459495',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '27245863256459496',
            resourceName: 'add',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 1,
            title: '新增'
          },
          {
            activity: 'Y',
            component: 'Role',
            icon: '',
            isShow: '',
            parentId: '27245863256459495',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '27245863256459497',
            resourceName: 'del',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 2,
            title: '删除'
          },
          {
            activity: 'Y',
            component: 'Role',
            icon: '',
            isShow: '',
            parentId: '27245863256459495',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '27245863256459498',
            resourceName: 'edit',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 3,
            title: '修改'
          },
          {
            activity: 'Y',
            component: 'Role',
            icon: '',
            isShow: '',
            parentId: '27245863256459495',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '27245863256459499',
            resourceName: 'query',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 4,
            title: '查询'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalCount: 4,
        totalPage: 1
      })
      break
    }
    case '1127282136000102555': {
      result = Utils.builder({
        data: [
          {
            activity: 'Y',
            component: 'Person',
            icon: '',
            isShow: '',
            parentId: '1127282136000102555',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102563',
            resourceName: 'add',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 1,
            title: '新增'
          },
          {
            activity: 'Y',
            component: 'Person',
            icon: '',
            isShow: '',
            parentId: '1127282136000102555',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102564',
            resourceName: 'del',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 2,
            title: '删除'
          },
          {
            activity: 'Y',
            component: 'Person',
            icon: '',
            isShow: '',
            parentId: '1127282136000102555',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102565',
            resourceName: 'edit',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 3,
            title: '修改'
          },
          {
            activity: 'Y',
            component: 'Person',
            icon: '',
            isShow: '',
            parentId: '1127282136000102555',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102566',
            resourceName: 'query',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 4,
            title: '查询'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalCount: 4,
        totalPage: 1
      })
      break
    }
    case '1127282136000102579': {
      result = Utils.builder({
        data: [
          {
            activity: 'Y',
            component: 'User',
            icon: '',
            isShow: '',
            parentId: '1127282136000102579',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102580',
            resourceName: 'add',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 1,
            title: '新增'
          },
          {
            activity: 'Y',
            component: 'User',
            icon: '',
            isShow: '',
            parentId: '1127282136000102579',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102581',
            resourceName: 'del',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 2,
            title: '删除'
          },
          {
            activity: 'Y',
            component: 'User',
            icon: '',
            isShow: '',
            parentId: '1127282136000102579',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102582',
            resourceName: 'edit',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 3,
            title: '修改'
          },
          {
            activity: 'Y',
            component: 'User',
            icon: '',
            isShow: '',
            parentId: '1127282136000102579',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102583',
            resourceName: 'query',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 4,
            title: '查询'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalCount: 4,
        totalPage: 1
      })
      break
    }
    case '1127282136000102608': {
      result = Utils.builder({
        data: [
          {
            activity: 'Y',
            component: 'Dictionary',
            icon: '',
            isShow: '',
            parentId: '1127282136000102608',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102609',
            resourceName: 'add',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 1,
            title: '新增'
          },
          {
            activity: 'Y',
            component: 'Dictionary',
            icon: '',
            isShow: '',
            parentId: '1127282136000102608',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102610',
            resourceName: 'del',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 2,
            title: '删除'
          },
          {
            activity: 'Y',
            component: 'Dictionary',
            icon: '',
            isShow: '',
            parentId: '1127282136000102608',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102611',
            resourceName: 'edit',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 3,
            title: '修改'
          },
          {
            activity: 'Y',
            component: 'Dictionary',
            icon: '',
            isShow: '',
            parentId: '1127282136000102608',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '1127282136000102612',
            resourceName: 'query',
            resourceType: 'b',
            roleId: '',
            selectFlag: '',
            sort: 4,
            title: '查询'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalCount: 4,
        totalPage: 1
      })
      break
    }
    case '1127282136000102508': {
      result = Utils.builder({
        data: [
          {
            activity: 'Y',
            component: '',
            icon: '',
            isShow: 'Y',
            parentId: '1127282136000102508',
            path: '',
            platformCode: 'web',
            redirect: '',
            resourceId: '26722904834083932',
            resourceName: '/api/resource/add',
            resourceType: 's',
            roleId: '',
            selectFlag: '',
            sort: 0,
            title: '组织新增'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalCount: 1,
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
  log('\n\n--- 接口参数 - 查询资源信息 ---------')
  log(body)

  log('\n\n--- 接口数据 - 查询资源信息 ---------')
  log(result)

  // 返回结果
  return result
})

import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/organize'

/**
 * @descrption 模拟接口 - 获取组织列表
 */
Mock.mock(Utils.toRegex(api.getOrganizeInfoList), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  let result = null
  switch (body && body.param && body.param.orgId) {
    case '1': {
      result = Utils.builder({
        data: [
          {
            key: '1',
            isOrg: 'Y',
            isLeaf: false,
            title: '浙大远疆投资集团有限公司',
            orgShortName: '集团公司',
            parentOrgId: '0',
            parentOrgName: '',
            activity: 'Y'
          },
          {
            key: '101.100',
            isOrg: 'Y',
            isLeaf: false,
            title: '港运信息有限公司',
            orgShortName: '港运公司',
            parentOrgId: '1',
            parentOrgName: '浙大远疆投资集团有限公司',
            activity: 'Y'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalCount: 2,
        totalPage: 1
      })
      break
    }
    case '101.100': {
      result = Utils.builder({
        data: [
          {
            key: '101.100',
            isOrg: 'Y',
            isLeaf: false,
            title: '港运信息有限公司',
            orgShortName: '港运公司',
            parentOrgId: '1',
            parentOrgName: '浙大远疆投资集团有限公司',
            activity: 'Y'
          },
          {
            key: '101.100.131',
            isOrg: 'Y',
            isLeaf: false,
            title: '北仑网安通信有限公司',
            orgShortName: '北仑网安',
            parentOrgId: '101.100',
            parentOrgName: '港运信息有限公司',
            activity: 'Y'
          },
          {
            key: '101.100.138',
            isOrg: 'Y',
            isLeaf: false,
            title: '宁财港务有限公司',
            orgShortName: '宁财港务',
            parentOrgId: '101.100',
            parentOrgName: '港运信息有限公司',
            activity: 'Y'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalCount: 3,
        totalPage: 1
      })
      break
    }
    case '101.100.131': {
      result = Utils.builder({
        data: [
          {
            key: '101.100.131',
            isOrg: 'Y',
            isLeaf: false,
            title: '北仑网安通信有限公司',
            orgShortName: '北仑网安',
            parentOrgId: '101.100',
            parentOrgName: '港运信息有限公司',
            activity: 'Y'
          },
          {
            key: '1126534161135795126',
            isOrg: 'N',
            isLeaf: true,
            title: '公司部',
            orgShortName: '',
            activity: 'Y'
          },
          {
            key: '1126534161135795127',
            isOrg: 'N',
            isLeaf: true,
            title: '人事部',
            orgShortName: '',
            activity: 'Y'
          },
          {
            key: '1126534161135795128',
            isOrg: 'N',
            isLeaf: true,
            title: '财务部',
            orgShortName: '',
            activity: 'Y'
          },
          {
            key: '1126534161135795129',
            isOrg: 'N',
            isLeaf: true,
            title: '市场部',
            orgShortName: '',
            activity: 'Y'
          },
          {
            key: '1126534161135795130',
            isOrg: 'N',
            isLeaf: true,
            title: '运维部',
            orgShortName: '',
            activity: 'Y'
          },
          {
            key: '1126534161135795131',
            isOrg: 'N',
            isLeaf: true,
            title: '系统部',
            orgShortName: '',
            activity: 'Y'
          },
          {
            key: '1126534161135795132',
            isOrg: 'N',
            isLeaf: true,
            title: '开发部',
            orgShortName: '',
            activity: 'Y'
          },
          {
            key: '1126534161135795133',
            isOrg: 'N',
            isLeaf: true,
            title: '大数据中心',
            orgShortName: '',
            activity: 'Y'
          },
          {
            key: '1126534161135795134',
            isOrg: 'N',
            isLeaf: true,
            title: '技术中心',
            orgShortName: '',
            activity: 'Y'
          },
          {
            key: '1126534161135795135',
            isOrg: 'N',
            isLeaf: true,
            title: '研发中心',
            orgShortName: '',
            activity: 'Y'
          },
          {
            key: '1126534161135795642',
            isOrg: 'N',
            isLeaf: true,
            title: '后勤中心',
            orgShortName: '',
            activity: 'Y'
          },
          {
            key: '1127020120488651741',
            isOrg: 'N',
            isLeaf: true,
            title: '工程部',
            orgShortName: '',
            activity: 'Y'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalCount: 13,
        totalPage: 1
      })
      break
    }
    case '101.100.138': {
      result = Utils.builder({
        data: [
          {
            key: '101.100.138',
            isOrg: 'Y',
            isLeaf: false,
            title: '宁财港务有限公司',
            orgShortName: '宁财港务',
            parentOrgId: '101.100',
            parentOrgName: '港运信息有限公司',
            activity: 'Y'
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
      return Utils.builder({
        data: [],
        pageNo: 1,
        pageSize: 20,
        totalCount: 0,
        totalPage: 0
      })
    }
  }

  // 输出日志
  log('\n\n--- 接口参数 - 获取组织列表 ---------')
  log(body)

  log('\n\n--- 接口数据 - 获取组织列表 ---------')
  log(result)

  // 返回结果
  return result
})

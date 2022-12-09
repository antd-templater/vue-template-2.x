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
            activity: 'Y',
            isLeaf: false,
            isOrg: 'Y',
            key: '1',
            orgShortName: '集团公司',
            parentOrgId: '0',
            parentOrgName: '',
            title: '浙大远疆投资集团有限公司'
          },
          {
            activity: 'Y',
            isLeaf: false,
            isOrg: 'Y',
            key: '101.100',
            modifyBy: 'admin',
            modifyDate: 1586933844775,
            orgShortName: '港运公司',
            parentOrgId: '1',
            parentOrgName: '浙大远疆投资集团有限公司',
            title: '港运信息有限公司'
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
            activity: 'Y',
            isLeaf: false,
            isOrg: 'Y',
            key: '101.100',
            modifyBy: 'admin',
            modifyDate: 1586933844775,
            orgShortName: '港运公司',
            parentOrgId: '1',
            parentOrgName: '浙大远疆投资集团有限公司',
            title: '港运信息有限公司'
          },
          {
            activity: 'Y',
            isLeaf: false,
            isOrg: 'Y',
            key: '101.100.131',
            modifyBy: 'admin',
            modifyDate: 1587974005199,
            orgShortName: '北仑网安',
            parentOrgId: '101.100',
            parentOrgName: '港运信息有限公司',
            title: '北仑网安通信有限公司'
          },
          {
            activity: 'Y',
            isLeaf: false,
            isOrg: 'Y',
            key: '101.100.138',
            modifyBy: '',
            modifyDate: 1511196241514,
            orgShortName: '宁财港务',
            parentOrgId: '101.100',
            parentOrgName: '港运信息有限公司',
            title: '宁财港务有限公司'
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
            activity: 'Y',
            isLeaf: false,
            isOrg: 'Y',
            key: '101.100.131',
            modifyBy: 'admin',
            modifyDate: 1587974005199,
            orgShortName: '北仑网安',
            parentOrgId: '101.100',
            parentOrgName: '港运信息有限公司',
            title: '北仑网安通信有限公司'
          },
          {
            isLeaf: true,
            isOrg: 'N',
            key: '1126534161135795126',
            orgShortName: '',
            title: '公司部'
          },
          {
            isLeaf: true,
            isOrg: 'N',
            key: '1126534161135795127',
            orgShortName: '',
            title: '人事部'
          },
          {
            isLeaf: true,
            isOrg: 'N',
            key: '1126534161135795128',
            orgShortName: '',
            title: '财务部'
          },
          {
            isLeaf: true,
            isOrg: 'N',
            key: '1126534161135795129',
            orgShortName: '',
            title: '市场部'
          },
          {
            isLeaf: true,
            isOrg: 'N',
            key: '1126534161135795130',
            orgShortName: '',
            title: '运维部'
          },
          {
            isLeaf: true,
            isOrg: 'N',
            key: '1126534161135795131',
            orgShortName: '',
            title: '系统部'
          },
          {
            isLeaf: true,
            isOrg: 'N',
            key: '1126534161135795132',
            orgShortName: '',
            title: '开发部'
          },
          {
            isLeaf: true,
            isOrg: 'N',
            key: '1126534161135795133',
            orgShortName: '',
            title: '大数据中心'
          },
          {
            isLeaf: true,
            isOrg: 'N',
            key: '1126534161135795134',
            orgShortName: '',
            title: '技术中心'
          },
          {
            isLeaf: true,
            isOrg: 'N',
            key: '1126534161135795135',
            orgShortName: '',
            title: '研发中心'
          },
          {
            isLeaf: true,
            isOrg: 'N',
            key: '1126534161135795642',
            orgShortName: '',
            title: '后勤中心'
          },
          {
            isLeaf: true,
            isOrg: 'N',
            key: '1127020120488651741',
            orgShortName: '',
            title: '工程部'
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
            activity: 'Y',
            isLeaf: false,
            isOrg: 'Y',
            key: '101.100.138',
            modifyBy: '',
            modifyDate: 1511196241514,
            orgShortName: '宁财港务',
            parentOrgId: '101.100',
            parentOrgName: '港运信息有限公司',
            title: '宁财港务有限公司'
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

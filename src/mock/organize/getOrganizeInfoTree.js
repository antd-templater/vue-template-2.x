import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/organize'

/**
 * @descrption 模拟接口 - 获取组织Tree列表
 */
Mock.mock(Utils.toRegex(api.getOrganizeInfoTree), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  let result = null
  switch (body && body.param && body.param.orgId) {
    case '0': {
      result = Utils.builder([
        {
          key: '1',
          isOrg: 'Y',
          isLeaf: false,
          title: '浙大远疆投资集团有限公司',
          orgShortName: '集团公司'
        }
      ])
      break
    }
    case '1': {
      result = Utils.builder([
        {
          key: '101.100',
          isOrg: 'Y',
          isLeaf: false,
          title: '港运信息有限公司',
          orgShortName: '港运公司'
        }
      ])
      break
    }
    case '101.100': {
      result = Utils.builder([
        {
          key: '101.100.131',
          isOrg: 'Y',
          isLeaf: true,
          title: '北仑网安通信有限公司',
          orgShortName: '北仑网安'
        },
        {
          key: '101.100.138',
          isOrg: 'Y',
          isLeaf: true,
          title: '宁财港务有限公司',
          orgShortName: '宁财港务'
        }
      ])
      break
    }
    default: {
      result = Utils.builder([])
    }
  }

  // 输出日志
  log('\n\n--- 接口参数 - 获取组织Tree列表 ---------')
  log(body)

  log('\n\n--- 接口数据 - 获取组织Tree列表 ---------')
  log(result)

  // 返回结果
  return result
})

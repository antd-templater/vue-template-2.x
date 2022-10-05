import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/dictionary'

/**
 * @descrption 模拟接口 - 获取字典类别列表
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
Mock.mock(Utils.toRegex(api.getBaseClass), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  const result = Utils.builder({
    data: [
      {
        activity: 'Y',
        codeClassId: 'approval_status',
        codeClassName: '审批状态',
        modifyBy: 'admin',
        modifyDate: 1587020114424,
        showSequence: 1
      },
      {
        activity: 'Y',
        codeClassId: 'asset_ship_fl',
        codeClassName: '船舶分类',
        showSequence: 1
      }
    ],
    pageNo: 1,
    pageSize: 20,
    totalCount: 2,
    totalPage: 1
  })

  // 输出日志
  log('\n\n--- 接口参数 - 获取字典类别列表 ---------')
  log(body)

  log('\n\n--- 接口数据 - 获取字典类别列表 ---------')
  log(result)

  // 返回结果
  return result
})

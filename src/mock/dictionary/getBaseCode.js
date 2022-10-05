import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/dictionary'

/**
 * @descrption 模拟接口 - 获取字典代码列表
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
Mock.mock(Utils.toRegex(api.getBaseCode), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)

  // 响应数据
  let result = null
  switch (body && body.param && body.param.codeClassId) {
    case 'approval_status': {
      result = Utils.builder({
        data: [
          {
            activity: 'Y',
            codeClassId: 'approval_status',
            codeId: 'approval1001',
            codeName: '申请人发起',
            codeSysId: '1126534161135795011',
            modifyBy: 'admin',
            modifyDate: 1587020114424,
            showSequence: 1,
            udf1: 'start',
            udf2: '申请人发起'
          },
          {
            activity: 'Y',
            codeClassId: 'approval_status',
            codeId: 'approval1002',
            codeName: '审批中',
            codeSysId: '1126534161135795012',
            modifyBy: 'admin',
            modifyDate: 1587020114424,
            showSequence: 2,
            udf1: 'flowing',
            udf2: '审批中'
          },
          {
            activity: 'Y',
            codeClassId: 'approval_status',
            codeId: 'approval1003',
            codeName: '已审批通过',
            codeSysId: '1126534161135795013',
            modifyBy: 'admin',
            modifyDate: 1587020114424,
            showSequence: 3,
            udf1: 'approved',
            udf2: '审批完成'
          },
          {
            activity: 'Y',
            codeClassId: 'approval_status',
            codeId: 'approval1004',
            codeName: '已结束',
            codeSysId: '1126534161135795014',
            modifyBy: 'admin',
            modifyDate: 1587020114424,
            showSequence: 4,
            udf1: 'finished',
            udf2: '已结束'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalCount: 8,
        totalPage: 1
      })
      break
    }
    case 'asset_ship_fl': {
      result = Utils.builder({
        data: [
          {
            activity: 'Y',
            codeClassId: 'asset_ship_fl',
            codeId: '006',
            codeName: '拖轮',
            codeSysId: '00980999219329300',
            createBy: '',
            showSequence: 1,
            udf1: '',
            udf2: '',
            udf3: ''
          },
          {
            activity: 'Y',
            codeClassId: 'asset_ship_fl',
            codeId: '006002',
            codeName: '消拖两用船',
            codeSysId: '40110299719329300',
            createBy: '',
            showSequence: 2,
            udf1: '',
            udf2: '',
            udf3: ''
          },
          {
            activity: 'Y',
            codeClassId: 'asset_ship_fl',
            codeId: '006001',
            codeName: '客货两用船',
            codeSysId: '50110299619329300',
            createBy: '',
            showSequence: 1,
            udf1: '',
            udf2: '',
            udf3: ''
          },
          {
            activity: 'Y',
            codeClassId: 'asset_ship_fl',
            codeId: '007',
            codeName: '引航船',
            codeSysId: '60110299519329300',
            createBy: '',
            showSequence: 4,
            udf1: '',
            udf2: '',
            udf3: ''
          },
          {
            activity: 'Y',
            codeClassId: 'asset_ship_fl',
            codeId: '007001',
            codeName: '大吨位引航船',
            codeSysId: '90384354953454300',
            createBy: '',
            showSequence: 1,
            udf1: '',
            udf2: '',
            udf3: ''
          },
          {
            activity: 'Y',
            codeClassId: 'asset_ship_fl',
            codeId: '008',
            codeName: '集装箱船',
            codeSysId: '70110799419329300',
            createBy: '',
            showSequence: 3,
            udf1: '',
            udf2: '',
            udf3: ''
          },
          {
            activity: 'Y',
            codeClassId: 'asset_ship_fl',
            codeId: '008001',
            codeName: '集装箱',
            codeSysId: '94384759353454300',
            createBy: '',
            showSequence: 1,
            udf1: '',
            udf2: '',
            udf3: ''
          },
          {
            activity: 'Y',
            codeClassId: 'asset_ship_fl',
            codeId: '008002',
            codeName: '散货船',
            codeSysId: '94384379353454300',
            createBy: '',
            showSequence: 2,
            udf1: '',
            udf2: '',
            udf3: ''
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalCount: 15,
        totalPage: 1
      })
      break
    }
    default: {
      result = Utils.builder([])
    }
  }

  // 输出日志
  log('\n\n--- 接口参数 - 获取字典代码列表 ---------')
  log(body)

  log('\n\n--- 接口数据 - 获取字典代码列表 ---------')
  log(result)

  // 返回结果
  return result
})

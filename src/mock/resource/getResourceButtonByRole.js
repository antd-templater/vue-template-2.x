import Mock from 'mockjs2'
import Utils from '@/mock/utils'
import api from '@/api/resource'

/**
 * @descrption 模拟接口 - 根据角色查询按钮资源
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
Mock.mock(Utils.toRegex(api.getResourceButtonByRole), 'post', options => {
  // 接口参数
  const log = console.log
  const body = Utils.getBody(options)
  const param = body.param || []

  // 储存
  const data = []

  // 预处理
  for (const item of param) {
    if (item.roleId === '27442970747734159' && item.menuId === '27245863256459422') {
      data.push({
        id: '27245863256459422',
        actionsOptions: [],
        checkedAll: false,
        indeterminate: false,
        selected: []
      })
    }
    if (item.roleId === '27442970747734159' && item.menuId === '1127282136000102507') {
      data.push({
        actionsOptions: [
          { label: '新增', value: '1127282136000102508' },
          { label: '删除', value: '1127282136000102509' },
          { label: '修改', value: '1127282136000102510' },
          { label: '查询', value: '1127282136000102511' }
        ],
        id: '1127282136000102507',
        checkedAll: false,
        indeterminate: false,
        selected: [
          '1127282136000102508',
          '1127282136000102509',
          '1127282136000102510',
          '1127282136000102511'
        ]
      })
    }
    if (item.roleId === '27442970747734159' && item.menuId === '27245863256459445') {
      data.push({
        actionsOptions: [
          { label: '新增', value: '27245863256459447' },
          { label: '删除', value: '27245863256459449' }
        ],
        id: '27245863256459445',
        checkedAll: false,
        indeterminate: false,
        selected: ['27245863256459447', '27245863256459449']
      })
    }
    if (item.roleId === '27442970747734159' && item.menuId === '27245863256459495') {
      data.push({
        actionsOptions: [
          { label: '新增', value: '27245863256459496' },
          { label: '删除', value: '27245863256459497' },
          { label: '修改', value: '27245863256459498' },
          { label: '查询', value: '27245863256459499' }
        ],
        id: '27245863256459495',
        checkedAll: false,
        indeterminate: false,
        selected: [
          '27245863256459496',
          '27245863256459497',
          '27245863256459498',
          '27245863256459499'
        ]
      })
    }
    if (item.roleId === '27442970747734159' && item.menuId === '1127282136000102555') {
      data.push({
        actionsOptions: [
          { label: '新增', value: '1127282136000102563' },
          { label: '删除', value: '1127282136000102564' },
          { label: '修改', value: '1127282136000102565' },
          { label: '查询', value: '1127282136000102566' }
        ],
        id: '1127282136000102555',
        checkedAll: false,
        indeterminate: false,
        selected: [
          '1127282136000102563',
          '1127282136000102564',
          '1127282136000102565',
          '1127282136000102566'
        ]
      })
    }
    if (item.roleId === '27442970747734159' && item.menuId === '1127282136000102579') {
      data.push({
        actionsOptions: [
          { label: '新增', value: '1127282136000102580' },
          { label: '删除', value: '1127282136000102581' },
          { label: '修改', value: '1127282136000102582' },
          { label: '查询', value: '1127282136000102583' }
        ],
        id: '1127282136000102579',
        checkedAll: false,
        indeterminate: false,
        selected: [
          '1127282136000102580',
          '1127282136000102581',
          '1127282136000102582',
          '1127282136000102583'
        ]
      })
    }
    if (item.roleId === '27442970747734159' && item.menuId === '1127282136000102608') {
      data.push({
        actionsOptions: [
          { label: '新增', value: '1127282136000102609' },
          { label: '删除', value: '1127282136000102610' },
          { label: '修改', value: '1127282136000102611' },
          { label: '查询', value: '1127282136000102612' }
        ],
        id: '1127282136000102608',
        checkedAll: false,
        indeterminate: false,
        selected: [
          '1127282136000102609',
          '1127282136000102610',
          '1127282136000102611',
          '1127282136000102612'
        ]
      })
    }
  }

  // 响应数据
  const result = Utils.builder(data)

  // 输出日志
  log('\n\n--- 接口参数 - 根据角色查询按钮资源 ---------')
  log(body)

  log('\n\n--- 接口数据 - 根据角色查询按钮资源 ---------')
  log(result)

  // 返回结果
  return result
})

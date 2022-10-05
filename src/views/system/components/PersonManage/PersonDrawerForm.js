import { extender } from '@/components/BaseForm/helper'

/**
 * @description 员工管理 - 表单数据
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
export default {
  data () {
    // 基本信息
    const FORM_BASE = [
      {
        type: 'AGroup',
        slot: '',
        field: 'title1',
        title: '',
        attrs: {},
        grid: {}
      },
      {
        type: 'AInput',
        slot: 'personNum',
        field: 'personNum',
        label: '员工编码',
        decorator: {
          rules: [{ required: true, message: '请输入员工编码' }]
        },
        attrs: {
          placeholder: '请输入员工编码'
        }
      },
      {
        type: 'AInput',
        slot: 'personName',
        field: 'personName',
        label: '员工姓名',
        decorator: {
          rules: [{ required: true, message: '请输入员工姓名' }]
        },
        attrs: {
          placeholder: '请输入员工姓名'
        }
      },
      {
        type: 'AInput',
        slot: 'mobilePhone',
        field: 'mobilePhone',
        label: '手机号码',
        decorator: {
          rules: [{ required: true, message: '请输入手机号码' }]
        },
        attrs: {
          placeholder: '请输入手机号码'
        }
      },
      {
        type: 'AInput',
        slot: 'idCard',
        field: 'idCard',
        label: '身份证号',
        decorator: {
          rules: [{ required: true, message: '请输入身份证号' }]
        },
        attrs: {
          placeholder: '请输入身份证号'
        }
      },
      {
        type: 'AInput',
        slot: 'postName',
        field: 'postName',
        label: '在职职位',
        decorator: {},
        attrs: {
          placeholder: '请输入职位'
        }
      },
      {
        type: 'ATreeSelect',
        slot: 'orgId',
        field: 'orgId',
        label: '所属组织',
        decorator: {
          rules: [{ required: true, message: '请选择所属组织' }]
        },
        attrs: {
          dropdownClassName: 'text-ellipsis',
          dropdownStyle: {
            maxHeight: '300px'
          },
          allowClear: true,
          showSearch: true,
          dropdownMatchSelectWidth: true,
          treeNodeFilterProp: 'label',
          placeholder: '请选择所属组织'
        }
      },
      {
        type: 'ASelect',
        slot: 'departmentSysId',
        field: 'departmentSysId',
        label: '所属部门',
        decorator: {},
        attrs: {
          allowClear: true,
          placeholder: '请选择所属部门'
        }
      }
    ]

    // 其他信息
    const FORM_OTHER = [
      {
        type: 'AGroup',
        slot: 'title2',
        field: 'title2',
        title: '',
        attrs: {},
        grid: {}
      },
      {
        type: 'ASwitch',
        slot: 'activity',
        field: 'activity',
        label: '可用状态',
        decorator: {
          valuePropName: 'checked'
        },
        attrs: {
          checkedChildren: '开',
          unCheckedChildren: '关'
        }
      }
    ]

    // 合并处理
    const groups = [
      ...FORM_BASE,
      ...FORM_OTHER
    ]

    return {
      // 布局
      grid: {
        gutter: 8,
        xs: 24
      },

      // 属性
      attrs: {
        labelAlign: 'right'
      },

      // 监听
      watch: {
        onValuesChange (props, values) {
          // 创建更改区
          const changed = {}

          // 是否进行赋值 (一次性赋值，提升性能)
          if (Object.keys(changed).length > 0) {
            this.setFieldsValue(changed)
          }
        }
      },

      // 配置
      groups: [
        ...extender.groups(groups, (group, index, groups) => {

        })
      ],

      // 扩展
      options: {
        ...extender.options(groups, (group, index, groups) => {
          // 默认值
          const that = this
          const option = {}

          // 下拉框处理
          if (
            [
              'ASelect',
              'ATreeSelect',
              'ACascader',
              'ARadioGroup',
              'ACheckboxGroup',
              'AAutoComplete'
            ].includes(group.type)
          ) {
            Object.assign(option, {
              selectOptions: []
            })
          }

          // 所属组织
          if (group.field === 'orgId') {
            Object.assign(option, {
              handleEvents: {
                change (value) {
                  const departmentSysId = that.getFieldValue('departmentSysId')
                  const departmentSysIdArr =
                    that.options.departmentSysId.selectOptions
                  if (
                    !departmentSysIdArr.some(
                      item =>
                        departmentSysId === item.value &&
                        value === item.parentId
                    )
                  ) {
                    that.setFieldsValue({ departmentSysId: '' })
                  }
                }
              },
              selectOptions: this.queryOptions.orgTree
            })
          }

          // 所属部门
          if (group.field === 'departmentSysId') {
            Object.assign(option, {
              selectOptionsRender (options, { Utils, form }) {
                return options.filter(opt => {
                  const orgId = form.getFieldValue('orgId')
                  return orgId && opt.parentId === orgId
                })
              },
              selectOptions: this.queryOptions.departmentSysId
            })
          }

          return option
        })
      },

      // 禁用 (已从props接受)
      // disabled: false,

      // 只读 (已从props接受)
      // readonly: false,

      // 查询中
      spinning: false
    }
  }
}

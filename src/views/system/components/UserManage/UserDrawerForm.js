import { validator, extender } from '@antd-templater/library-2.x/SForm/Helper'

/**
 * @description 用户管理 - 用户表单数据
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
        type: 'ASearch',
        slot: 'userNo',
        field: 'userNo',
        label: '用户名',
        decorator: {
          rules: [{ required: true, message: '请输入用户名' }]
        },
        attrs: {
          placeholder: '请输入用户名'
        }
      },
      {
        type: 'AInputPassword',
        slot: 'password',
        field: 'password',
        label: '用户密码',
        decorator: {
          rules: [
            validator.password({
              message: '请输入用户密码',
              validator: '用户密码过短',
              pattern: /.{6,}/,
              required: true
            })
          ]
        },
        attrs: {
          placeholder: '请输入用户密码'
        }
      },
      {
        type: 'AInput',
        slot: 'userName',
        field: 'userName',
        label: '用户姓名',
        decorator: {
          rules: [{ required: true, message: '请输入用户姓名' }]
        },
        attrs: {
          placeholder: '请输入用户姓名'
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
        slot: 'deptId',
        field: 'deptId',
        label: '所属部门',
        decorator: {},
        attrs: {
          allowClear: true,
          placeholder: '请选择所属部门'
        }
      },
      {
        type: 'ASelect',
        slot: 'roleId',
        field: 'roleId',
        label: '所属角色',
        decorator: {
          rules: [{ required: true, message: '请选择所属角色' }]
        },
        attrs: {
          mode: 'multiple',
          placeholder: '请选择所属角色',
          replaceFields: { key: 'roleId', label: 'roleName', value: 'roleId' },
          allowClear: true
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
                  const deptId = that.getFieldValue('deptId')
                  const deptIdArr =
                    that.options.deptId.selectOptions
                  if (
                    !deptIdArr.some(
                      item =>
                        deptId === item.value &&
                        value === item.parentId
                    )
                  ) {
                    that.setFieldsValue({ deptId: '' })
                  }
                }
              },
              selectOptions: this.queryOptions.orgTree
            })
          }

          // 所属部门
          if (group.field === 'deptId') {
            Object.assign(option, {
              selectOptionsRender (options, { Util, form }) {
                return options.filter(opt => {
                  const orgId = form.getFieldValue('orgId')
                  return orgId && opt.parentId === orgId
                })
              },
              selectOptions: this.queryOptions.deptId
            })
          }

          // 所属角色
          if (group.field === 'roleId') {
            Object.assign(option, {
              selectOptions: this.queryOptions.roleId
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

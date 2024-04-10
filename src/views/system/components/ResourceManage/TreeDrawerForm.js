import { extender } from '@antd-templater/library-2.x/SForm/Helper'

/**
 * @description 资源管理 - 菜单表单数据
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
        slot: 'title',
        field: 'title',
        label: '菜单名称',
        decorator: {
          rules: [{ required: true, message: '请输入菜单名称' }]
        },
        attrs: {
          placeholder: '请输入菜单名称'
        }
      },
      {
        type: 'AInput',
        slot: 'resourceName',
        field: 'resourceName',
        label: '菜单标识',
        decorator: {
          rules: [{ required: true, message: '请输入菜单标识' }]
        },
        attrs: {
          placeholder: '请输入菜单标识'
        }
      },
      {
        type: 'AAutoComplete',
        slot: 'component',
        field: 'component',
        label: '组件标识',
        decorator: {
          rules: [{ required: true, message: '请输入组件名称' }]
        },
        attrs: {
          showSearch: true,
          placeholder: '请输入组件名称',
          replaceFields: { label: 'label', value: 'label' }
        }
      },
      {
        type: 'AInput',
        slot: 'redirect',
        field: 'redirect',
        label: '跳转路径',
        decorator: {},
        attrs: {
          placeholder: '请输入跳转路径'
        }
      },
      {
        type: 'AInput',
        slot: 'path',
        field: 'path',
        label: '访问路径',
        decorator: {},
        attrs: {
          placeholder: '请输入访问路径'
        }
      },
      {
        type: 'ASelect',
        slot: 'icon',
        field: 'icon',
        label: '菜单图标',
        decorator: {},
        attrs: {
          placeholder: '请输入菜单图标'
        }
      },
      {
        type: 'AInput',
        slot: 'sort',
        field: 'sort',
        label: '菜单排序',
        decorator: {
          rules: [{ required: true, message: '请输入菜单排序' }]
        },
        attrs: {
          placeholder: '请输入菜单排序'
        }
      }
    ]

    // 其他信息
    const FORM_OTHER = [
      {
        type: 'AGroup',
        slot: 'title2',
        field: 'title2',
        attrs: {},
        grid: {}
      },
      {
        type: 'ASwitch',
        slot: 'hideChildInMenu',
        field: 'hideChildInMenu',
        label: '隐藏子菜单',
        decorator: {
          valuePropName: 'checked'
        },
        attrs: {
          checkedChildren: '是',
          unCheckedChildren: '否'
        }
      },
      {
        type: 'ASwitch',
        slot: 'hideInMenu',
        field: 'hideInMenu',
        label: '隐藏菜单',
        decorator: {
          valuePropName: 'checked'
        },
        attrs: {
          checkedChildren: '是',
          unCheckedChildren: '否'
        }
      },
      {
        type: 'ASwitch',
        slot: 'allowCache',
        field: 'allowCache',
        label: '是否缓存',
        decorator: {
          valuePropName: 'checked'
        },
        attrs: {
          checkedChildren: '开',
          unCheckedChildren: '关'
        }
      },
      {
        type: 'ASwitch',
        slot: 'activity',
        field: 'activity',
        label: '是否启用',
        decorator: {
          valuePropName: 'checked'
        },
        attrs: {
          checkedChildren: '是',
          unCheckedChildren: '否'
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

          // 自动完成
          if (['AAutoComplete'].includes(group.type)) {
            Object.assign(option, {
              selectOptions: []
            })
          }

          // 组件标识
          if (group.field === 'component') {
            Object.assign(option, {
              selectOptions: [
                {
                  label: 'PageView',
                  value: 'PageView'
                },
                {
                  label: 'RouteView',
                  value: 'RouteView'
                },
                {
                  label: 'PageFrame',
                  value: 'PageFrame'
                }
              ],
              selectOptionsRender (options, { form }) {
                if (!form.getFieldValue('component')) {
                  return options
                }
                return options.filter(option => {
                  return (
                    options.some(
                      option =>
                        option.label.toLocaleLowerCase() ===
                        form.getFieldValue('component').toLocaleLowerCase()
                    ) ||
                    option.label
                      .toLocaleLowerCase()
                      .indexOf(
                        form.getFieldValue('component').toLocaleLowerCase()
                      ) !== -1
                  )
                })
              }
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

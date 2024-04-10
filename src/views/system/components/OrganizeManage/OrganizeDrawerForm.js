import { extender } from '@antd-templater/library-2.x/SForm/Helper'

/**
 * @description 组织管理 - 表单数据
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
        type: 'ATextarea',
        slot: 'title',
        field: 'title',
        label: '名称',
        decorator: {
          rules: [{ required: true, message: '请输入名称' }]
        },
        attrs: {
          rows: 1,
          autoSize: true,
          placeholder: '请输入名称'
        }
      },
      {
        type: 'AInput',
        slot: 'orgShortName',
        field: 'orgShortName',
        label: '简称',
        decorator: {
          rules: [{ required: true, message: '请输入简称' }]
        },
        attrs: {
          placeholder: '请输入简称'
        }
      },
      {
        type: 'ASelect',
        slot: 'isOrg',
        field: 'isOrg',
        label: '形态',
        decorator: {
          rules: [{ required: true, message: '请选择形态' }]
        },
        attrs: {
          placeholder: '请选择组织形态'
        }
      },
      {
        type: 'ATreeSelect',
        slot: 'parentOrgId',
        field: 'parentOrgId',
        label: '上级',
        decorator: {},
        attrs: {
          dropdownClassName: 'text-ellipsis',
          dropdownStyle: {
            maxHeight: '300px'
          },
          allowClear: true,
          showSearch: true,
          dropdownMatchSelectWidth: true,
          treeNodeFilterProp: 'label',
          placeholder: '请选择上级'
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
        label: '状态',
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

          // 形态
          if (values.isOrg === 'N') {
            Object.assign(changed, {
              orgShortName: ''
            })
          }

          // 上级
          if (values.parentOrgId === '0') {
            Object.assign(changed, {
              parentOrgId: ''
            })
          }

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

          // 简称
          if (group.field === 'orgShortName') {
            Object.assign(option, {
              handleRender (item, { Util, form }) {
                return form.getFieldValue('isOrg') !== 'N'
              }
            })
          }

          // 形态
          if (group.field === 'isOrg') {
            Object.assign(option, {
              handleAttrs () {
                return {
                  disabled: that.action !== 'insert'
                }
              },
              selectOptions: this.queryOptions.isOrg
            })
          }

          // 上级
          if (group.field === 'parentOrgId') {
            Object.assign(option, {
              selectOptionsRender (options, { Util, form }) {
                return options.filter(opt => {
                  if (that.action !== 'insert') {
                    const key = that.record.key
                    return !key || opt.value !== key
                  }
                  return true
                })
              },
              selectOptions: this.queryOptions.orgTree
            })
          }

          // 状态
          if (group.field === 'activity') {
            Object.assign(option, {
              handleAttrs (item, { form }) {
                return {
                  disabled: that.rootNodes.some(
                    node => node.value === that.record.key
                  )
                }
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

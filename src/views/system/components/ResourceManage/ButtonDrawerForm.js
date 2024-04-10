import { extender } from '@antd-templater/library-2.x/SForm/Helper'

/**
 * @description 资源管理 - 按钮表单数据
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
        type: 'AAutoComplete',
        slot: 'title',
        field: 'title',
        label: '按钮名称',
        decorator: {
          rules: [{ required: true, message: '请输入按钮名称' }]
        },
        attrs: {
          placeholder: '请输入按钮名称',
          replaceFields: { label: 'label', value: 'label' }
        }
      },
      {
        type: 'AInput',
        slot: 'resourceName',
        field: 'resourceName',
        label: '按钮标识',
        decorator: {
          rules: [{ required: true, message: '请输入按钮标识' }]
        },
        attrs: {
          placeholder: '请输入按钮标识'
        }
      },
      {
        type: 'AInput',
        slot: 'sort',
        field: 'sort',
        label: '按钮排序',
        decorator: {
          rules: [{ required: true, message: '请输入按钮排序' }]
        },
        attrs: {
          placeholder: '请输入按钮排序'
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
        label: '按钮状态',
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

          // 按钮名称
          if (group.field === 'title') {
            Object.assign(option, {
              selectOptions: this.queryOptions.buttons,
              selectOptionsRender (options, { form }) {
                if (!form.getFieldValue('title')) {
                  return options
                }
                return options.filter(option => {
                  return (
                    options.some(
                      option =>
                        option.label.toLocaleLowerCase() ===
                        form.getFieldValue('title').toLocaleLowerCase()
                    ) ||
                    option.label
                      .toLocaleLowerCase()
                      .indexOf(
                        form.getFieldValue('title').toLocaleLowerCase()
                      ) !== -1
                  )
                })
              },
              handleEvents: {
                select (value) {
                  const resourceOptions = that.options.title.selectOptions
                  const resource = resourceOptions.find(
                    option => option.label === value
                  )
                  that.setFieldsValue({
                    resourceName: (resource && resource.value) || '',
                    sort: (resource && resource.sort) || ''
                  })
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

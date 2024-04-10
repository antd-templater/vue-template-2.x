import { extender } from '@antd-templater/library-2.x/SForm/Helper'

/**
 * @description 资源管理 - 服务表单数据
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
        label: '服务名称',
        decorator: {
          rules: [{ required: true, message: '请输入服务名称' }]
        },
        attrs: {
          placeholder: '请输入服务名称'
        }
      },
      {
        type: 'AInput',
        slot: 'resourceName',
        field: 'resourceName',
        label: '服务标识',
        decorator: {
          rules: [{ required: true, message: '请输入服务标识' }]
        },
        attrs: {
          placeholder: '请输入服务标识'
        }
      },
      {
        type: 'AInput',
        slot: 'sort',
        field: 'sort',
        label: '服务排序',
        decorator: {
          rules: [{ required: true, message: '请输入服务排序' }]
        },
        attrs: {
          placeholder: '请输入服务排序'
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

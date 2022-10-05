<script>
import AFormItem from 'ant-design-vue/es/form/FormItem'
import ASelect from 'ant-design-vue/es/select'

import Utils from '../utils'

export default {
  name: 'BaseSelect',
  inheritAttrs: false,
  methods: {
    /**
     * @description 绑定作用域
     * @param {Object} obj
     * @returns {Object}
     */
    handleScope (obj) {
      const scope = { ...obj }
      const names = Object.keys(obj)
      for (const name of names) {
        if (Utils.isFunction(scope[name])) {
          scope[name] = scope[name].bind(this)
        }
      }
      return scope
    },

    /**
     * @description 过滤选项组
     * @param {Array} opts
     * @returns {Array}
     */
    optionsRender (opts) {
      const col = this.$attrs.col
      const row = this.$attrs.row
      const form = this.$attrs.form
      const group = this.$attrs.group
      const option = this.$attrs.option
      const extender = this.$attrs.extender
      const children = []

      if (Utils.isArray(opts)) {
        children.push(...opts)
      }

      if (Utils.isNotEmptyArray(opts)) {
        if (Utils.isObject(extender)) {
          if (Utils.isFunction(extender.selectOptionsRender)) {
            const result = extender.selectOptionsRender(children, {
              option,
              col,
              row,
              group,
              form,
              Utils
            })
            return Utils.isArray(result) ? result : children
          }
        }
      }

      return children
    },

    /**
     * @description 选项禁用与否
     * @param {Object} opt
     * @returns {Boolean}
     */
    optionDisabled (opt) {
      const col = this.$attrs.col
      const row = this.$attrs.row
      const form = this.$attrs.form
      const group = this.$attrs.group
      const extender = this.$attrs.extender
      const children = []

      if (Utils.isObject(opt)) {
        if (Utils.isArray(opt.children)) {
          children.push(...opt.children)
        }
      }

      if (Utils.isObject(extender)) {
        if (Utils.isFunction(extender.selectOptionItemDisabled)) {
          const result = extender.selectOptionItemDisabled(opt, {
            children: children,
            col,
            row,
            group,
            form,
            Utils
          })
          return Utils.isBoolean(result) ? result : opt.disabled === true
        }
      }

      return opt.disabled === true
    },

    /**
     * @description 选项渲染与否
     * @param {Object} opt
     * @returns {Boolean}
     */
    optionRender (opt) {
      const col = this.$attrs.col
      const row = this.$attrs.row
      const form = this.$attrs.form
      const group = this.$attrs.group
      const extender = this.$attrs.extender
      const children = []

      if (Utils.isObject(opt)) {
        if (Utils.isArray(opt.children)) {
          children.push(...opt.children)
        }
      }

      if (Utils.isObject(extender)) {
        if (Utils.isFunction(extender.selectOptionItemRender)) {
          const result = extender.selectOptionItemRender(opt, {
            children: children,
            col,
            row,
            group,
            form,
            Utils
          })
          return Utils.isBoolean(result) ? result : opt.render !== false
        }
      }

      return opt.render !== false
    },

    /**
     * @description 选项显示与否
     * @param {Object} opt
     * @returns {Boolean}
     */
    optionShow (opt) {
      const col = this.$attrs.col
      const row = this.$attrs.row
      const form = this.$attrs.form
      const group = this.$attrs.group
      const extender = this.$attrs.extender
      const children = []

      if (Utils.isObject(opt)) {
        if (Utils.isArray(opt.children)) {
          children.push(...opt.children)
        }
      }

      if (Utils.isObject(extender)) {
        if (Utils.isFunction(extender.selectOptionItemShow)) {
          const result = extender.selectOptionItemShow(opt, {
            children: children,
            col,
            row,
            group,
            form,
            Utils
          })
          return Utils.isBoolean(result) ? result : opt.show !== false
        }
      }

      return opt.show !== false
    }
  },
  render () {
    const label = this.$attrs.label
    const field = this.$attrs.field
    const binds = this.$attrs.binds
    const events = this.$attrs.events
    const decorator = this.$attrs.decorator
    const classAttrs = this.$attrs.binds.class
    const styleAttrs = this.$attrs.binds.style
    const optionAttrs = this.$attrs.binds.options
    const selectOptions = this.$attrs.extender.selectOptions
    const optionsNodes = optionAttrs || selectOptions || []

    const replaceFields = Object.assign(
      {
        key: 'value',
        label: 'label',
        value: 'value',
        children: 'children'
      },
      binds.replaceFields
    )

    const handleScope = this.handleScope
    const optionsRender = this.optionsRender
    const optionDisabled = this.optionDisabled
    const optionRender = this.optionRender
    const optionShow = this.optionShow

    const createOptions = nodes =>
      optionsRender(nodes)
        .filter(node => optionRender(node))
        .map(node => (
          <ASelect.Option
            style={{ display: optionShow(node) ? undefined : 'none' }}
            disabled={optionDisabled(node)}
            key={node[replaceFields.key]}
            value={node[replaceFields.value]}
            label={node[replaceFields.label]}
            title={node[replaceFields.label]}
          >
            {node[replaceFields.label]}
          </ASelect.Option>
        ))

    return (
      <AFormItem label={label}>
        <ASelect
          ref="component"
          v-decorator={[field, decorator]}
          attrs={handleScope(binds)}
          on={handleScope(events)}
          class={classAttrs}
          style={styleAttrs}
        >
          {createOptions(optionsNodes)}
        </ASelect>
      </AFormItem>
    )
  }
}
</script>

<style lang="less">
[disabled] {
  .ant-select {
    .ant-select-selection--multiple .ant-select-search--inline,
    .ant-select-selection--multiple .ant-select-search--inline {
      display: none;
    }
  }
}
[off-disabled] {
  .ant-select[disabled],
  .ant-select-disabled {
    .ant-select-selection {
      color: rgba(0, 0, 0, 0.65);
      background-color: #ffffff;
      cursor: default;
      opacity: 1;
    }
    .ant-select-selection--multiple .ant-select-selection__choice {
      padding-right: 20px;
      color: rgba(0, 0, 0, 0.65);
      background-color: #fafafa;
    }
  }
}
</style>

<script>
import AFormItem from 'ant-design-vue/es/form/FormItem'
import ASwitch from 'ant-design-vue/es/switch'

import Utils from '../utils'

export default {
  name: 'BaseSwitch',
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
    }
  },
  render () {
    const label = this.$attrs.label
    const field = this.$attrs.field
    const binds = this.$attrs.binds
    const events = this.$attrs.events
    const decorator = this.$attrs.decorator
    const handleScope = this.handleScope
    const classAttrs = this.$attrs.binds.class
    const styleAttrs = this.$attrs.binds.style

    return (
      <AFormItem label={label}>
        <ASwitch
          ref="component"
          v-decorator={[field, decorator]}
          attrs={handleScope(binds)}
          on={handleScope(events)}
          class={classAttrs}
          style={styleAttrs}
        />
      </AFormItem>
    )
  }
}
</script>

<style lang="less">
[off-disabled] {
  .ant-switch[disabled],
  .ant-switch-disabled {
    &,
    & *,
    &::before,
    &::after {
      cursor: default;
      opacity: 1;
    }
  }
}
</style>

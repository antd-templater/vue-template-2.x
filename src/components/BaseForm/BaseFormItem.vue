<template>
  <component
    :is="$name"
    v-bind="$props"
  />
</template>

<script>
import Library from './library'

export default {
  name: 'BaseFormItem',
  components: {
    ...Library
  },
  props: {
    // 扩展选项
    extender: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 分组配置
    group: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 行配置
    row: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 列配置
    col: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 组件信息
    item: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 表单信息
    form: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 表单类型
    type: {
      type: String,
      default: ''
    },
    // 组件字段
    field: {
      type: String,
      default: ''
    },
    // 组件文本描述
    label: {
      type: String,
      default: ''
    },
    // 绑定属性
    binds: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 绑定事件
    events: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 修饰配置
    decorator: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    $name () {
      return this.item.type.replace(/^A(.+)/, 'Base$1')
    }
  }
}
</script>

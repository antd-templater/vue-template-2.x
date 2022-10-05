<script>
import Tooltip from 'ant-design-vue/es/tooltip'

export default {
  name: 'BaseEllipsis',
  components: {
    Tooltip
  },
  props: {
    // 显示提示框
    tooltip: {
      type: Boolean,
      default: false
    },
    // 显示方式
    placement: {
      type: String,
      default: 'topLeft'
    },
    // 是否截取
    sheared: {
      type: Boolean,
      default: true
    },
    // 截取字节数长度
    length: {
      type: Number,
      default: 0
    }
  },
  methods: {
    /**
     * @description 获取文本字节数
     * @param {String} string?
     * @returns {Number}
     */
    getFullLength (string = '') {
      return string.split('').reduce((pre, cur) => {
        const charCode = cur.charCodeAt(0)
        const isSingleChar = charCode >= 0 && charCode <= 128
        return isSingleChar ? pre + 1 : pre + 2
      }, 0)
    },

    /**
     * @description 根据字节数获取文本
     * @param {String} string?
     * @param {Number} max?
     * @returns {String}
     */
    cutFullLength (string = '', max = Infinity) {
      let len = 0
      return string.split('').reduce((pre, cur) => {
        const charCode = cur.charCodeAt(0)
        const isSingleChar = charCode >= 0 && charCode <= 128

        isSingleChar ? (len += 1) : (len += 2)

        return len <= max ? pre + cur : pre
      }, '')
    },

    /**
     * @description 渲染截取文本组件
     * @param {String} string
     * @param {Number} length
     * @returns {SpanElement}
     */
    renderTextNode (string, length) {
      if (this.length > 0 && this.sheared) {
        const content = this.cutFullLength(string, this.length)
        const expand = length > this.length ? '...' : ''
        return <span>{content + expand}</span>
      }
      return <span>{string}</span>
    },

    /**
     * @description 渲染提示框组件
     * @param {String} string
     * @param {Number} length
     * @returns {Tooltip}
     */
    renderTooltip (string, length) {
      return (
        <Tooltip placement={this.placement}>
          <template slot="title">{string}</template>
          {this.renderTextNode(string, length)}
        </Tooltip>
      )
    }
  },
  render () {
    const strings = this.$slots.default.map(vNode => vNode.text).join('')
    const fullLength = this.getFullLength(strings)
    const tooltip = this.$props.tooltip
    const length = this.$props.length

    return tooltip && fullLength > length
      ? this.renderTooltip(strings, fullLength)
      : this.renderTextNode(strings, fullLength)
  }
}
</script>

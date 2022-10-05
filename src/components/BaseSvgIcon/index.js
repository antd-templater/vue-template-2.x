import { SVG_ICON_TYPES } from '@/store/variable'

/**
 * @description 储存 SVG 图标类型
 * @author lin pengteng
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
const svgs = {}
const context = require.context('./libs', false, /^.+\.svg$/i)
for (const item of context.keys()) {
  const regex = /^(?:\.\/)?(.+)\.svg$/i
  const key = item.replace(regex, '$1')
  if (!SVG_ICON_TYPES.includes(key)) {
    SVG_ICON_TYPES.push(key)
  }
  svgs[key] = context(item).default
}

/**
 * @description SVG 图标组件
 * @author lin pengteng
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
export default {
  name: 'BaseSvgIcon',
  inheritAttrs: false,
  render () {
    const props = this.$attrs
    const types = this.$attrs.type
    return <a-icon {...{ props }} component={svgs[types]} />
  }
}

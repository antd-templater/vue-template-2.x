import { message } from 'ant-design-vue/es'
import themeColor from './themeColor.js'

/**
 * @description 主题风格库
 */
const colors = [
  {
    key: '极客蓝',
    color: '#4557FF'
  },
  {
    key: '拂晓蓝',
    color: '#1890FF'
  },
  {
    key: '薄暮',
    color: '#F5222D'
  },
  {
    key: '火山',
    color: '#FA541C'
  },
  {
    key: '日暮',
    color: '#FAAD14'
  },
  {
    key: '明青',
    color: '#13C2C2'
  },
  {
    key: '极光绿',
    color: '#52C41A'
  },
  {
    key: '酱紫',
    color: '#722ED1'
  }
]

/**
 * @description 切换主题风格
 *
 * @param {String} newPrimaryColor
 * @return {undefined}
 */
const updateColorTheme = newPrimaryColor => {
  const hideMessage = message.loading('正在切换主题!', 0)
  themeColor.changeColor(newPrimaryColor).finally(t => {
    setTimeout(() => hideMessage(), 0)
  })
}

/**
 * @description 切换色弱模式
 *
 * @param {String} colorWeak
 * @return {undefined}
 */
const updateColorWeak = colorWeak => {
  colorWeak
    ? document.body.classList.add('colorWeak')
    : document.body.classList.remove('colorWeak')
}

export { colors, updateColorTheme, updateColorWeak }

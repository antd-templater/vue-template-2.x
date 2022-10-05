import client from 'webpack-theme-color-replacer/client'
import generate from '@ant-design/colors/lib/generate'

/**
 * @description 主题风格
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
export default {
  /**
   * @description 生成系列色系
   * @param {String} color
   * @return {undefined}
   */
  getAntdSerials (color) {
    const lightens = new Array(9).fill().map((t, i) => {
      return client.varyColor.lighten(color, i / 10)
    })
    const colorPalettes = generate(color)
    const rgb = client.varyColor.toNum3(color.replace('#', '')).join(',')
    return lightens.concat(colorPalettes).concat(rgb)
  },

  /**
   * @description 更改样式路径
   * @param {String} newColor
   * @return {undefined}
   */
  changeColor (newColor) {
    return client.changer.changeColor(
      {
        changeUrl (cssUrl) {
          return `/${cssUrl}`
        },
        newColors: this.getAntdSerials(newColor)
      },
      Promise
    )
  }
}

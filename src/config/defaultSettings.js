/**
 * @description 默认配置
 *
 * @attribute title - 标题
 * @attribute colorWeak - 色盲模式
 * @attribute primaryColor - 默认主题色
 * @attribute navTheme - 侧边栏主题色
 * @attribute layout - 整体布局方式
 * @attribute multiTab - 多标签页
 * @attribute keepAlive - 多标签缓存
 * @attribute autoHideHeader - 隐藏 Header
 * @attribute fixedHeader - 固定 Header
 * @attribute fixedSidebar - 固定左侧菜单栏
 * @attribute contentWidth - 内容区布局
 * @attribute storageOptions: 插件配置项
 */
export default {
  title: 'Antd Template',
  colorWeak: false,
  primaryColor: '#1890FF',
  navTheme: 'light',
  layout: 'sidemenu',
  multiTab: true,
  keepAlive: true,
  autoHideHeader: false,
  fixedHeader: true,
  fixedSidebar: true,
  contentWidth: 'Fluid',
  storageOptions: {
    name: 'ls',
    storage: 'local',
    namespace: '__'
  }
}

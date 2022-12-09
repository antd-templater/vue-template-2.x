import Vue from 'vue'
import Antd, { message, notification, Modal } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

/**
 * @description 组件库一次性加载
 */
Vue.use(Antd)

/**
 * @description 注入Vue实例
 */
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$success = Modal.success
Vue.prototype.$warning = Modal.warning
Vue.prototype.$error = Modal.error
Vue.prototype.$info = Modal.info

import Vue from 'vue'
import Antd, { message, notification, Modal } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

/**
 * @description 组件库一次性加载
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
Vue.use(Antd)

/**
 * @description 注入Vue实例
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$success = Modal.success
Vue.prototype.$warning = Modal.warning
Vue.prototype.$error = Modal.error
Vue.prototype.$info = Modal.info

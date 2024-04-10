import 'core-js/stable'
import 'regenerator-runtime/runtime'
import '@antd-templater/library-2.x'

import bootstrap from './core'
import router from './router'
import store from './store'
import App from './App.vue'
import Vue from 'vue'

import './main.less'
import './permission'
import './mock/index'

// 实例化
new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')

// 消除生产消息
Vue.config.productionTip = false

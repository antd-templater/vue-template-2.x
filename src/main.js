import 'core-js/stable'
import 'regenerator-runtime/runtime'

import bootstrap from './core'
import router from './router'
import store from './store'
import App from './App.vue'
import Vue from 'vue'

import './main.less'
import './permission'
import './register.component'

import './mock/index'

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')

// 消除启动相关消息
Vue.config.productionTip = false

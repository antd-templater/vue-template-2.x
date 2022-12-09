import Vue from 'vue'
import VueStorage from 'vue-ls'
import defaultSettings from '@/config/defaultSettings'

/**
 * @description storage 配置
 */
Vue.use(VueStorage, defaultSettings.storageOptions)

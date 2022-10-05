<template>
  <pro-layout
    v-bind="settings"
    :menus="mainMenu"
    :isMobile="isMobile"
    :siderWidth="siderWidth"
    :mediaQuery="mediaQuery"
    :collapsed="sideCollapsed"
    :collapsedButtonRender="collapsedButtonRender"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
  >
    <template #menuHeaderRender>
      <layout-logo/>
    </template>

    <template #headerContentRender>
      <h1
        style="display: flex; padding: 0; margin: 0; font-size: 28px; color: var(--primary-color)"
      >
        <a-icon
          style="padding: 0 15px; font-size: 24px; display: block"
          :type="!sideCollapsed ? 'menu-fold' : 'menu-unfold'"
          @click="toggleSidebarType(!sideCollapsed)"
        />
      </h1>
    </template>

    <template #rightContentRender>
      <layout-avatar/>
    </template>

    <template #footerRender/>

    <layout-setting-drawer v-if="isPreview"/>

    <layout-multi-tab v-if="multiTab"/>
    <layout-breadcrumb v-if="!multiTab"/>

    <div class="page-router-view-container">
      <transition name="router-fade">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
    </div>
  </pro-layout>
</template>

<script>
import mixinApp from '@/mixins/mixinApp'
import mixinRouter from '@/mixins/mixinRouter'
import ProLayout from '@ant-design-vue/pro-layout'
import LayoutSettingDrawer from '@/layouts/components/BasicLayout/LayoutSettingDrawer'
import LayoutBreadcrumb from '@/layouts/components/BasicLayout/LayoutBreadcrumb'
import LayoutMultiTab from '@/layouts/components/BasicLayout/LayoutMultiTab'
import LayoutAvatar from '@/layouts/components/BasicLayout/LayoutAvatar'
import LayoutLogo from '@/layouts/components/BasicLayout/LayoutLogo'

export default {
  name: 'BasicLayout',
  mixins: [mixinApp, mixinRouter],
  components: {
    ProLayout,
    LayoutSettingDrawer,
    LayoutBreadcrumb,
    LayoutMultiTab,
    LayoutAvatar,
    LayoutLogo
  },
  data () {
    return {
      mediaQuery: {},
      collapsedButtonRender: false,
      isPreview: process.env.VUE_APP_PREVIEW === 'true'
    }
  },
  computed: {
    /**
     * @description 个性化配置
     * @returns {Object}
     */
    settings () {
      return {
        colorWeak: this.colorWeak,
        primaryColor: this.primaryColor,
        title: this.title,
        theme: this.navTheme,
        navTheme: this.navTheme,
        layout: this.layoutMode,
        layoutMode: this.layoutMode,
        multiTab: this.multiTab,
        keepAlive: this.keepAlive,
        fixedHeader: this.fixedHeader,
        fixedSidebar: this.fixedSidebar,
        fixSiderbar: this.fixedSidebar,
        contentWidth: this.contentWidth,
        sideCollapsed: this.sideCollapsed,
        isMobile: this.isMobile,
        isSideMenu: this.isSideMenu,
        isTopMenu: this.isTopMenu
      }
    },

    /**
     * @description 获取左侧菜单
     * @returns {Array}
     */
    mainMenu () {
      if (this.addRouters.some(item => item.path === '/')) {
        return this.addRouters.find(item => item.path === '/').children || []
      }
      return []
    },

    /**
     * @description 获取左侧菜单宽度
     * @returns {Number}
     */
    siderWidth () {
      const html = document.documentElement
      const style = window.getComputedStyle(html)
      const maxWidth = style.getPropertyValue('--layout-sider-max-width')
      const minWidth = style.getPropertyValue('--layout-sider-min-width')
      if (
        this.mediaQuery['screen-xs'] ||
        this.mediaQuery['screen-sm'] ||
        this.mediaQuery['screen-md']
      ) {
        return parseInt(minWidth)
      }
      return parseInt(maxWidth)
    }
  },
  methods: {
    /**
     * @description 获取左侧菜单宽度
     * @param {Object} mediaQuery
     * @returns {Number}
     */
    handleMediaQuery (mediaQuery) {
      if (
        mediaQuery['screen-xs'] ||
        mediaQuery['screen-sm'] ||
        mediaQuery['screen-md'] ||
        mediaQuery['screen-lg']
      ) {
        this.toggleSidebarType(true)
      }
      if (mediaQuery['screen-xxl']) {
        this.toggleSidebarType(false)
      }
      if (this.isMobile && !mediaQuery['screen-xs']) {
        this.toggleMobileType(false)
      }
      if (!this.isMobile && mediaQuery['screen-xs']) {
        this.toggleContentWidth('Fluid')
        this.toggleSidebarType(false)
        this.toggleMobileType(true)
      }
      for (const mark in mediaQuery) {
        if (mediaQuery[mark]) {
          this.toggleMedia(mark)
        }
      }
      this.mediaQuery = mediaQuery
    },

    /**
     * @description 获取左侧菜单宽度
     * @param {String} mode
     * @returns {undefined}
     */
    handleCollapse (mode) {
      this.toggleSidebarType(mode)
    }
  }
}
</script>

<style lang="less">
@import './BasicLayout.less';
</style>

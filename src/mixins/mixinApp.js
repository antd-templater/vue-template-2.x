import { mapGetters, mapActions } from 'vuex'

/**
 * @description 系统应用
 */
export default {
  computed: {
    ...mapGetters([
      'colorWeak',
      'primaryColor',
      'domTitle',
      'mediaMark',
      'navTheme',
      'layoutMode',
      'multiTab',
      'keepAlive',
      'autoHideHeader',
      'fixedHeader',
      'fixedSidebar',
      'contentWidth',
      'sideCollapsed',
      'isSideMenu',
      'isTopMenu',
      'isMobile'
    ])
  },
  methods: {
    ...mapActions([
      'toggleWeak',
      'toggleColor',
      'toggleTitle',
      'toggleMedia',
      'toggleTheme',
      'toggleLayout',
      'toggleMultiTab',
      'toggleKeepAlive',
      'toggleHideHeader',
      'toggleFixedHeader',
      'toggleFixedSidebar',
      'toggleContentWidth',
      'toggleSidebarType',
      'toggleMobileType'
    ])
  }
}

<template>
  <div class="layout-logo-container">
    <div
      v-if="!sideCollapsed || isTopMenu"
      class="layout-logo-content"
    >
      <img
        :src="logoSrc"
        style="width: 100%; height: 100%; display: block"
      >
    </div>
    <div
      v-if="sideCollapsed && isSideMenu"
      class="layout-logo-content"
    >
      <img
        :src="logoShrinkSrc"
        style="width: auto; height: 100%; display: block"
      >
    </div>
  </div>
</template>

<script>
import mixinApp from '@/mixins/mixinApp'

export default {
  name: 'LayoutLogo',
  mixins: [mixinApp],
  computed: {
    /**
     * @description 左侧栏展开时 logo
     * @returns {Image}
     */
    logoSrc () {
      if (this.navTheme === 'light') {
        return require('@/assets/logo/logo_light.png')
      }
      return require('@/assets/logo/logo_dark.png')
    },

    /**
     * @description 左侧栏收缩时 logo
     * @returns {Image}
     */
    logoShrinkSrc () {
      if (this.navTheme === 'light') {
        return require('@/assets/logo/logo_shrink_light.png')
      }
      return require('@/assets/logo/logo_shrink_dark.png')
    }
  }
}
</script>

<style lang="less" scoped>
.layout-logo-container {
  width: 100%;
  height: 100%;
  .layout-logo-content {
    width: 100%;
    height: 100%;
    text-align: center;
    margin: 0 auto;
    overflow: hidden;
    img {
      margin: 0 auto;
    }
    svg {
      margin-left: 8px;
    }
    h1 {
      font-size: 20px;
      margin-left: 6px;
    }
  }
}
</style>

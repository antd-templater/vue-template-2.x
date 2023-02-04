<template>
  <section class="page-view-container">
    <keep-alive
      v-if="isKeepAlive"
      :include="cachedTags"
    >
      <router-view :key="key"/>
    </keep-alive>
    <router-view v-else/>
  </section>
</template>

<script>
import mixinApp from '@/mixins/mixinApp'
import mixinTags from '@/mixins/mixinTags'
import mixinExternal from '@/mixins/mixinExternal'

export default {
  name: 'PageView',
  mixins: [mixinApp, mixinTags, mixinExternal],
  computed: {
    /**
     * @description 启用缓存
     * @returns {Boolean}
     */
    isKeepAlive () {
      const multiTab = this.multiTab
      const keepAlive = this.keepAlive
      const isEnvProd = process.env.NODE_ENV === 'production' // Issues: https://github.com/vuejs/vue-cli/issues/5008
      return multiTab && keepAlive && isEnvProd
    },
    /**
     * @description 路由标识
     * @returns {String}
     */
    key () {
      const route = this.$route
      const meta = route.meta || {}
      const match = meta.match || 'path'
      const isExternal = match === 'external'
      const external = this.getExternal(route)
      return !isExternal ? route.fullPath : external
    }
  }
}
</script>

<style lang="less" scoped>
.page-view-container {
  flex: 1 0 auto;
  flex-flow: column nowrap;
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>

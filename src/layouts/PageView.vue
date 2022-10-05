<template>
  <section class="page-view-container">
    <keep-alive
      v-if="multiTab && keepAlive"
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
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>

<template>
  <section class="user-layout-wrapper">
    <div class="container">
      <router-view/>
    </div>
  </section>
</template>

<script>
import mixinApp from '@/mixins/mixinApp'

export default {
  name: 'UserLayout',
  mixins: [mixinApp]
}
</script>

<style lang="less" scoped>
section.user-layout-wrapper {
  width: 100%;
  height: 100%;

  .container {
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;
  }
}
</style>

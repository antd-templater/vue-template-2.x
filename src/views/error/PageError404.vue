<template>
  <a-result
    :title="title"
    :status="status"
    :sub-title="subTitle"
  >
    <template #extra>
      <a-button
        type="primary"
        @click="toHome"
      >返回首页</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'PageError404',
  data () {
    return {
      title: '404',
      status: '404',
      subTitle: '抱歉，您访问的页面不存在!'
    }
  },
  methods: {
    /**
     * @description 前往首页
     * @returns {undefined}
     */
    toHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

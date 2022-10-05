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
  name: 'PageError500',
  data () {
    return {
      title: '500',
      status: '500',
      subTitle: '抱歉，服务器反馈异常!'
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

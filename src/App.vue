<template>
  <a-config-provider :locale="locale">
    <div
      id="app"
      :class="mediaMark"
    >
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import mixinApp from '@/mixins/mixinApp'

export default {
  mixins: [mixinApp],
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>

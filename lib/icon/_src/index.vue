<template>
  <i :class="['bee-icon', fontFamily,
    fontFamily === 'beefont' ? 'bee-' + icon : icon,
    {
      'pointer': hasListeners
    }
  ]" v-on=$listeners>
    <slot></slot>
  </i>
</template>

<script>
export default {
  name: 'BeeIcon',
  props: {
    icon: String,
    fontFamily: {
      type: String,
      default: 'beefont'
    }
  },
  computed: {
    hasListeners () {
      return Object.keys(this.$listeners || {}).length !== 0
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

<template>
  <i :class='["icon--wp", fontFamily,
    fontFamily === "bee--font" ? "bee-" + icon : icon
  ]' @click='handleClick'></i>
</template>

<script>
export default {
  name: 'BeeIcon',
  props: {
    icon: String,
    fontFamily: {
      type: String,
      default: 'bee--font'
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang="less">
@import './assets/iconfont.css';
</style>

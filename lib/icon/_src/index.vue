<template>
  <i :class='["icon--wp icon", "icon-" + icon]' @click='handleClick'></i>
</template>

<script>
export default {
  name: 'BeeIcon',
  props: {
    icon: String
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

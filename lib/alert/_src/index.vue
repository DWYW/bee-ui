<template>
  <bee-dialog v-model='open'
    :class="['bee-dialog__alert', {
      'bee-dialog__center': center
    }]"
    width='400px'
    :title="title"
    :close-visible='closeVisible'
    :cancel-visible='cancelVisible'
    :cancel-text='cancelText'
    :confirm-visible='confirmVisible'
    :confirm-text='confirmText'
    v-on='listeners'
  >
    <section class="alert-content" v-if='html' v-html='html'></section>
    <section class="alert-content" v-else>{{message}}</section>
  </bee-dialog>
</template>

<script>
export default {
  data () {
    return {
      open: false,
      title: undefined,
      message: undefined,
      html: undefined,
      center: false,
      closeVisible: true,
      cancelVisible: true,
      cancelText: undefined,
      confirmVisible: true,
      confirmText: undefined
    }
  },
  mounted () {
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    if (this._vnode.elm.parentNode) {
      this._vnode.elm.parentNode.removeChild(this._vnode.elm)
    }
  },
  methods: {
    afterLeave () {
      this.$destroy()
    },

    show () {
      this.open = true
      return this
    },

    hide () {
      this.open = false
      return this
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

<template>
  <bee-popper :class="['bee-tooltip-content', {
    'bee-tooltip-content__dark': theme === 'dark',
    'bee-tooltip-content__light': theme === 'light'
  }]"
    :scroll-parent="scrollParent"
    :reference="reference"
    :position='position'
    v-model='open'
    @afterLeave='afterLeave'
  >
    <section class="bee-tooltip-content--body">{{content}}</section>
  </bee-popper>
</template>

<script>
export default {
  name: 'TooltipContent',
  data () {
    return {
      open: false,
      theme: null,
      content: null,
      position: null,
      scrollParent: null,
      reference: null
    }
  },
  mounted () {
    document.body.appendChild(this.$el)

    this.open = true
  },
  beforeDestroy () {
    if (this._vnode.elm.parentNode) {
      this._vnode.elm.parentNode.removeChild(this._vnode.elm)
    }
  },
  methods: {
    afterLeave () {
      this.$destroy()
    }
  }
}
</script>

<style lang="less">
  @import './content.less';
</style>

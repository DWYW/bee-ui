<template>
  <span class="bee-tool-tip--wp" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <slot>
      <bee-icon icon='info'></bee-icon>
    </slot>
  </span>
</template>

<script>
export default {
  name: 'BeeToolTip',
  props: {
    content: {
      type: String,
      required: true
    },
    position: {
      type: String,
      validator: function (value) {
        return /^(top|bottom|right|left)(-(start|end))?$/.test(value)
      },
      default: 'top'
    },
    type: String,
    scrollDom: {
      default: () => document
    }
  },
  data () {
    return {
      tip: null
    }
  },
  methods: {
    mouseEnter () {
      this.tip = this.$_createTip({
        target: this.$el,
        content: this.content,
        position: this.position,
        scrollDom: this.scrollDom
      }).show()
    },

    mouseLeave () {
      this.tip.hide()
      this.tip = null
    }
  }
}
</script>

<style lang="less">
@import '../../theme.less';
@root: bee-tool-tip;

.@{root}--wp {
  font-size: 18px;
  display: inline-block;
}
</style>

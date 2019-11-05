<template>
  <button :class="['bee-button', 'bee-button__' + theme, 'bee-button__' + size, {
    'bee-button__animation': animation
  }]" :disabled=disabled v-on='listeners'>
    <span v-if=animation class="bee-button--animation" ref=animation></span>
    <span class="bee-button--content">
      <bee-icon class="bee-button--icon"
        v-bind='iconConfig'
        v-if='iconConfig'
      ></bee-icon>

      <slot></slot>
    </span>
  </button>
</template>

<script>
import helpers from '../../utils/helpers'

export default {
  name: 'BeeButton',
  props: {
    animation: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: [String, Object],
    theme: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'md'
    }
  },
  computed: {
    listeners () {
      return Object.assign({}, this.$listeners, {
        click: this.clickEvent
      })
    },

    iconConfig () {
      if (helpers.typeof(this.icon) === 'string') {
        return {
          icon: this.icon
        }
      }

      if (helpers.typeof(this.icon) === 'object') {
        return this.icon
      }

      return null
    }
  },
  methods: {
    clickEvent (event) {
      this.$listeners.click && this.$listeners.click(event)
      this.animation && this.addAnimation(event)
    },

    addAnimation (event) {
      const { left, top, width } = this.$el.getBoundingClientRect()
      const size = Math.max(event.pageX - left, width - (event.pageX - left))
      const animationConfig = {
        size: size * 2,
        top: event.pageY - (document.body.scrollTop || document.documentElement.scrollTop) - top - size,
        left: event.pageX - (document.body.scrollLeft || document.documentElement.scrollLeft) - left - size
      }
      const child = this.createAnimation(animationConfig)
      this.$refs.animation.insertBefore(child, this.$refs.animation.firstChild)

      window.setTimeout(() => {
        this.$refs.animation && this.$refs.animation.removeChild(child)
      }, 499)
    },

    createAnimation (config) {
      const span = document.createElement('span')
      span.style.left = `${config.left}px`
      span.style.top = `${config.top}px`
      span.style.width = `${config.size}px`
      span.style.height = `${config.size}px`
      return span
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

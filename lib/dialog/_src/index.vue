<template>
  <transition name='bee-dialog' @before-enter='beforeEnter' @after-leave='afterLeave'>
    <div class='bee-dialog' v-if='value'>
      <div class='bee-dialog--panel' :style='{
        "width": this.width
      }'>
        <div class='bee-dialog--title'>
          <span class='bee-dialog-title--text'>{{title}}</span>

          <bee-icon v-if='closeVisible'
            class='bee-dialog--close'
            icon='close'
            @click='close'
          ></bee-icon>
        </div>

        <div class='bee-dialog--body'>
          <slot></slot>
        </div>

        <div class='bee-dialog--footer' v-if='cancelVisible || confirmVisible'>
          <bee-button v-if='cancelVisible'
            class='bee-dialog--btn__cancel'
            @click='cancel'
          >{{cancelText}}</bee-button>

          <bee-button v-if='confirmVisible'
            class="bee-dialog--btn__confirm"
            theme='primary'
            @click='confirm'
          >{{confirmText}}</bee-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BeeDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '500px'
    },
    title: {
      type: String,
      default: function () {
        return this.$_language('TAP')
      }
    },
    closeVisible: {
      type: Boolean,
      default: true
    },
    cancelVisible: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: function () {
        return this.$_language('CANCEL')
      }
    },
    confirmVisible: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: function () {
        return this.$_language('CONFIRM')
      }
    },
    autoHide: {
      type: Boolean,
      default: true
    },
    stopPenetrate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scrollBehavior: {
        style: null,
        top: null,
        left: null
      }
    }
  },
  methods: {
    beforeEnter (el) {
      this.$listeners.beforeEnter && this.$listeners.beforeEnter(el)

      if (this.stopPenetrate) {
        this.scrollBehavior.top = document.body.scrollTop || document.documentElement.scrollTop
        this.scrollBehavior.left = document.body.scrollLeft || document.documentElement.scrollLeft
        this.scrollBehavior.style = document.body.getAttribute('style')

        let style = this.scrollBehavior.style

        if (/height:\s*\w+;/.test(style)) {
          style.replace(/height:\s*\w+;/, 'height: 100vh;')
        } else {
          style += 'height: 100vh;'
        }

        if (/overflow:\s*\w+;/.test(style)) {
          style.replace(/overflow:\s*\w+;/, 'overflow: hidden;')
        } else {
          style += 'overflow: hidden;'
        }

        document.body.setAttribute('style', style)
      }
    },

    afterLeave (el) {
      this.$listeners.afterLeave && this.$listeners.afterLeave(el)

      if (this.stopPenetrate) {
        this.scrollBehavior.style ? document.body.setAttribute('style', this.scrollBehavior.style) : document.body.removeAttribute('style')
        this.scrollBehavior.style = null

        document.body.scrollTop = this.scrollBehavior.top
        document.documentElement.scrollTop = this.scrollBehavior.top
        this.scrollBehavior.top = null

        document.body.scrollLeft = this.scrollBehavior.left
        document.documentElement.scrollLeft = this.scrollBehavior.left
        this.scrollBehavior.left = null
      }
    },

    hide () {
      // If the update:value event was be bound.
      this.$listeners.input && this.$listeners.input(false)
    },

    close () {
      // If the close event was be bound.
      this.$listeners.close && this.$listeners.close(false)

      this.hide()
    },

    cancel () {
      // If the cancel event was be bound.
      this.$listeners.cancel && this.$listeners.cancel()

      this.close()
    },

    confirm () {
      // If the confirm event was be bound.
      this.$listeners.confirm && this.$listeners.confirm()

      if (this.autoHide) this.hide()
    }
  }
}
</script>

<style lang='less'>
  @import './index.less';
</style>

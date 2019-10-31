<template>
  <transition name='notification'
    @before-enter='beforeEnter'
    @before-leave='beforeLeave'
    @after-leave='afterLeave'
  >
    <div :class='["bee-notification", {
        "bee-notification__info": type === "info",
        "bee-notification__success": type === "success",
        "bee-notification__warn": type === "warn",
        "bee-notification__error": type === "error"
      }]'
      @mouseenter='clearTimeout'
      @mouseleave='addTimeout'
      :style='{
        top: boundingTop + "px"
      }'
      v-show='open'
    >
      <div class='bee-notification--body'>
        <bee-icon class='bee-notification--close' icon='close' @click='onclose'></bee-icon>

        <div class='bee-notification--content'>
          <bee-icon class='bee-notification--icon' :icon='icon'></bee-icon>
          <div class='content--main'>
            <div class='content-main--title'>{{titleText}}</div>
            <div class='content-main--content'>{{message}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      type: 'info',
      title: '',
      message: '',
      duration: 3,
      open: false,
      boundingTop: 0
    }
  },
  computed: {
    icon () {
      const icons = {
        info: 'info',
        warn: 'warn',
        success: 'success',
        error: 'error'
      }

      return icons[this.type] || icons.info
    },

    titleText () {
      if (this.title) return this.title

      const TITLE = {
        info: this.$_language('NOTIFICATION_INFO'),
        warn: this.$_language('NOTIFICATION_WARN'),
        success: this.$_language('NOTIFICATION_SUCCESS'),
        error: this.$_language('NOTIFICATION_ERROR')
      }

      return TITLE[this.type] || TITLE.info
    }
  },
  mounted () {
    // Append the root Element to body element node.
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    // Remove the components when it disappeared.

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

      // If the duration was be setted.
      if (Number(this.duration)) {
        this.addTimeout()
      }

      return this
    },

    hide () {
      this.open = false
      return this
    },

    onclose () {
      this.hide()
    },

    clearTimeout () {
      this._timeout && clearTimeout(this._timeout)
    },

    addTimeout () {
      // if this is manually closed, break after.
      if (!Number(this.duration)) return

      this.clearTimeout()

      this._timeout = window.setTimeout(() => {
        this.open = false
      }, Number(this.duration) * 1000)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

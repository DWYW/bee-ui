<template>
  <transition name='slid-down'
    @after-leave='afterLeave'
  >
    <div :class='["bee-message", {
        "bee-message__warn": type === "warn",
        "bee-message__success": type === "success",
        "bee-message__error": type === "error",
        "bee-message__left": align === "left",
        "bee-message__center": align === "center"
      }]'
      v-show='open'
      @mouseenter="clearTimeout"
      @mouseleave="addTimeout"
    >
      <bee-icon class="bee-message--icon" :icon='icon'></bee-icon>
      <span class="bee-message--body" v-if='html' v-html='html'></span>
      <span class="bee-message--body" v-else>{{message}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      open: false,
      type: 'warn',
      duration: 3,
      html: null,
      message: '',
      align: false
    }
  },
  computed: {
    icon () {
      const icons = {
        warn: 'warn',
        success: 'success',
        error: 'error'
      }

      return icons[this.type] || icons.warn
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

    clearTimeout () {
      this._timeout && clearTimeout(this._timeout)
    },

    addTimeout () {
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

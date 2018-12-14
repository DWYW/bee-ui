<template>
  <transition name='slid-down' @after-leave='afterLeave'>
    <div :class='["bee-message--wp", {
        "bee-message--wp__warn": type === "warn",
        "bee-message--wp__success": type === "success",
        "bee-message--wp__error": type === "error",
        "bee-message--wp__left": align === "left",
        "bee-message--wp__center": align === "center"
      }]'
      v-show='toggle'
      @mouseenter='removeTimeout'
      @mouseleave='addTimeout'
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
      toggle: false,
      timeout: null
    }
  },
  computed: {
    icon () {
      let icons = ['warn', 'success', 'error']
      return icons.indexOf(this.type) !== -1 ? this.type : icons[0]
    }
  },
  methods: {
    show () {
      this.addTimeout()
      this.__onShow()
    },

    close () {
      this.removeTimeout()
      this.__onClose()
    },

    afterLeave () {
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    },

    removeTimeout () {
      clearTimeout(this.timeout)
    },

    addTimeout () {
      if (!this.duration) return false

      this.timeout = window.setTimeout(() => {
        this.close()
      }, this.duration * 1000)
    }
  }
}
</script>

<style lang='less'>
@import '../../theme.less';
@root: bee-message;

.@{root}--wp {
  width: @message-width;
  padding: 8px 15px;
  margin-left: -@message-width/2;
  font-size: 14px;
  border-radius: @border-radius;
  box-sizing: border-box;
  position: fixed;
  top: @message-top;
  left: 50%;
  z-index: @z-2;

  .@{root}--icon, .@{root}--body {
    vertical-align: middle;
  }

  .@{root}--icon {
    font-size: 16px;
    padding-right: 4px;
  }

  &.@{root}--wp__warn {
    background-color: @message-warn-bg;
    color: @message-warn-color;
  }

  &.@{root}--wp__success {
    background-color: @message-success-bg;
    color: @message-success-color;
  }

  &.@{root}--wp__error {
    background-color: @message-error-bg;
    color: @message-error-color;
  }

  &.@{root}--wp__center {
    text-align: center
  }
}

.slid-down-enter-active, .slid-down-leave-active {
  transition: all .4s;
}

.slid-down-enter {
  opacity: 0;
  transform: translateY(-100px);
}

.slid-down-leave-to {
  opacity: 0;
}

</style>

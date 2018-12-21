<template>
  <transition name='notify' @after-leave='afterLeave'>
    <div :class='["bee-notify--wp", {
        "bee-notify__info": type === "info",
        "bee-notify__success": type === "success",
        "bee-notify__warn": type === "warn",
        "bee-notify__error": type === "error"
      }]'
      @mouseenter='removeTimeout'
      @mouseleave='addTimeout'
      :style='styles'
      v-show='toggle'
    >
      <div class='bee-notify--body'>
        <bee-icon class='bee-notify--close' icon='close' @click='hide'></bee-icon>

        <div class='bee-notify--content'>
          <bee-icon class='body--icon' :icon='icon'></bee-icon>
          <div class='body--wp'>
            <div class='body-wp--title' v-if='title'>{{title}}</div>
            <div class='body-wp--content'>{{message}}</div>
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
      toggle: false,
      offset: 0,
      timeout: null
    }
  },
  computed: {
    icon () {
      let icons = ['info', 'success', 'warn', 'error']
      return icons.indexOf(this.type) !== -1 ? this.type : icons[0]
    },
    styles () {
      return {
        top: `${this.offset}px`
      }
    }
  },
  methods: {
    show () {
      this.addTimeout()
      this.__onShow()
      return this
    },

    hide () {
      this.removeTimeout()
      this.__onHide()
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
        this.hide()
      }, this.duration * 1000)
    }
  }
}
</script>

<style lang='less'>
@import '../../theme.less';
@root: bee-notify;

.@{root}--wp {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: @z-2;
  width: 320px;
  padding: 14px 26px 14px 13px;
  background-color: @notify-body-bg;
  border-radius: @border-radius;
  border: 1px solid @notify-border-color;
  box-shadow: @notify-shadow;
  transition: top 0.4s;

  .@{root}--body {
    position: relative;

    .@{root}--close {
      position: absolute;
      top: 0;
      right: 0;
      margin-top: -5px;
      margin-right: -15px;
      cursor: pointer;
    }
    .@{root}--content {
      display: flex;
      align-items: center;

      .body--icon {
        font-size: 24px;
        padding-right: 10px;
      }

      .body--wp {
        .body-wp--title {
          font-size: 16px;
          font-weight: bold;
          color: @notify-title-color;
        }
        .body-wp--content {
          font-size: 14px;
          color: @notify-body-color;
          padding-top: 5px;
        }
      }
    }
  }

  &.@{root}__info {
    .body--icon {
      color: @notify-body-color;
    }
  }

  &.@{root}__warn {
    .body--icon {
      color: @notify-warn-color;
    }
  }

  &.@{root}__success {
    .body--icon {
      color: @notify-success-color;
    }
  }

  &.@{root}__error {
    .body--icon {
      color: @notify-error-color;
    }
  }
}

.notify-enter-active {
  transition: all .4s cubic-bezier(0.84, 0.12, 1, 1);
}

.notify-leave-active {
  transition: all .4s;
}

.notify-enter {
  transform: translate3d(120%, 0, 0);
}
.notify-leave-to {
  opacity: 0;
}
</style>

<template>
  <transition name='bee-alert' @after-leave='afterLeave'>
    <div class='bee-alert--wp' v-show='toggle'>
      <div class="bee-alert--panel">
        <div class="bee-alert--header">
          <span class="bee-alert--title">{{title}}</span>
          <bee-icon class='bee-alert--colse' icon='close' @click="closeEvent" v-if='closeBtnVisiable'></bee-icon>
        </div>

        <div :class='["bee-alert--body", {
          "bee-alert--body__horizontal-center": isHorizontalCenter,
          "bee-alert--body__vertial-center": isVertialCenter
        }]'>
          <span class="bee-alert-body--content" v-if='html' v-html='html'></span>
          <span class="bee-alert-body--content" v-else>{{message}}</span>
        </div>

        <div class="bee-alert--footer" v-if='confirmBtnVisiable || cancelBtnVisiable'>
          <bee-button @click='cancelEvent' class='bee-alert--cancle' v-if='cancelBtnVisiable'>{{cancelBtnText}}</bee-button>
          <bee-button @click='confirmEvent' class="bee-alert--confirm" theme='primary' v-if='cancelBtnVisiable'>{{cancelBtnText}}</bee-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AlertBody',
  data () {
    return {
      toggle: false
    }
  },
  computed: {
    /* message是否水平居中 */
    isHorizontalCenter () {
      return this.align === 'center' || this.align === 'horizontal'
    },

    /* message是否垂直居中 */
    isVertialCenter () {
      return this.align === 'center' || this.align === 'vertial'
    }
  },
  methods: {
    show () {
      this.__onShow()
    },

    close () {
      this.__onClose()
    },

    afterLeave () {
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    },

    cancelEvent () {
      this.cancelBtnFun && this.cancelBtnFun()
      this.close()
    },

    confirmEvent () {
      this.confirmBtnFun && this.confirmBtnFun()
      this.close()
    },

    closeEvent () {
      this.closeBtnFun ? this.closeBtnFun() : this.cancelBtnFun ? this.cancelBtnFun() : null
      this.close()
    }
  }
}
</script>

<style lang='less'>
@import '../../theme.less';
@root: bee-alert;

.@{root}--wp {
  position: fixed;
  left: 0;
  top: 0;
  z-index: @z-2;
  width: 100%;
  height: 100%;
  background-color: @mask-bg-color;
  display: flex;
  justify-content: center;
  align-items: center;

  .@{root}--panel {
    width: 400px;
    margin-top: -10%;
    background-color: @alert-body-bg;
    border-radius: @border-radius;
    border: 1px solid @alert-border-color;
    overflow: hidden;

    .@{root}--header {
      height: @alert-header-height;
      line-height: @alert-header-height;
      padding: 0 20px;
      box-sizing: border-box;
      background-color: @alert-header-bg;

      .@{root}--title {
        color: @alert-header-color;
        font-size: 16px;
      }

      .@{root}--colse {
        float: right;
        margin-right: -10px;
        color: @alert-close-color;
        cursor: pointer;
      }
    }

    .@{root}--body {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      min-height: 100px;
      color: @alert-color;
      font-size: 16px;

      .@{root}-body--content {
        word-break: break-word;
      }

      &.@{root}--body__horizontal-center, &.@{root}--body__vertial-center {
        display: flex;
      }

      &.@{root}--body__horizontal-center {
        justify-content: center;
      }

      &.@{root}--body__vertial-center {
        align-items: center;
      }
    }

    .@{root}--footer {
      display: flex;
      justify-content: center;
      padding-bottom: 24px;
      box-sizing: border-box;
      align-items: center;

      .@{root}--cancle, .@{root}--confirm {
        height: 36px;
        line-height: 34px;
      }

      .@{root}--cancle {
        margin-right: 16px;
      }
    }
  }
}

.@{root}-enter-active, .@{root}-leave-active {
  transition: all .4s;

  .@{root}--panel {
    transition: all .4s;
  }
}

.@{root}-enter, .@{root}-leave-to {
  opacity: 0;
}

.@{root}-enter {
  .@{root}--panel {
    transform: translate3d(0, -50px, 0);
  }
}
</style>

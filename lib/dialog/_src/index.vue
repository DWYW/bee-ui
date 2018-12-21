<template>
  <transition name='dlg'>
    <div class='dlg--wp' v-if='show'>
        <div :class='["dlg--panel"]' :style='{
          "width": this.width
        }'>
          <div class='dlg--title' v-if='title'>
            <span class='dlg-title--text'>{{title}}</span>
            <bee-icon class='dlg--close' icon='close' v-if='closeBtnVisiable' @click='cancelClose'></bee-icon>
          </div>
          <div class='dlg--body'>
            <slot></slot>
          </div>
          <div class='dlg-footer' v-if='confirmBtnVisiable || cancelBtnVisiable'>
            <bee-button class='dlg--btn__cancel' v-if='cancelBtnVisiable' @click='cancel'>{{cancelBtnText}}</bee-button>
            <bee-button class="dlg--btn__confirm" theme='primary' v-if='confirmBtnVisiable' @click='confirm'>{{confirmBtnText}}</bee-button>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BeeDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '500px'
    },
    title: {
      type: String,
      default: '提示'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    cancelBtnFun: {
      type: Function
    },
    cancelBtnVisiable: {
      type: Boolean,
      default: true
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    confirmBtnFun: {
      type: Function
    },
    confirmBtnVisiable: {
      type: Boolean,
      default: true
    },
    closeBtnVisiable: {
      type: Boolean,
      default: true
    },
    closeBtnFun: {
      type: Function
    },
    stopScroll: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      bodyScrollTop: null,
      bodyStyle: ''
    }
  },
  methods: {
    /** 消除body的滚动 */
    bodyOverHide () {
      this.bodyScrollTop = document.body.scrollTop || document.documentElement.scrollTop
      this.bodyStyle = document.body.style

      // 修复360安全浏览器8.1，body.style直接设置报错
      try {
        document.body.style = 'height: 100vh;overflow: hidden;'
      } catch (e) {
        document.body.setAttribute('style', 'height: 100vh;overflow: hidden;')
      }
    },

    /** 重置body的滚动 */
    bodyOverShow () {
      // 修复360安全浏览器8.1，body.style 直接设置报错
      try {
        document.body.style = this.bodyStyle
      } catch (e) {
        document.body.setAttribute('style', this.bodyStyle)
      }

      document.body.scrollTop = this.bodyScrollTop
      document.documentElement.scrollTop = this.bodyScrollTop
      this.bodyStyle = ''
      this.bodyScrollTop = 0
    },

    /** 关闭dialog */
    hide () {
      this.$emit('update:show', false)
    },

    /** 点击取消按钮 */
    cancel () {
      this.cancelBtnFun ? this.cancelBtnFun() : null
      this.hide()
    },

    /** 点击X号 */
    cancelClose () {
      if (this.closeBtnFun) {
        this.closeBtnFun()
      } else if (this.cancelBtnFun) {
        this.cancelBtnFun()
      }

      this.hide()
    },

    /** 点击确认按钮 */
    confirm () {
      let res = 'next'

      if (this.confirmBtnFun) {
        res = this.confirmBtnFun()
      }

      if (res === false) return null

      this.hide()
    }
  },
  watch: {
    show: function (newValue) {
      if (this.stopScroll) {
        newValue ? this.bodyOverHide() : this.bodyOverShow()
      }
    }
  }
}
</script>

<style lang='less'>
@import '../../theme.less';
@root: dlg;

.@{root}--wp {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: @dlg-mask-bg-color;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: @z-2;

  .@{root}--panel {
    background-color: @dlg-panel-bg-color;
    border-radius: @border-radius;
    border: 1px solid @dlg-panel-border-color;

    .@{root}--title {
      height: @dlg-title-height;
      line-height: @dlg-title-height;
      padding: 0 20px;
      background-color: @dlg-title-bg-color;

      .@{root}-title--text {
        color: @dlg-title-color;
        font-size: @dlg-title-font-size;
      }

      .@{root}--close {
        float: right;
        margin-right: -10px;
        color: @dlg-colse-color;
        cursor: pointer;
      }
    }

    .@{root}--body {
      width: 100%;
      padding: 20px;
      min-height: @dlg-body-height;
      color: @dlg-body-color;
      overflow: hidden;
    }

    .@{root}-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 24px;

      .@{root}--btn__cancel, .@{root}--btn__confirm {
        height: @dlg-footer-btn-height;
        line-height: @dlg-footer-btn-height;
      }

      .@{root}--btn__cancel {
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

<template>
  <transition name='bee-menu'>
    <div class='menu--wp' ref='gmenu' v-show='show' @click='clickEvent'>
      <div :class='[{
        "menu--arr__up": arrPosition.top,
        "menu--arr__bottom": !arrPosition.top
      }]' :style='{
        left: arrPosition.left,
        right: arrPosition.right,
        top: arrPosition.top,
        bottom: arrPosition.bottom
      }' v-if='hasArr'></div>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import Listener from '../../utils/listener'
import UI from '../../utils/ui'

export default {
  name: 'BeeMenu',
  data () {
    return {
      popTarget: null,
      show: false,
      arrPosition: {
        left: true,
        top: true
      }
    }
  },
  props: {
    scrollDom: {
      default: () => document
    },
    followTarget: {
      required: true
    },
    center: {
      type: Boolean,
      default: false
    },
    distance: {
      type: Number,
      default: 5
    },
    hasArr: {
      type: Boolean,
      default: true
    },
    autoHide: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.popTarget = this.$refs.gmenu
    this.show = true
    this.$nextTick(() => {
      this.menuInit()
    })
  },
  beforeDestroy () {
    Listener.removeListener(this.scrollDom, 'scroll', this.scrollCallBack)
  },
  methods: {
    /**
     * GMenu 初始化
     */
    menuInit () {
      this.setPosition()
      Listener.addListener(this.scrollDom, 'scroll', this.scrollCallBack)
    },

    /**
     * 滚动回调， 用于更新弹出层的位置
     */
    scrollCallBack () {
      this.setPosition()
    },

    /**
     * 设置弹出层具体的位置
     */
    setPosition () {
      let _position = this.mountPopPosition(this.scrollDom, this.followTarget, this.popTarget)
      this.arrPosition = _position.arr
      for (let key in _position.pop) {
        this.popTarget.style[key] = _position.pop[key]
      }
    },

    /**
     * 计算弹出层的位置信息，以及三角图标的位置信息
     * @param  {HTML DOM} scrollTarget 滚动的目标元素
     * @param  {HTML DOM} target       要跟随的目标元素
     * @param  {HTML DOM} popTarget    弹出层元素
     * @return {Object}              位置信息的Object
     */
    mountPopPosition (scrollTarget, target, popTarget) {
      if (!target || !popTarget) {
        return {
          pop: {
            left: 0,
            top: 0
          },
          arr: {
            top: true,
            left: true
          }
        }
      }

      let position = {
        pop: {},
        arr: {}
      }
      let _target = target.getBoundingClientRect()
      // 5是三角图标的高度
      let _scrollHeight = popTarget.offsetHeight + 5
      let _scrollWidth = popTarget.offsetWidth
      let _scrollTargetST = 0
      let _nodeName = scrollTarget.nodeName + ''

      if (_nodeName.match('document')) {
        _scrollTargetST = document.documentElement.scrollTop || document.body.scrollTop
      }

      let broswer = {
        width: UI.availScreen().width,
        height: UI.availScreen().height
      }

      if ((broswer.height - _target.top - _target.height) > _scrollHeight) {
        position.pop['top'] = `${_target.top + _target.height + this.distance + _scrollTargetST}px`
        position.arr['top'] = '0px'
      } else {
        position.pop['top'] = `${_target.top - (_scrollHeight + this.distance - 5) + _scrollTargetST}px`
        position.arr['bottom'] = '0px'
      }

      if (this.center) {
        if (broswer.width - _target.left - _target.width / 2 > _scrollWidth / 2) {
          position.pop['left'] = `${parseInt(_target.left + _target.width / 2 - _scrollWidth / 2)}px`
          position.arr['left'] = `${parseInt(_scrollWidth / 2 - 4)}px`
        } else {
          position.pop['left'] = `${parseInt(broswer.width - _scrollWidth - 5)}px`
          position.arr['left'] = `${parseInt(_scrollWidth - (broswer.width - _target.left - _target.width / 2))}px`
        }
      } else {
        if (broswer.width - _target.left > _scrollWidth) {
          position.pop['left'] = `${_target.left}px`
          position.arr['left'] = '40px'
        } else {
          position.pop['left'] = `${_target.left - _scrollWidth + _target.width}px`
          position.arr['right'] = '40px'
        }
      }

      return position
    },

    /**
     * 点击事件
     */
    clickEvent (e) {
      if (!this.autoHide) {
        e.stopPropagation()
        e.preventDefault()
      }
    }
  }
}
</script>

<style lang='less'>
@import '../../theme.less';
@root: menu;
.@{root}--wp{
  position: absolute;
  left: 0;
  top: -100%;
  display: inline-block;
  z-index: 9;

  .menu--arr__up {
    position: absolute;
    z-index: 10;
    width: 0;
    height: 0;
    border-left: @menu-arr-size solid transparent;
    border-right: @menu-arr-size solid transparent;
    border-bottom: @menu-arr-size solid @menu-border-color;
    margin-top: -(@menu-arr-size - 1px);

    &::after {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-left: @menu-arr-size - 1px solid transparent;
      border-right: @menu-arr-size - 1px solid transparent;
      border-bottom: @menu-arr-size - 1px solid #ffffff;
      margin-left: -(@menu-arr-size - 1px);
      margin-top: 1px;
    }
  }

  .menu--arr__bottom {
    position: absolute;
    z-index: 10;
    width: 0;
    height: 0;
    border-left: @menu-arr-size solid transparent;
    border-right: @menu-arr-size solid transparent;
    border-top: @menu-arr-size solid @menu-border-color;
    margin-bottom: -(@menu-arr-size - 1px);

    &::after {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-left: @menu-arr-size - 1px solid transparent;
      border-right: @menu-arr-size - 1px solid transparent;
      border-top: @menu-arr-size - 1px solid #ffffff;
      margin-left: -(@menu-arr-size - 1px);
      margin-top: -@menu-arr-size;
    }
  }
}

.bee-menu-enter-active, .bee-menu-leave-active {
  transition: opacity .2s;
}
.bee-menu-enter, .bee-menu-leave-to {
  opacity: 0;
}
</style>

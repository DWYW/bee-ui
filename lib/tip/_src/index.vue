<template>
  <transition name='bee-tip' @after-leave='afterLeave'>
    <div class="bee-tip--wp" v-show='toggle' :style='wrapperPosition'>
      <div class="bee-tip--content" v-html='content'></div>
      <span :class='["bee-tip--arr", "bee-tip--arr__" + direction]' :style='arrPosition'></span>
    </div>
  </transition>
</template>

<script>
import Listener from '../../utils/listener'

export default {
  name: 'BeeTip',
  data () {
    return {
      toggle: false,
      distance: 6,
      offsetTop: null,
      offsetLeft: null,
      arrOffsetTop: null,
      arrOffsetLeft: null,
      borderWidth: 4
    }
  },
  computed: {
    wrapperPosition () {
      return {
        top: `${this.offsetTop}px`,
        left: `${this.offsetLeft}px`
      }
    },
    arrPosition () {
      return {
        borderWidth: `${this.borderWidth}px`,
        top: `${this.arrOffsetTop}px`,
        left: `${this.arrOffsetLeft}px`
      }
    },
    direction () {
      if (/^top/.test(this.position)) {
        return 'top'
      } else if (/^bottom/.test(this.position)) {
        return 'bottom'
      } else if (/^left/.test(this.position)) {
        return 'left'
      } else if (/^right/.test(this.position)) {
        return 'right'
      } else {
        return null
      }
    }
  },
  methods: {
    show () {
      this.__onShow()
      Listener.addListener(this.scrollDom, 'scroll', this.setPositionData)

      this.$nextTick(() => {
        this.setPositionData()
      })

      return this
    },

    hide () {
      this.__onHide()
    },

    afterLeave () {
      this.$destroy()
      Listener.removeListener(this.scrollDom, 'scroll', this.setPositionData)
      this.$el.parentNode.removeChild(this.$el)
    },

    setPositionData () {
      let { wrapperLeft, arrLeft } = this.getLeft(this.target)
      let { wrapperTop, arrTop } = this.getTop(this.target)

      this.offsetTop = wrapperTop
      this.arrOffsetTop = arrTop
      this.offsetLeft = wrapperLeft
      this.arrOffsetLeft = arrLeft
    },

    getLeft (target) {
      let _target = target.getBoundingClientRect()
      let _self = this.$el.getBoundingClientRect()
      let wrapperLeft = 0
      let arrLeft = 0

      if (this.direction === 'top' || this.direction === 'bottom') {
        if (/start$/.test(this.position)) {
          wrapperLeft = _target.left
          arrLeft = Math.min(_target.width, _self.width) / 2 - this.borderWidth
        } else if (/end$/.test(this.position)) {
          wrapperLeft = _target.left + _target.width - _self.width
          arrLeft = _self.width - Math.min(_target.width, _self.width) / 2 - this.borderWidth
        } else {
          wrapperLeft = _target.left + (_target.width - _self.width) / 2
          arrLeft = _self.width / 2 - this.borderWidth
        }
      } else if (this.direction === 'left') {
        wrapperLeft = _target.left - _self.width - this.distance - this.borderWidth
        arrLeft = this.$el.clientWidth
      } else if (this.direction === 'right') {
        wrapperLeft = _target.left + _target.width + this.distance + this.borderWidth
        arrLeft = 0 - this.borderWidth * 2
      }

      return { wrapperLeft, arrLeft }
    },

    getTop (target) {
      let _target = target.getBoundingClientRect()
      let _self = this.$el.getBoundingClientRect()
      let wrapperTop = 0
      let arrTop = 0

      if (this.direction === 'top') {
        wrapperTop = _target.top - this.distance - this.$el.offsetHeight
        arrTop = this.$el.clientHeight
      } else if (this.direction === 'bottom') {
        wrapperTop = _target.top + target.clientHeight + this.distance
        arrTop = 0 - this.borderWidth * 2
      } else if (/^left|right/.test(this.position)) {
        if (/start$/.test(this.position)) {
          wrapperTop = _target.top
          arrTop = Math.min(_self.height, _target.height) / 2 - this.borderWidth
        } else if (/end$/.test(this.position)) {
          wrapperTop = _target.top + _target.height - _self.height
          arrTop = _self.height - Math.min(_self.height, _target.height) / 2 - this.borderWidth
        } else {
          wrapperTop = _target.top + (_target.height - _self.height) / 2
          arrTop = _self.height / 2 - this.borderWidth
        }
      }

      return { wrapperTop, arrTop }
    }
  }
}
</script>

<style lang="less">
@import '../../theme.less';

@root: bee-tip;

.@{root}--wp {
  position: fixed;
  left: -100%;
  top: -100%;
  z-index: @z-2;
  font-size: @tip-font-size;

  .@{root}--arr {
    position: absolute;
    left: 4px;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;

    &.@{root}--arr__top {
      border-top-color: @tip-bg;
    }

    &.@{root}--arr__bottom {
      border-bottom-color: @tip-bg;
    }

    &.@{root}--arr__left {
      border-left-color: @tip-bg;
    }

    &.@{root}--arr__right {
      border-right-color: @tip-bg;
    }
  }

  .@{root}--content {
    border-radius: @border-radius;
    background-color: @tip-bg;
    color: @tip-color;
    overflow: hidden;
    padding: 6px 10px;
  }
}

.@{root}-enter-active, .@{root}-leave-active {
  transition: opacity .4s;
}
.@{root}-enter, .@{root}-leave-to {
  opacity: 0;
}
</style>

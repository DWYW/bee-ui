<template>
  <transition name='bee-menu'>
    <div class='menu--wp' v-show='show' @click='clickEvent' :style='popStyles'>
      <div :class='[{
        "menu--arr__up": position.direction === "down",
        "menu--arr__down": position.direction == "up"
      }]' v-if='hasArr' :style='arrStyle'></div>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import Listener from '../../utils/listener'

export default {
  name: 'BeeMenu',
  data () {
    return {
      show: false,
      position: {
        arr: null,
        pop: null,
        direction: null
      }
    }
  },
  props: {
    scrollDom: {
      default: () => document.body
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
  computed: {
    popStyles () {
      if (!this.position.pop) {
        return null
      } else {
        const [left, top] = this.position.pop

        return {
          left: `${left}px`,
          top: `${top}px`
        }
      }
    },

    arrStyle () {
      if (!this.position.arr) {
        return null
      } else {
        const [left, top] = this.position.arr

        return {
          left: `${left}px`,
          top: `${top}px`
        }
      }
    }
  },
  mounted () {
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
      const { pop, arr, direction } = this.getPanelData(this.scrollDom, this.followTarget, this.$el)
      this.$set(this.position, 'pop', pop)
      this.$set(this.position, 'arr', arr)
      this.$set(this.position, 'direction', direction)
    },

    /**
     * 计算弹出层的位置信息，以及三角图标的位置信息
     * @param  {Html Element} scroll 滚动的目标元素
     * @param  {Html Element} followed       要跟随的目标元素
     * @param  {Html Element} pop    弹出层元素
     * @return {pop: [left, top], arr: [left, top]}              位置信息的Object
     */
    getPanelData (scroll, followed, pop) {
      const data = {
        pop: [0, 0],
        arr: [0, 0],
        direction: null
      }

      if (!followed) {
        return data
      }

      const followedBounding = followed.getBoundingClientRect()
      const popBounding = pop.getBoundingClientRect()
      const scrollBounding = scroll.getBoundingClientRect()
      const bodyBounding = document.body.getBoundingClientRect()
      const topDistance = followedBounding.top + followedBounding.height - scrollBounding.top
      const vertical = scrollBounding.height - topDistance

      if (vertical > popBounding.height + this.distance) {
        data.pop[1] = Math.floor(followedBounding.top + followedBounding.height + this.distance - bodyBounding.top)
        data.arr[1] = 0
        data.direction = 'down'
      } else if (topDistance >= popBounding.height + this.distance) {
        data.pop[1] = Math.floor(followedBounding.top - (popBounding.height + this.distance) - bodyBounding.top)
        data.arr[1] = Math.floor(popBounding.height)
        data.direction = 'up'
      } else {
        data.pop[1] = Math.floor(followedBounding.top + followedBounding.height + this.distance - bodyBounding.top)
        data.arr[1] = 0
        data.direction = 'down'
      }

      const dl = followedBounding.left - scrollBounding.left + followedBounding.width / 2 - popBounding.width / 2
      const dr = scrollBounding.width - (followedBounding.left - scrollBounding.left + followedBounding.width / 2 + popBounding.width / 2)

      if (this.center && dl >= 0 && dr >= 0) {
        data.pop[0] = Math.floor(dl + scrollBounding.left)
        data.arr[0] = Math.floor(popBounding.width / 2)
      } else {
        const horizon = scrollBounding.left + scrollBounding.width - followedBounding.left

        if (horizon >= popBounding.width) {
          data.pop[0] = Math.floor(followedBounding.left)
          data.arr[0] = Math.floor(Math.min(popBounding.width * 0.2, followedBounding.width / 2))
        } else {
          data.pop[0] = Math.floor(followedBounding.left + followedBounding.width - popBounding.width)
          data.arr[0] = Math.floor(Math.max(popBounding.width * 0.8, popBounding.width - followedBounding.width / 2))
        }
      }

      return data
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
  border: 1px solid @border-color;
  border-radius: @border-radius;

  .menu--arr__up {
    position: absolute;
    z-index: 10;
    width: 0;
    height: 0;
    border-left: @menu-arr-size solid transparent;
    border-right: @menu-arr-size solid transparent;
    border-bottom: @menu-arr-size solid @menu-border-color;
    margin-top: -@menu-arr-size;

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

  .menu--arr__down {
    position: absolute;
    z-index: 10;
    width: 0;
    height: 0;
    border-left: @menu-arr-size solid transparent;
    border-right: @menu-arr-size solid transparent;
    border-top: @menu-arr-size solid @menu-border-color;
    margin-top: -2px;

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

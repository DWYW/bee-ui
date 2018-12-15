<template>
  <transition name='bee-loading' @after-leave='afterLeave'>
    <div :class='["bee-loading--wp", "bee-loading--wp__" + display, {
      "bee-loading--wp__root": !parent
    }]' v-show='toggle'>
      <loading-logo v-if='type === 0'></loading-logo>
      <loading-pie v-else-if='type === 1'></loading-pie>
      <loading-rects v-else></loading-rects>
      <span class='bee-loading--text'> {{text}}</span>
    </div>
  </transition>

</template>

<script>
import LoadingLogo from './Logo.vue'
import LoadingPie from './Pie.vue'
import LoadingRects from './Rects.vue'

export default {
  components: {
    LoadingLogo,
    LoadingPie,
    LoadingRects
  },
  data () {
    return {
      toggle: false
    }
  },
  methods: {
    show () {
      this.__onShow()
      this.$el.parentNode.classList.add('bee-loading--parent')
      return this
    },

    hide () {
      window.setTimeout(() => {
        this.__onHide()
      }, 100)
    },

    afterLeave () {
      this.$destroy()
      this.$el.parentNode.classList.remove('bee-loading--parent')
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style lang="less">
@import '../../theme.less';
@root: bee-loading;

.@{root}--wp {
  width: 100%;
  height: 100%;
  transition: opacity .4s;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: @z-2;
  background-color: @loading-bg;
  user-select: none;

  .@{root}--text {
    color: @font-tint-color;
    font-size: 13px;
    line-height: 24px;
  }

  &.@{root}--wp__block, &.@{root}--wp__inline {
    display: flex;
    justify-content: center;
    align-items: center
  }

  &.@{root}--wp__block {
    flex-direction: column;
  }

  &.@{root}--wp__inline {
    flex-direction: row;

    .@{root}--text {
      padding-left: 10px;
    }
  }

  &.@{root}--wp__root {
    position: fixed;
  }
}

.@{root}--parent {
  position: relative;
}

.@{root}-leave-to {
  opacity: 0;
}
</style>

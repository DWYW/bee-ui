<template>
  <div :class='["scroll--wp", {
    "show-type__always": showType === "always",
    "show-type__hover": showType === "hover"
  }]'>
    <div class="scroll--body" ref='body'>
      <slot></slot>
    </div>

    <!-- 纵向滚动条 -->
    <div v-if='horizontal'
      class='scroll--bar scroll--bar__horizontal'
      role='horizontal'
      ref='horizontal'
      @mousedown='barMoveStart'
    ></div>

    <!-- 横向滚动条 -->
    <div v-if='vertical'
      class='scroll--bar scroll--bar__vertical'
      role='vertical'
      ref='vertical'
      @mousedown='barMoveStart'
    ></div>
  </div>
</template>

<script>
/**
  * the rule of horizontal scroll bar.
  *
  *                             top                                                                    _body.scrollTop
  * ------------------------------------------------------------------------------  = ----------------------------------------------
  *     _body.clientHeight - _horizontal.offsetHeight - _vertical.offsetHeight             _body.scrollHeight - _body.clientHeight
  *
  *
  * the rule of vertical scroll bar.
  *
  *                             left                                                            _body.scrollLeft
  * --------------------------------------------------------------------------  = ----------------------------------------------
  *     _body.clientWidth - _vertical.offsetWidth - _horizontal.offsetWidth            _body.scrollWidth  - _body.clientWidth
  */
import Listener from '../../utils/listener'

export default {
  name: 'BeeScroll',
  props: {
    showType: {
      type: String,
      validator: function (value) {
        return ['always', 'hover'].indexOf(value) >= 0
      },
      default: 'always'
    },
    scrollDom: null
  },
  data () {
    return {
      horizontal: false,
      vertical: false,
      switch: null,
      mousePos: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
      Listener.addListener(this.$refs.body, 'scroll', this.onScroll)
      Listener.addListener(window, 'resize', this.onResize)
      this.$emit('update:scrollDom', this.$refs.body)
    })
  },
  updated () {
    this.$nextTick(() => {
      this.onResize()
    })
  },
  methods: {
    init () {
      this.updateBodySize()

      this.$nextTick(() => {
        this.updateBarData()
      })
    },

    onResize () {
      this.updateBodySize()
      this.updateBarData()
    },

    onScroll (e) {
      e.preventDefault()
      this.$emit('onScroll', e)

      if (this.switch) return

      this.updateBarData()
    },

    updateBodySize () {
      if (!this.$refs.body) return false

      const _body = this.$refs.body
      const horizontalWidth = _body.offsetWidth - _body.clientWidth
      const verticalHeight = _body.offsetHeight - _body.clientHeight

      if (!this.vertical && _body.clientWidth < _body.scrollWidth) {
        this.vertical = true
      } else if (this.vertical && _body.clientWidth === _body.scrollWidth) {
        this.vertical = false
      }

      if (!this.horizontal && _body.clientHeight < _body.scrollHeight) {
        this.horizontal = true
      } else if (this.horizontal && _body.clientHeight === _body.scrollHeight) {
        this.horizontal = false
      }

      _body.style.width = `calc(100% + ${horizontalWidth}px)`
      _body.style.marginRight = `-${horizontalWidth}px`
      _body.style.height = `calc(100% + ${verticalHeight}px)`
      _body.style.marginBottom = `-${verticalHeight}px`
    },

    updateBarData () {
      const _body = this.$refs.body
      const _horizontal = this.$refs.horizontal
      const _vertical = this.$refs.vertical

      if (_horizontal) {
        const _verticalHeight = _vertical ? _vertical.offsetHeight : 0
        const top = _body.scrollTop / (_body.scrollHeight - _body.clientHeight) * (_body.clientHeight - _horizontal.offsetHeight - _verticalHeight)
        _horizontal.style.height = `${_body.clientHeight / _body.scrollHeight * 100}%`
        _horizontal.style.transform = `translate3d(0, ${top}px, 0)`
        _horizontal.setAttribute('data-top', top)
      }

      if (_vertical) {
        const _horizontalWidth = _horizontal ? _horizontal.offsetWidth : 0
        const left = _body.scrollLeft / (_body.scrollWidth - _body.clientWidth) * (_body.clientWidth - _vertical.offsetWidth - _horizontalWidth)
        _vertical.style.width = `${_body.clientWidth / _body.scrollWidth * 100}%`
        _vertical.style.transform = `translate3d(${left}px, 0, 0)`
        _vertical.setAttribute('data-left', left)
      }
    },

    barMoveStart (e) {
      e.target.classList.add('scroll--bar__active')

      this.mousePos = {
        x: e.pageX,
        y: e.pageY
      }

      this.switch = e.target.getAttribute('role')
      Listener.addListener(window, 'mousemove', this.barMoving)
      Listener.addListener(window, 'mouseup', this.barMoveEnd)
    },

    barMoving (e) {
      if (!this.switch) return

      const _body = this.$refs.body
      const _horizontal = this.$refs.horizontal
      const _vertical = this.$refs.vertical

      // horizontal scroll bar.
      if (this.switch === 'horizontal') {
        const _verticalHeight = _vertical ? _vertical.offsetHeight : 0
        const maxTop = Math.floor(_body.clientHeight - _horizontal.offsetHeight - _verticalHeight)
        const step = e.pageY - this.mousePos.y

        let top = _horizontal.getAttribute('data-top') >> 0
        top = top + step < 0 ? 0 : top + step > maxTop ? maxTop : top + step
        _horizontal.style.transform = `translate3d(0, ${top}px, 0)`
        _horizontal.setAttribute('data-top', top)

        // update scroll body scroll top.
        const scrollTop = top * (_body.scrollHeight - _body.clientHeight) / (_body.clientHeight - _horizontal.offsetHeight - _verticalHeight)
        _body.scrollTop = Math.floor(scrollTop)
      }

      // vertical scroll bar.
      if (this.switch === 'vertical') {
        const _horizontalWidth = _horizontal ? _horizontal.offsetWidth : 0
        const maxLeft = Math.floor(_body.clientWidth - _vertical.offsetWidth - _horizontalWidth)
        const step = e.pageX - this.mousePos.x

        let left = _vertical.getAttribute('data-left') >> 0
        left = left + step < 0 ? 0 : left + step > maxLeft ? maxLeft : left + step
        _vertical.style.transform = `translate3d(${left}px, 0, 0)`
        _vertical.setAttribute('data-left', left)

        // update scroll body scroll left.
        const scrollLeft = left * (_body.scrollWidth - _body.clientWidth) / (_body.clientWidth - _vertical.offsetWidth - _horizontalWidth)
        _body.scrollLeft = Math.floor(scrollLeft)
      }

      this.mousePos = {
        x: e.pageX,
        y: e.pageY
      }
    },

    barMoveEnd (e) {
      this.$refs.horizontal && this.$refs.horizontal.classList.remove('scroll--bar__active')
      this.$refs.vertical && this.$refs.vertical.classList.remove('scroll--bar__active')
      this.switch = false
      this.mousePos = null
      Listener.removeListener(window, 'mousemove', this.barMoving)
      Listener.removeListener(window, 'mouseup', this.barMoveEnd)
    }
  }
}
</script>

<style lang="less">
@import "../../theme.less";
@root: scroll;

.@{root}--wp {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  &.show-type__hover {
    >.@{root}--bar {
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      >.@{root}--bar {
        opacity: 1;
      }
    }
  }

  >.@{root}--body {
    overflow: scroll;
    height: 100%;
    width: 100%;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      width: 16px;
      height: 16px;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, .2);
      border-radius: 4px;
    }
  }

  >.@{root}--bar {
    position: absolute;
    border-radius: @scroll-bar-size / 2;
    cursor: default;
    user-select: none;
    background-color: @scroll-bar-bg;
    transition: background .2s;
    z-index: @z-0;

    &:hover {
      background-color: @scroll-bar-active-bg;
    }

    &.@{root}--bar__horizontal {
      width: @scroll-bar-size;
      min-height: 20px;
      right: 1px;
      top: 0;
    }

    &.@{root}--bar__vertical {
      min-width: 20px;
      height: @scroll-bar-size;
      left: 0;
      bottom: 1px;
    }

    &.@{root}--bar__active {
       opacity: 1;
       background-color: @scroll-bar-active-bg;
    }
  }
}
</style>

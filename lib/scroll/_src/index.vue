<template>
  <div :class='["scroll--wp", {
    "show-type__always": showType === "always",
    "show-type__hover": showType === "hover"
  }]'>
    <div class="scroll--body" ref='body' :style='{
      marginRight: "-" + scrollbar.horizontal.right + "px",
      marginBottom: "-" + scrollbar.vertical.bottom + "px",
      width: body.width,
      height: body.height
    }'>
      <slot></slot>
    </div>

    <!-- 纵向滚动条 -->
    <div v-if='scrollbar.horizontal.visible'
    :class='["scroll--bar scroll--bar__horizontal", {
      "scroll--bar__active": scrollbar.switch === "horizontal"
    }]'
    :style='{
      height: scrollbar.horizontal.height,
      transform: "translate3d(0, " + scrollbar.horizontal.top + "px, 0)"
    }'
    role='horizontal'
    ref='horizontal'
    @mousedown='barMoveStart'
    ></div>

    <!-- 横向滚动条 -->
    <div v-if='scrollbar.vertical.visible'
    :class='["scroll--bar scroll--bar__vertical", {
      "scroll--bar__active": scrollbar.switch === "vertical"
    }]'
    :style='{
      width: scrollbar.vertical.width,
      transform: "translate3d(" + scrollbar.vertical.left + "px, 0, 0)"
    }'
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
      scrollbar: {
        horizontal: {
          visible: false,
          right: 0,
          top: 0,
          height: 0
        },
        vertical: {
          visible: false,
          bottom: 0,
          left: 0,
          width: false
        },
        switch: false
      },
      body: {
        width: null,
        height: null
      },
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
  updated() {
    this.$nextTick(() => {
      this.onResize()
    })
  },
  methods: {
    init () {
      this.updateSize()
      this.$set(this.scrollbar.horizontal, 'top', 0)
      this.$set(this.scrollbar.vertical, 'left', 0)
      this.$refs.body.scrollTop = 0
      this.$refs.body.scrollLeft = 0
    },

    updateSize () {
      const _body = this.$refs.body
      const horizontalSize = _body.offsetWidth - _body.clientWidth
      const verticalSize = _body.offsetHeight - _body.clientHeight

      this.$set(this.scrollbar.horizontal, 'visible', _body.clientHeight !== _body.scrollHeight)
      this.$set(this.scrollbar.horizontal, 'right', horizontalSize)

      this.$set(this.scrollbar.vertical, 'visible', _body.clientWidth !== _body.scrollWidth)
      this.$set(this.scrollbar.vertical, 'bottom', verticalSize)

      this.$set(this.body, 'width', `calc(100% + ${horizontalSize}px)`)
      this.$set(this.body, 'height', `calc(100% + ${verticalSize}px)`)

      this.$set(this.scrollbar.horizontal, 'height', `${_body.clientHeight / _body.scrollHeight * 100}%`)
      this.$set(this.scrollbar.vertical, 'width', `${_body.clientWidth / _body.scrollWidth * 100}%`)
    },

    updatePosition () {
      const _body = this.$refs.body
      const _horizontal = this.$refs.horizontal
      const _vertical = this.$refs.vertical

      if (_horizontal) {
        const _verticalHeight = _vertical ? _vertical.offsetHeight : 0
        const top = _body.scrollTop / (_body.scrollHeight - _body.clientHeight) * (_body.clientHeight - _horizontal.offsetHeight - _verticalHeight)
        this.$set(this.scrollbar.horizontal, 'top', Math.floor(top))
      }

      if (_vertical) {
        const _horizontalWidth = _horizontal ? _horizontal.offsetWidth : 0
        const left = _body.scrollLeft / (_body.scrollWidth - _body.clientWidth) * (_body.clientWidth - _vertical.offsetWidth - _horizontalWidth)
        this.$set(this.scrollbar.vertical, 'left', Math.floor(left))
      }
    },

    onResize () {
      this.updateSize()
    },

    onScroll (e) {
      this.$emit('onScroll', e)

      if (this.scrollbar.switch) return

      this.updatePosition()
    },

    barMoveStart (e) {
      this.mousePos = {
        x: e.pageX,
        y: e.pageY
      }

      this.scrollbar.switch = e.target.getAttribute('role')
      Listener.addListener(window, 'mousemove', this.barMoving)
      Listener.addListener(window, 'mouseup', this.barMoveEnd)
    },

    barMoving (e) {
      if (!this.scrollbar.switch) return

      const _body = this.$refs.body
      const _horizontal = this.$refs.horizontal
      const _vertical = this.$refs.vertical

      // horizontal scroll bar.
      if (this.scrollbar.switch === 'horizontal') {
        const _verticalHeight = _vertical ? _vertical.offsetHeight : 0
        const maxTop = Math.floor(_body.clientHeight - _horizontal.offsetHeight - _verticalHeight)
        const step = e.pageY - this.mousePos.y

        // update horizontal scroll bar position.
        if (this.scrollbar.horizontal.top + step < 0) {
          this.$set(this.scrollbar.horizontal, 'top', 0)
        } else if (this.scrollbar.horizontal.top + step > maxTop) {
          this.$set(this.scrollbar.horizontal, 'top', maxTop)
        } else {
          this.$set(this.scrollbar.horizontal, 'top', this.scrollbar.horizontal.top + step)
        }

        // update scroll body scroll top.
        const scrollTop = this.scrollbar.horizontal.top * (_body.scrollHeight - _body.clientHeight) / (_body.clientHeight - _horizontal.offsetHeight - _verticalHeight)
        _body.scrollTop = Math.floor(scrollTop)
      }

      // vertical scroll bar.
      if (this.scrollbar.switch === 'vertical') {
        const _horizontalWidth = _horizontal ? _horizontal.offsetWidth : 0
        const maxLeft = Math.floor(_body.clientWidth - _vertical.offsetWidth - _horizontalWidth)
        const step = e.pageX - this.mousePos.x

        // update vertical scroll bar position.
        if (this.scrollbar.vertical.left + step < 0) {
          this.$set(this.scrollbar.vertical, 'left', 0)
        } else if (this.scrollbar.vertical.left + step > maxLeft) {
          this.$set(this.scrollbar.vertical, 'left', maxLeft)
        } else {
          this.$set(this.scrollbar.vertical, 'left', this.scrollbar.vertical.left + step)
        }

        // update scroll body scroll left.
        const scrollLeft = this.scrollbar.vertical.left * (_body.scrollWidth - _body.clientWidth) / (_body.clientWidth - _vertical.offsetWidth - _horizontalWidth)
        _body.scrollLeft = Math.floor(scrollLeft)
      }

      this.mousePos = {
        x: e.pageX,
        y: e.pageY
      }
    },
    barMoveEnd (e) {
      this.scrollbar.switch = false
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
  }

  >.@{root}--bar {
    position: absolute;
    border-radius: @scroll-bar-size / 2;
    cursor: default;
    user-select: none;
    background-color: @scroll-bar-bg;
    transition: background .2s;

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

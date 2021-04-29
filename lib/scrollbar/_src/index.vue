<template>
  <section :class="['bee-scrollbar', {
    'show-type__hover': showType === 'hover'
  }]">
    <div ref='body' class="bee-scrollbar--body" @scroll="onscroll">
      <slot></slot>
    </div>

    <section
      ref='horizontal'
      class="scrollbar horizontal"
      data-type='horizontal'
      @mousedown="simulateDrag"
    ></section>

    <section
      ref='vertical'
      class="scrollbar vertical"
      data-type='vertical'
      @mousedown="simulateDrag"
    ></section>
  </section>
</template>

<script>
import Listener from '../../utils/listener'

export default {
  name: 'BeeScrollbar',
  props: {
    showType: {
      type: String,
      validator: function (value) {
        return /^(always|hover)$/.test(value)
      },
      default: 'always'
    },
    scrollElement: null
  },
  data () {
    return {
      scrollbarMinSize: 20
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.updated()
      this.$listeners['update:scrollElement'] && this.$emit('update:scrollElement', this.$refs.body)
    })

    Listener.addListener(window, 'resize', this.onResize)
  },
  updated () {
    this.$nextTick(() => {
      this.updated()
    })
  },
  beforeDestroy () {
    Listener.removeListener(window, 'resize', this.onResize)
  },
  methods: {
    onResize () {
      if (this._timeout) clearTimeout(this._timeout)

      this._timeout = window.setTimeout(() => {
        this.updated()
        this.$listeners.resize && this.$listeners.resize()
      }, 50)
    },

    updated () {
      this.updateBodySize()
      this.updateBar()
    },

    /**
     * compatible with previous versions
     */
    updateSizeConfig () {
      this.updateBar()
    },

    onscroll (e) {
      this.updateBar()

      if (this.$listeners.scroll) {
        this.$listeners.scroll(e)
      }
    },

    updateBodySize () {
      if (!this.$refs.body) return

      const _scrollElement = this.$refs.body
      const horizontalBarWidth = (_scrollElement.offsetWidth - _scrollElement.clientWidth) + 2
      const verticalBarHeight = (_scrollElement.offsetHeight - _scrollElement.clientHeight) + 2
      let style = _scrollElement.getAttribute('style') || ''
      _scrollElement.setAttribute('style', this.updateStyle(style, {
        'width': `calc(100% + ${horizontalBarWidth}px)`,
        'height': `calc(100% + ${verticalBarHeight}px)`,
        'margin-bottom': `-${verticalBarHeight}px`,
        'margin-right': `-${horizontalBarWidth}px`
      }))
    },

    updateBar () {
      if (!this.$refs.body) return

      const _scrollElement = this.$refs.body

      // visible
      const _horizontalVisible = _scrollElement.clientHeight < _scrollElement.scrollHeight
      const _verticalVisible = _scrollElement.clientWidth < _scrollElement.scrollWidth

      /**
       * horizontal bar size
       *
       *  horizontal.top + horizontal.height        wrap.clientHeight - vertical.offsetHeight
       * ———————————————————————————————————— = ——————————————————————————————————————————————
       *  wrap.scrollTop + wrap.clientHeight                  wrap.scrollHeight
       */
      if (_horizontalVisible) {
        const _verticalHeight = _verticalVisible ? this.$refs.vertical.offsetHeight : 0

        const _horizontalHeight = Math.max(
          this.scrollbarMinSize,
          _scrollElement.clientHeight / _scrollElement.scrollHeight * (_scrollElement.clientHeight - _verticalHeight)
        )

        const _horizontalTop = (_scrollElement.clientHeight - _verticalHeight) *
          (_scrollElement.scrollTop + _scrollElement.clientHeight) / _scrollElement.scrollHeight -
          _horizontalHeight

        this.updateHorizontalBar(_horizontalVisible, parseInt(_horizontalHeight), _horizontalTop)
      } else {
        this.updateHorizontalBar(_horizontalVisible, 0, 0)
      }

      /**
       * vertical bar size
       *
       *    vertical.left + vertical.width            wrap.clientWidth - horizontal.offsetWidth
       * ———————————————————————————————————————— = ——————————————————————————————————————————————
       *   wrap.scrollLeft + wrap.clientWidth                 wrap.scrollWidth
       */
      if (_verticalVisible) {
        const _horizontalWidth = _horizontalVisible ? this.$refs.horizontal.offsetWidth : 0

        const _verticalWidth = Math.max(
          this.scrollbarMinSize,
          _scrollElement.clientWidth / _scrollElement.scrollWidth * (_scrollElement.clientWidth - _horizontalWidth)
        )

        const _verticalLeft = (_scrollElement.clientWidth - _horizontalWidth) *
          (_scrollElement.scrollLeft + _scrollElement.clientWidth) / _scrollElement.scrollWidth -
          _verticalWidth

        this.updateVerticalBar(_verticalVisible, parseInt(_verticalWidth), _verticalLeft)
      } else {
        this.updateVerticalBar(_verticalVisible, 0, 0)
      }
    },

    updateHorizontalBar (visible, height, top) {
      if (!this.$refs.horizontal) return null

      const horizontal = this.$refs.horizontal
      let style = horizontal.getAttribute('style') || ''

      style = this.updateStyle(style, {
        display: visible ? 'block' : 'none',
        height: `${height}px`,
        top: `${top}px`
      })

      horizontal.setAttribute('style', style)
    },

    updateVerticalBar (visible, width, left) {
      if (!this.$refs.vertical) return null

      const vertical = this.$refs.vertical
      let style = vertical.getAttribute('style') || ''

      style = this.updateStyle(style, {
        display: visible ? 'block' : 'none',
        width: `${width}px`,
        left: `${left}px`
      })

      vertical.setAttribute('style', style)
    },

    updateStyle (style, attributes) {
      for (let key in attributes) {
        const attribute = attributes[key]
        const reg = new RegExp(`${key}.*?;`)

        if (reg.test(style)) {
          // update
          const attr = attribute ? `${key}: ${attributes[key]};` : ''
          style = style.replace(reg, attr)
        } else {
          // append
          if (attribute) {
            style += `${key}: ${attributes[key]};`
          }
        }
      }

      return style
    },

    simulateDrag (e) {
      switch (e.target.dataset.type) {
        case 'horizontal':
          this._touch = {
            y: e.pageY,
            top: parseInt(this.$refs.horizontal.style.top)
          }
          break
        case 'vertical':
          this._touch = {
            x: e.pageX,
            left: parseInt(this.$refs.vertical.style.left)
          }
          break
      }
      e.target.classList.add('scrollbar__active')
      this.$el.classList.add('scrollbar__moving')
      Listener.addListener(window, 'mousemove', this.simulatedDragMove)
      Listener.addListener(window, 'mouseup', this.simulatedDragEnd)
    },

    simulatedDragMove (e) {
      const scrollElement = this.$refs.body
      const horizontal = this.$refs.horizontal
      const vertical = this.$refs.vertical

      // visible
      const horizontalVisible = scrollElement.clientHeight < scrollElement.scrollHeight
      const verticalVisible = scrollElement.clientWidth < scrollElement.scrollWidth

      if (this._touch.x !== undefined) {
        let left = this._touch.left + (e.pageX - this._touch.x)
        let maxAvailableWidth = scrollElement.clientWidth

        if (horizontalVisible) {
          maxAvailableWidth -= horizontal.offsetWidth
        }

        left = Math.max(Math.min(maxAvailableWidth - vertical.offsetWidth, left), 0)
        scrollElement.scrollLeft = left / maxAvailableWidth * scrollElement.scrollWidth
        vertical.style.left = `${left}px`
      } else if (this._touch.y !== undefined) {
        let top = this._touch.top + (e.pageY - this._touch.y)
        let maxAvailableHeight = scrollElement.clientHeight

        if (verticalVisible) {
          maxAvailableHeight -= vertical.offsetHeight
        }

        top = Math.max(Math.min((maxAvailableHeight - horizontal.offsetHeight), top), 0)
        scrollElement.scrollTop = top / maxAvailableHeight * scrollElement.scrollHeight
        horizontal.style.top = `${top}px`
      }
    },

    simulatedDragEnd () {
      if (this._touch.x !== undefined) {
        this.$refs.vertical.classList.remove('scrollbar__active')
      } else if (this._touch.y !== undefined) {
        this.$refs.horizontal.classList.remove('scrollbar__active')
      }

      this._touch = null
      this.$el.classList.remove('scrollbar__moving')
      Listener.removeListener(window, 'mousemove', this.simulatedDragMove)
      Listener.removeListener(window, 'mouseup', this.simulatedDragEnd)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

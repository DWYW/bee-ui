<template>
  <section :class="['bee-scrollbar', {
    'show-type__hover': showType === 'hover'
  }]">
    <div class="bee-scrollbar--body" :style='bodyStyle' ref='body' @scroll="onscroll">
      <slot></slot>
    </div>

    <section v-show='horizontal.enabled'
      class="scrollbar horizontal"
      data-type='horizontal'
      ref='horizontal'
      :style='horizontalScrollbarStyle'
      @mousedown="handleStart"
    ></section>

    <section v-show='vertical.enabled'
      class="scrollbar vertical"
      data-type='vertical'
      ref='vertical'
      :style='verticalScrollbarStyle'
      @mousedown="handleStart"
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
        return ['always', 'hover'].indexOf(value) >= 0
      },
      default: 'always'
    },
    scrollElement: null
  },
  data () {
    return {
      horizontal: {
        enabled: false,
        height: 0,
        top: 0,
        size: 0
      },
      vertical: {
        enabled: false,
        width: 0,
        left: 0,
        size: 0
      }
    }
  },
  computed: {
    scrollbarMinSize () {
      return 20
    },

    scrollbarMaxSize () {
      return (type) => {
        let size = 0

        switch (type) {
          case 'horizontal':
            size = this.$refs.body.clientHeight

            if (this.vertical.enabled) {
              size -= (this.$refs.vertical.offsetHeight || 0)
            }

            break
          case 'vertical':
            size = this.$refs.body.clientWidth

            if (this.horizontal.enabled) {
              size -= (this.$refs.horizontal.offsetWidth || 0)
            }

            break
        }

        return size
      }
    },

    bodyStyle () {
      return `
      width: calc(100% + ${this.horizontal.size}px);
      margin-right: -${this.horizontal.size}px;
      height: calc(100% + ${this.vertical.size}px);
      margin-bottom: -${this.vertical.size}px;`
    },
    horizontalScrollbarStyle () {
      return `
        height: ${this.horizontal.height}px;
        transform: translate3d(0, ${this.horizontal.top}px, 0);
      `
    },
    verticalScrollbarStyle () {
      return `
        width: ${this.vertical.width}px;
        transform: translate3d(${this.vertical.left}px, 0, 0);
      `
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.updateSizeConfig()

      if (this.$listeners['update:scrollElement']) {
        this.$listeners['update:scrollElement'](this.$refs.body)
      }

      Listener.addListener(window, 'resize', this.onResize)
    })
  },
  beforeDestroy () {
    Listener.removeListener(window, 'resize', this.onResize)
  },
  methods: {
    onResize () {
      if (this._timeout) clearTimeout(this._timeout)

      this._timeout = window.setTimeout(() => {
        this.updateSizeConfig()
        this.$listeners.resize && this.$listeners.resize()
      }, 50)
    },

    onscroll (e) {
      this.updateSizeConfig()

      if (this.$listeners.scroll) {
        this.$listeners.scroll(e)
      }
    },

    updateSizeConfig () {
      const wrap = this.$refs.body

      // horizontal
      this.horizontal.enabled = wrap.scrollHeight !== wrap.clientHeight
      this.horizontal.size = Math.ceil(wrap.offsetWidth - wrap.clientWidth)

      // vertical
      this.vertical.enabled = wrap.scrollWidth !== wrap.clientWidth
      this.vertical.size = Math.ceil(wrap.offsetHeight - wrap.clientHeight)

      if (this.horizontal.enabled) {
        const _heigth = Math.floor(wrap.clientHeight / wrap.scrollHeight * this.scrollbarMaxSize('horizontal'))
        this.horizontal.height = Math.max(_heigth, this.scrollbarMinSize)

        /**
         *  horizontal.top + horizontal.height        wrap.clientHeight - vertical.offsetHeight
         * ———————————————————————————————————— = ——————————————————————————————————————————————
         *  wrap.scrollTop + wrap.clientHeight                  wrap.scrollHeight
         */
        const _verticalHeight = this.$refs.vertical.offsetHeight || 0
        this.horizontal.top = (wrap.clientHeight - _verticalHeight) * (wrap.scrollTop + wrap.clientHeight) / wrap.scrollHeight - this.horizontal.height
      }

      if (this.vertical.enabled) {
        const _width = Math.floor(wrap.clientWidth / wrap.scrollWidth * this.scrollbarMaxSize('vertical'))
        this.vertical.width = Math.max(_width, this.scrollbarMinSize)

        /**
         *    vertical.left + vertical.width            wrap.clientWidth - horizontal.offsetWidth
         * ———————————————————————————————————————— = ——————————————————————————————————————————————
         *   wrap.scrollLeft + wrap.clientWidth                 wrap.scrollWidth
         */
        const _horizontalWidth = this.$refs.horizontal.offsetWidth || 0
        this.vertical.left = (wrap.clientWidth - _horizontalWidth) * (wrap.scrollLeft + wrap.clientWidth) / wrap.scrollWidth - this.vertical.width
      }
    },

    handleStart (e) {
      switch (e.target.dataset.type) {
        case 'horizontal':
          this._touch = {
            y: e.pageY,
            top: this.horizontal.top
          }

          break
        case 'vertical':
          this._touch = {
            x: e.pageX,
            left: this.vertical.left
          }

          break
      }

      e.target.classList.add('scrollbar__active')
      this.$el.classList.add('scrollbar__moving')
      Listener.addListener(window, 'mousemove', this.handleMove)
      Listener.addListener(window, 'mouseup', this.handleEnd)
    },

    handleMove (e) {
      const scrollWrap = this.$refs.body

      if (this._touch.x !== undefined) {
        let left = this._touch.left + (e.pageX - this._touch.x)
        let verticalMax = this.scrollbarMaxSize('vertical')

        if (left < 0) {
          left = 0
        } else if (left + this.vertical.width > verticalMax) {
          left = verticalMax - this.vertical.width
        }

        scrollWrap.scrollLeft = left / verticalMax * scrollWrap.scrollWidth
        this.horizontal.left = left
      } else if (this._touch.y !== undefined) {
        let top = this._touch.top + (e.pageY - this._touch.y)
        let horizontalMax = this.scrollbarMaxSize('horizontal')

        if (top < 0) {
          top = 0
        } else if (top + this.horizontal.height > horizontalMax) {
          top = horizontalMax - this.horizontal.height
        }

        scrollWrap.scrollTop = top / horizontalMax * scrollWrap.scrollHeight
        this.horizontal.top = top
      }
    },

    handleEnd () {
      if (this._touch.x !== undefined) {
        this.$refs.vertical.classList.remove('scrollbar__active')
      } else if (this._touch.y !== undefined) {
        this.$refs.horizontal.classList.remove('scrollbar__active')
      }

      this._touch = null
      this.$el.classList.remove('scrollbar__moving')
      Listener.removeListener(window, 'mousemove', this.handleMove)
      Listener.removeListener(window, 'mouseup', this.handleEnd)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

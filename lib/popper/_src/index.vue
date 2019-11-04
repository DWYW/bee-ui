<template>
  <transition name="bee-popper"
    @before-enter='beforeEnter'
    @after-enter='afterEnter'
    @before-leave='beforeLeave'
    @after-leave='afterLeave'
  >
    <section class="bee-popper" v-show="value" ref='wrap' :placement='placement'>
      <div class="bee-popper--arrow" v-if='arrow' ref='arrow'></div>
      <div class="bee-popper--body">
        <slot></slot>
      </div>
    </section>
  </transition>
</template>

<script>
import Listener from '../../utils/listener'
import helpers from '../../utils/helpers'

const PLACEMENT = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
  CENTER: 'center'
}

const ALIGN = {
  AUTO: 'auto',
  START: 'start',
  CENTER: 'center',
  END: 'end'
}

export default {
  name: 'BeePopper',
  props: {
    scrollParent: Element,
    reference: {
      type: Element,
      required: true
    },
    position: {
      type: String,
      default: 'auto'
    },
    distance: {
      type: Number,
      default: 6
    },
    arrow: {
      type: Boolean,
      default: true
    },
    value: Boolean
  },
  data () {
    return {
      placement: null
    }
  },
  methods: {
    beforeEnter (el) {
      this.$nextTick(() => {
        this.updatePosition()
      })

      if (this.scrollParent) {
        Listener.addListener(this.scrollParent, 'scroll', this.updatePosition)
      }

      this.$listeners.beforeEnter && this.$listeners.beforeEnter(el)
    },

    afterEnter (el) {
      this.$listeners.afterEnter && this.$listeners.afterEnter(el)
    },

    afterLeave (el) {
      if (this.scrollParent) {
        Listener.removeListener(this.scrollParent, 'scroll', this.updatePosition)
      }

      this.$listeners.afterLeave && this.$listeners.afterLeave(el)
    },

    beforeLeave (el) {
      this.$listeners.beforeLeave && this.$listeners.beforeLeave(el)
    },

    updatePosition () {
      if (!this.value) return false

      if (this.position === 'auto') {
        const _placement = this.getPlacement(this.scrollParent, this.reference, this.$el)

        if (_placement !== this.placement) {
          this.placement = _placement
        }

        const popperStyle = this.getPopperStyle(this.scrollParent, this.reference, this.$el)
        this.$refs.wrap.style = `left: ${popperStyle.left}px; top: ${popperStyle.top}px;`
        this.setArrowStyle(popperStyle)
      } else {
        this.placement = this.position
        const popperStyle = this.getPopperStyle(this.scrollParent, this.reference, this.$el)
        this.$refs.wrap.style = `left: ${popperStyle.left}px; top: ${popperStyle.top}px;`
        this.setArrowStyle(popperStyle)
      }
    },

    getPlacement (clip, reference, popper) {
      const _popper = popper.getBoundingClientRect()
      const _reference = reference.getBoundingClientRect()
      const _clip = clip.getBoundingClientRect()

      if (
        /bottom|auto/.test(this.position) &&
        clip.clientHeight - (_reference.top - _clip.top) - _reference.height - this.distance >= _popper.height
      ) {
        return PLACEMENT.BOTTOM
      }

      if (
        /top|auto/.test(this.position) &&
        (_reference.top - _clip.top) - this.distance >= _popper.height
      ) {
        return PLACEMENT.TOP
      }

      if (
        /left|auto/.test(this.position) &&
        (_reference.left - _clip.left) >= _popper.width + this.distance
      ) {
        return PLACEMENT.LEFT
      }

      if (
        /right|auto/.test(this.position) &&
        clip.clientWidth - (_reference.left - _clip.left) >= _popper.width + _reference.width + this.distance
      ) {
        return PLACEMENT.RIGHT
      }

      if (clip.nodeType === 1 && clip.nodeName !== 'BODY') {
        return this.getPlacement(document.body, reference, popper)
      }

      return PLACEMENT.CENTER
    },

    getPopperStyleLeft (clip, reference, popper) {
      const _popper = popper.getBoundingClientRect()
      const _reference = reference.getBoundingClientRect()
      const _clip = clip.getBoundingClientRect()
      const arrow = this.$refs.arrow
      const arrowWidth = parseInt(helpers.getCss(arrow, 'border-width')) || 0

      return {
        [ALIGN.AUTO]: function () {
          let _left = 0

          if (clip.clientWidth - (_reference.left - _clip.left) >= _popper.width) {
            _left = this[ALIGN.START]()

            if (_left < _clip.left) {
              if (_left + _reference.width >= _clip.left + arrowWidth * 2) {
                _left = _clip.left
              } else {
                _left = _left + _reference.width - arrowWidth * 2
              }
            }
          } else {
            _left = _clip.left + clip.clientWidth - _popper.width

            if (_reference.left > _clip.left + clip.clientWidth - arrowWidth * 2) {
              _left = _reference.left + arrowWidth * 2 - _popper.width
            }
          }

          return _left
        },

        [ALIGN.START]: function () {
          return _reference.left
        },

        [ALIGN.CENTER]: function () {
          return _reference.left + (_reference.width - _popper.width) / 2
        },

        [ALIGN.END]: function () {
          return _reference.left + _reference.width - _popper.width
        }
      }
    },

    getPopperStyleTop (clip, reference, popper) {
      const _popper = popper.getBoundingClientRect()
      const _reference = reference.getBoundingClientRect()
      const _clip = clip.getBoundingClientRect()

      return {
        [ALIGN.AUTO]: function () {
          let _top = 0

          if (clip.clientHeight - (_reference.top - _clip.top) >= _popper.height) {
            _top = this[ALIGN.START]()
          } else {
            _top = clip.clientHeight - _popper.height + _clip.top
          }

          if (_top + _popper.height < _reference.top + _reference.height) {
            _top = this[ALIGN.END]()
          }

          return _top
        },
        [ALIGN.START]: function () {
          return _reference.top
        },

        [ALIGN.CENTER]: function () {
          return _reference.top + (_reference.height - _popper.height) / 2
        },

        [ALIGN.END]: function () {
          return _reference.top + _reference.height - _popper.height
        }
      }
    },

    getPopperStyle (clip, reference, popper) {
      const _popper = popper.getBoundingClientRect()
      const _reference = reference.getBoundingClientRect()
      let top = 0
      let left = 0

      if (this.placement.indexOf(PLACEMENT.TOP) > -1 || this.placement.indexOf(PLACEMENT.BOTTOM) > -1) {
        const leftType = (this.position.indexOf(ALIGN.AUTO) > -1 && ALIGN.AUTO) ||
          (this.position.indexOf(ALIGN.START) > -1 && ALIGN.START) ||
          (this.position.indexOf(ALIGN.END) > -1 && ALIGN.END) ||
          ALIGN.CENTER
        left = this.getPopperStyleLeft(...arguments)[leftType]()

        if (this.placement.indexOf(PLACEMENT.TOP) > -1) {
          top = _reference.top - _popper.height - this.distance
        } else {
          top = _reference.top + _reference.height + this.distance
        }
      } else if (this.placement.indexOf(PLACEMENT.LEFT) > -1 || this.placement.indexOf(PLACEMENT.RIGHT) > -1) {
        const topType = (this.position.indexOf(ALIGN.AUTO) > -1 && ALIGN.AUTO) ||
          (this.position.indexOf(ALIGN.START) > -1 && ALIGN.START) ||
          (this.position.indexOf(ALIGN.END) > -1 && ALIGN.END) ||
          ALIGN.CENTER
        top = this.getPopperStyleTop(...arguments)[topType]()

        if (this.placement.indexOf(PLACEMENT.LEFT) > -1) {
          left = _reference.left - _popper.width - this.distance
        } else {
          left = _reference.left + _reference.width + this.distance
        }
      }

      return { left, top }
    },

    setArrowStyle (popperStyle) {
      if (!this.$refs.arrow) return false

      const arrow = this.$refs.arrow
      const _reference = this.reference.getBoundingClientRect()
      const _popper = this.$el.getBoundingClientRect()
      const arrowWidth = parseInt(helpers.getCss(arrow, 'border-width')) || 0
      let left = 0
      let top = 0

      if (this.placement.indexOf(PLACEMENT.LEFT) > -1 || this.placement.indexOf(PLACEMENT.RIGHT) > -1) {
        top = _reference.top - popperStyle.top + _reference.height / 2 - arrowWidth
        arrow.setAttribute('style', `top: ${Math.max(top, arrowWidth)}px`)
      } else if (this.placement.indexOf(PLACEMENT.TOP) > -1 || this.placement.indexOf(PLACEMENT.BOTTOM) > -1) {
        left = _reference.left - popperStyle.left + Math.min(_reference.width, _popper.width) / 2 - arrowWidth

        if (left + arrowWidth * 3 > _popper.width) {
          left = _popper.width - arrowWidth * 3
        }

        arrow.setAttribute('style', `left: ${Math.max(left, arrowWidth)}px`)
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

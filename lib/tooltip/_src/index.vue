<template>
  <div class="bee-tooltip">
    <slot>
      <bee-icon icon='info'></bee-icon>
    </slot>
  </div>
</template>

<script>
import Vue from 'vue'
import TooltipContent from './content.vue'
import Listeners from '../../utils/listener'
import getScrollParent from '../../utils/getScrollParent'

const ContentConstructor = Vue.extend(TooltipContent)

export default {
  name: 'BeeTooltip',
  props: {
    type: {
      type: String,
      validator: function (value) {
        return ['hover', 'active'].indexOf(value) > -1
      },
      default: 'hover'
    },
    position: {
      type: String,
      validator: function (value) {
        return /^(top|bottom|right|left)(\s+(start|end))?$/.test(value)
      },
      default: 'top'
    },
    content: String,
    theme: {
      type: String,
      validator: function (value) {
        return /^dark|light$/.test(value)
      },
      default: 'dark'
    }
  },
  data () {
    return {}
  },
  computed: {
    scrollParent () {
      return getScrollParent(this.$el)
    }
  },
  mounted () {
    if (this.type) {
      Listeners.addListener(this.$el, 'mouseenter', this.contentShow)
      Listeners.addListener(this.$el, 'mouseleave', this.contentHide)
    }
  },
  beforeDestroy () {
    if (this.type) {
      Listeners.removeListener(this.$el, 'mouseenter', this.contentShow)
      Listeners.removeListener(this.$el, 'mouseleave', this.contentHide)
    }
  },
  methods: {
    contentShow () {
      const _data = () => {
        return {
          theme: this.theme,
          content: this.content,
          position: this.position,
          scrollParent: this.scrollParent,
          reference: this.$el
        }
      }

      this._popperInstance = new ContentConstructor({
        data: _data
      }).$mount()
    },

    contentHide () {
      if (!this._popperInstance) return

      this._popperInstance.open = false
      this._popperInstance = null
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>

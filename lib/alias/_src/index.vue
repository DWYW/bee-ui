<template>
  <section :class="['bee-alias', {
    'bee-alias_focus': toggle
  }]">
    <div class="alias-name" @click='optionToggle'>
      <span v-if='value'>{{value}}</span>
      <span class="placeholder" v-else>{{placeholder}}</span>
    </div>

    <bee-icon class="remove-button"
      v-show='value'
      icon='error'
      @click.stop="removeSelected"
    ></bee-icon>
  </section>
</template>

<script>
import Vue from 'vue'
import SelectOptions from './select-options.vue'
import Listener from '../../utils/listener'
import getScrollParent from '../../utils/getScrollParent'
import helpers from '../../utils/helpers'

const OptionsConstructor = Vue.extend(SelectOptions)

export default {
  name: 'bee-alias',
  props: {
    options: Array,
    optionKey: {
      type: String,
      default: ''
    },
    placeholder: String,
    maxWidth: {
      type: String,
      default: '300px'
    },
    minHeight: {
      type: String,
      default: '60px'
    },
    value: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      toggle: false
    }
  },
  computed: {
    scrollParent () {
      return getScrollParent(this.$el)
    }
  },
  methods: {
    optionToggle (e) {
      if (this.toggle && !helpers.isNodeChild(e.target, this._optionsInstance.$el)) {
        this.hide()
        return
      }

      if (!this.toggle) {
        this.show()
      }
    },
    show () {
      this.toggle = true
      const _data = () => {
        return {
          selected: this.value,
          options: this.options,
          optionKey: this.optionKey,
          maxWidth: this.maxWidth,
          minWidth: this.$el.offsetWidth + 'px',
          minHeight: this.minHeight,
          scrollParent: this.scrollParent,
          reference: this.$el,
          onSelected: this.onSelected
        }
      }

      const _beforeEnter = () => {
        setTimeout(() => {
          Listener.addListener(window, 'click', this.optionToggle)
        })
      }

      this._optionsInstance = new OptionsConstructor({
        data: _data,
        methods: {
          beforeEnter: _beforeEnter,
          getValue: this.getValue
        }
      }).$mount()
    },

    hide () {
      this.toggle = false
      this._optionsInstance.open = false
      Listener.removeListener(window, 'click', this.optionToggle)
    },

    getValue (data) {
      if (this.optionKey) {
        return helpers.getValueByPath(data, this.optionKey)
      }

      return data
    },

    onSelected (data) {
      const _value = helpers.deepCopy(this.getValue(data))

      if (helpers.equal(_value, this.value)) return

      this.hide()
      this.$listeners.input && this.$listeners.input(_value)
      this.$listeners.change && this.$listeners.change(_value)
    },

    removeSelected () {
      if (!this.value) return

      // emit
      this.$listeners.input && this.$listeners.input('')
      this.$listeners.change && this.$listeners.change('')

      if (!this.toggle || !this._optionsInstance) return

      // if options show
      this._optionsInstance.selected = ''
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

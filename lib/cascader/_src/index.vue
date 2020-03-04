<template>
  <section :class="['bee-cascader', {
    'bee-cascader__disabled': disabled
  }]" @click="toggleOptions">
    <section class="selected--label">
      <template v-if="label">{{label}}</template>
      <span class="placeholder" v-else>{{placeholder}}</span>
    </section>
    <bee-icon class="bee-cascader--icon" icon='arr-down'></bee-icon>
  </section>
</template>

<script>
import Vue from 'vue'
import CascaderOptions from './options.vue'
import Listener from '../../utils/listener'
import helpers from '../../utils/helpers'
import getScrollParent from '../../utils/getScrollParent'

const OptionsConstructor = Vue.extend(CascaderOptions)

export default {
  name: 'BeeCascader',
  props: {
    data: Array,
    placeholder: String,
    labelFormat: Function,
    disabled: Boolean,
    optionKey: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value',
        disabled: 'disabled'
      })
    },
    joinText: {
      type: String,
      default: '>'
    },
    type: {
      type: String,
      validator: function (value) {
        return /^(last|every)$/.test(value)
      },
      default: 'last'
    },
    value: Array
  },
  data () {
    return {
      isShow: false,
      selected: this.value || []
    }
  },
  computed: {
    scrollParent () {
      return getScrollParent(this.$el)
    },
    label () {
      let text = ''

      // If custom processing exists and has a value, return the custom value.
      if (this.labelFormat) {
        text = this.labelFormat(this.selected)

        if (text) {
          return text.toString()
        }
      }

      let i = 0
      let data = this.data
      let selectItem = this.selected[i++]
      text = []

      while (data && selectItem) {
        const _item = data.find(v => this.getItemValue(v) === selectItem)

        if (!_item) break

        text.push(this.getItemLabel(_item))
        data = _item.children
        selectItem = this.selected[i++]
      }

      return text.join(this.joinText)
    }
  },
  methods: {
    getItemLabel (data) {
      return helpers.getValueByPath(data, this.optionKey.label)
    },
    getItemValue (data) {
      return helpers.getValueByPath(data, this.optionKey.value)
    },
    getItemDisabled (data) {
      return helpers.getValueByPath(data, this.optionKey.disabled)
    },
    toggleOptions (e) {
      if (this.disabled) return

      if (this._optionsInstance && this.targetInOption(e.target)) return

      this.isShow ? this.hideOption() : this.showOption()
    },
    targetInOption (element) {
      let parent = element

      while (parent) {
        if (this._optionsInstance.$el === parent) {
          break
        }

        parent = parent.parentNode
      }

      return parent !== null
    },
    showOption () {
      this.$listeners.beforeOpen && this.$listeners.beforeOpen()

      const constructorOptions = {
        data: {
          reference: this.$el,
          scrollParent: this.scrollParent,
          options: this.data,
          optionKey: this.optionKey,
          selected: this.selected || [],
          type: this.type
        },
        methods: {
          _beforeEnter: () => {
            setTimeout(() => {
              // Add global event.
              Listener.addListener(window, 'click', this.toggleOptions)
            })
          },
          _afterLeave: () => {
            this.$listeners.closed && this.$listeners.closed()
          },
          onPick: this.onPick,
          getItemLabel: this.getItemLabel,
          getItemValue: this.getItemValue,
          getItemDisabled: this.getItemDisabled
        }
      }

      this._optionsInstance = new OptionsConstructor(constructorOptions).$mount()
      this.isShow = true
    },
    hideOption () {
      if (this._optionsInstance) {
        this._optionsInstance.open = false
      }

      this.isShow = false
      // Remove global event.
      Listener.removeListener(window, 'click', this.toggleOptions)
    },

    onPick (value, hide = true) {
      hide && this.hideOption()
      this.$listeners.input && this.$listeners.input(value)

      if (!helpers.equal(value, this.selected)) {
        this.selected = value
        this.$listeners.change && this.$listeners.change(value)
      }
    }
  },
  watch: {
    value: function (value) {
      if (!helpers.equal(value, this.selected)) {
        this.selected = value
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

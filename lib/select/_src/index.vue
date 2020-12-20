<template>
  <section :class="['bee-select', {
    'bee-select__multiple': this.multiple,
    'bee-select__disabled': this.disabled
  }]" @click='toggleOptions'>
    <section class="bee-select--body">
      <!-- multiple mode -->
      <template v-if='multiple'>
        <span class="placeholder" v-if='values.length === 0'>{{placeholder}}</span>

        <span class="bee-select--item" v-for='(item, key) in values' :key='key'>
          <span>{{item[1]}}</span>
          <bee-icon class='bee-remove--button' icon='error' @click.stop='removeSelectedItem(key)'></bee-icon>
        </span>
      </template>

      <!-- single mode -->
      <template v-else>
        <span class="placeholder" v-if='values.length === 0 && !keyword'>{{placeholder}}</span>

        <span v-if='searchDisabled' class="bee-selected--label">{{selectedLabel}}</span>

        <!-- open search -->
        <input v-else
          class="bee-search--input"
          type="text"
          ref='search'
          :disabled="disabled"
          :readonly='readonly'
          v-model.trim='keyword'
        >
      </template>
    </section>
    <bee-icon class="bee-select--icon" icon='arr-down'></bee-icon>
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
  name: 'BeeSelect',
  props: {
    value: null,
    options: {
      type: Array,
      required: true
    },
    optionKey: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value'
        }
      }
    },
    type: {
      type: String,
      default: 'auto'
    },
    placeholder: String,
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    searchLength: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      readonly: true,
      values: [],
      keyword: '',
      toggle: false
    }
  },
  computed: {
    scrollParent () {
      return getScrollParent(this.$el)
    },

    searchDisabled () {
      if (this.multiple) return true

      if (this.type === 'search') return false

      return this.type === 'auto' && this.options.length < this.searchLength
    },

    selectedLabel () {
      return helpers.getValueByPath(this.values, '[0][1]')
    }
  },
  mounted () {
    if (this.value !== undefined && this.value !== null) {
      this.valuesInit()
    }
  },
  methods: {
    targetInOptions (e) {
      let target = e ? e.target : null

      while (target) {
        if (target !== this._optionsInstance.$el) {
          target = target.parentNode
          continue
        }

        break
      }

      return target
    },

    toggleOptions (e) {
      if (this.disabled) return

      if (this.toggle && !this.targetInOptions(e)) {
        this.hideOptions(e)
        return
      }

      if (!this.toggle) {
        this.showOptions(e)
      }
    },

    showOptions () {
      this.toggle = true

      const _data = () => {
        return {
          selected: helpers.deepCopy(this.values),
          options: this.options,
          optionKey: this.optionKey,
          multiple: this.multiple,
          minWidth: this.$el.offsetWidth,
          scrollParent: this.scrollParent,
          reference: this.$el,
          onSelected: this.onSelected
        }
      }

      const _beforeEnter = () => {
        // if the search function be enabled, the input value is auto selected.
        if (!this.searchDisabled) {
          this.readonly = false
          this.$refs.search.focus()
          this.$refs.search.select()
        }

        setTimeout(() => {
          Listener.addListener(window, 'click', this.toggleOptions)
        })
      }

      this._optionsInstance = new OptionsConstructor({
        data: _data,
        methods: {
          beforeEnter: _beforeEnter
        }
      }).$mount()
    },

    hideOptions () {
      if (!this.searchDisabled) {
        // if the search function be enabled, the input will be readonly.
        this.readonly = true

        // if the search function be used and nothing selected, to restore the label.
        if (this.value && !this.values.find(item => item && item[1] === this.keyword)) {
          this.keyword = helpers.getValueByPath(this.values, '[0][1]', '')
        }
      }

      this.toggle = false
      this._optionsInstance.open = false
      Listener.removeListener(window, 'click', this.toggleOptions)
    },

    onSelected (data) {
      if (!this.multiple && this._optionsInstance && this._optionsInstance.open) {
        this.hideOptions()
      }

      // If the value to equal old vlaueo or undefined, break after.
      // When the length of the this.options is 0, the data will be undefined.
      if (!data || helpers.equal(data, this.values)) return

      this.updateSelected(helpers.deepCopy(data), true)
    },

    updateSelected (data, emit) {
      this.values = data
      let _value = null

      if (this.multiple) {
        // resolve the options position error by reference resize.
        if (this._optionsInstance && this._optionsInstance.open) {
          this.$nextTick(() => {
            this._optionsInstance.$refs.popper.updatePosition()
          })
        }

        _value = data.map(item => item[0])
      } else {
        _value = helpers.getValueByPath(data, '[0][0]')

        if (!this.searchDisabled) {
          this.keyword = helpers.getValueByPath(data, '[0][1]')
        }
      }

      if (!emit) return

      // Emit evetns.
      const events = ['input', 'change']

      events.forEach((eventName) => {
        if (this.$listeners[eventName]) {
          this.$listeners[eventName](_value)
        }
      })
    },

    valuesInit () {
      const data = helpers.typeof(this.value) !== 'array' ? [this.value] : this.value

      const values = this.options.reduce((acc, item) => {
        const _value = helpers.getValueByPath(item, this.optionKey.value)
        const _label = helpers.getValueByPath(item, this.optionKey.label)

        if (data.indexOf(_value) > -1) {
          acc.push([_value, _label])
        }

        return acc
      }, [])

      // If value is defined and can not find in options, emit events.
      this.updateSelected(values, values.length === 0 && this.value)
    },

    removeSelectedItem (index) {
      let _values = helpers.deepCopy(this.values)
      _values.splice(index, 1)
      this.onSelected(_values)

      if (this._optionsInstance && this._optionsInstance.open) {
        this._optionsInstance.selected = _values
      }
    }
  },
  watch: {
    'options': function (value, oldValue) {
      if (value.length === 0 && oldValue.length === 0) return

      this.valuesInit()

      if (this._optionsInstance) {
        this._optionsInstance.options = value
        this._optionsInstance.selected = this.values
      }
    },

    'value': function (value, oldValue) {
      if (helpers.equal(value, oldValue) === false) {
        this.valuesInit()
      }
    },

    'keyword': function (value) {
      if (this.readonly) return

      const reg = value.length ? new RegExp(value.split('').join('.*')) : /.*/

      this._optionsInstance.options = this.options.filter(item => {
        const _label = helpers.getValueByPath(item, this.optionKey.label)
        return reg.test(_label)
      })
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>

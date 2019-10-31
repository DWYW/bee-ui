<template>
  <section :class="['bee-select', {
    'bee-select__multiple': this.multiple,
    'bee-select__disabled': this.disabled
  }]" @click='toggleOptions'>
    <section class="bee-select--body">
      <!-- multiple mode -->
      <template v-if='multiple'>
        <span class="placeholder" v-if='labels.length === 0'>{{placeholder}}</span>

        <span class="bee-select--item" v-for='(item, key) in labels' :key='key'>
          <span>{{item}}</span>
          <bee-icon class='bee-remove--button' icon='error' @click.stop='removeSelectedItem(key)'></bee-icon>
        </span>
      </template>

      <!-- single mode -->
      <template v-else>
        <span class="placeholder" v-if='labels.length === 0 && !keyword'>{{placeholder}}</span>

        <span v-if='searchDisabled' class="bee-selected--label">{{labels.join('')}}</span>

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
      toggle: false,
      isMounted: false
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

    labels () {
      return this.values.reduce((acc, cur) => {
        const option = this.options.find((item) => cur === helpers.getValueByPath(item, this.optionKey.value))
        option && acc.push(helpers.getValueByPath(option, this.optionKey.label))
        return acc
      }, [])
    }
  },
  mounted () {
    if (this.value !== undefined && this.value !== null) {
      this.setSelected(this.value)
    }

    this.isMounted = true
  },
  methods: {
    toggleOptions (e) {
      if (this.disabled) return

      // If the options has be opened, to try close it.
      if (this.toggle) {
        let target = e ? e.target : null

        while (target) {
          if (target !== this._optionsInstance.$el) {
            target = target.parentNode
            continue
          }

          break
        }

        if (!target) {
          this.toggle = false
          this.hideOptions(e)
        }

        return
      }

      this.toggle = true
      this.showOptions(e)
    },

    showOptions (e) {
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

    hideOptions (e) {
      if (!this.searchDisabled) {
        // if the search function be enabled, the input will be readonly.
        this.readonly = true

        // if the search function be used and nothing selected, to restore the label.
        if (this.labels.indexOf(this.keyword) === -1) {
          this.keyword = this.labels.join('')
        }
      }

      this._optionsInstance.open = false
      Listener.removeListener(window, 'click', this.toggleOptions)
    },

    onSelected (data) {
      if (!this.multiple && this._optionsInstance && this._optionsInstance.open) {
        this.toggleOptions()
      }

      // If the value to equal old vlaueo or undefined, break after.
      // When the length of the this.options is 0, the data will be undefined.
      if (!data || helpers.equal(data, this.values)) return

      this.values = helpers.deepCopy(data)
      let eventData = data

      if (this.multiple) {
        // resolve the options position error by reference resize.
        if (this.toggle && this._optionsInstance) {
          this.$nextTick(() => {
            this._optionsInstance.$refs.popper.updatePosition()
          })
        }
      } else {
        eventData = data[0]

        if (!this.searchDisabled) {
          this.keyword = this.labels[0]
        }
      }

      // resolve emit events when mounted.
      if (!this.isMounted) {
        this.isMounted = true
        return
      }

      // Emit evetns.
      const events = ['input', 'change']

      events.forEach((eventName) => {
        if (this.$listeners[eventName]) {
          this.$listeners[eventName](eventData)
        }
      })
    },

    removeSelectedItem (index) {
      let _values = helpers.deepCopy(this.values)
      _values.splice(index, 1)
      this.onSelected(_values)
    },

    setSelected (data) {
      if (helpers.typeof(data, 'array')) {
        this.onSelected(data)
      } else {
        this.onSelected([data])
      }
    }
  },
  watch: {
    'options': function (value, oldValue) {
      if (value.length === 0 && oldValue.length === 0) return false

      this._optionsInstance.options = value
      this._optionsInstance.setSelected(this.values)
    },

    'value': function (value) {
      if (this.multiple) {
        !helpers.equal(value, this.values) && this.setSelected(value)
      } else {
        !helpers.equal([value], this.values) && this.setSelected(value)
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

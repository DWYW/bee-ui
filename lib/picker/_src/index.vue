<template>
  <section :class="['bee-picker', 'bee-picker__' + type, {
    'bee-picker__disabled': disabled === true
  }]">
    <quick-buttons v-if="quickButtonConfigurations.length && quickBtnsType === 'outer'"
      :quick-btns="quickButtonConfigurations"
      :quick-btns-type="quickBtnsType"
      :type='type'
      :callback="pickerCallback"
      :disabled='disabled'
      :value="value"
    ></quick-buttons>

    <section class="bee-picker--value" @click="togglePicker">
      <bee-icon icon="date"></bee-icon>

      <span class="bee-picker--value-text" v-if='value'>{{labelText}}</span>
      <span class="bee-picker--placeholder" v-else>{{placeholder}}</span>
    </section>
  </section>
</template>

<script>
import Vue from 'vue'
import PickerPopper from './picker-popper.vue'
import QuickButtons from './quick-buttons.vue'
import dateHelpers from '../../utils/date'
import helpers from '../../utils/helpers'
import Listener from '../../utils/listener'
import getScrollParent from '../../utils/getScrollParent'

const PickerPopperCtor = Vue.extend(PickerPopper)

export default {
  name: 'BeePicker',
  components: {
    QuickButtons
  },
  props: {
    format: String,
    labelFormat: Function,
    type: {
      type: String,
      validator: function (value) {
        return ['date', 'datetime', 'range', 'rangetime'].indexOf(value) !== -1
      },
      default: 'date'
    },
    disabled: [Function, Boolean],
    timeDisabled: Object,
    timeVisible: {
      type: Object,
      default: () => {
        return {
          hour: true,
          minute: true,
          second: true
        }
      }
    },
    placeholder: String,
    quickBtns: Array,
    quickBtnsType: {
      type: String,
      validator: function (value) {
        return ['inner', 'outer'].indexOf(value) !== -1
      },
      default: 'inner'
    },
    autoChange: Boolean,
    maxDays: [Number, String],
    defaultTime: {
      type: [Object, Function],
      default: () => {
        return {}
      }
    },
    value: [Date, Array]
  },
  data () {
    return {
      toggle: false,
      oldValue: null
    }
  },
  computed: {
    scrollParent () {
      return getScrollParent(this.$el)
    },

    quickButtonConfigurations () {
      if (helpers.typeof(this.quickBtns) !== 'array') return []

      return this.quickBtns.reduce((acc, cur) => {
        if (!cur) return acc

        const { label, value } = cur

        if (!label) return acc

        if (/range/.test(this.type)) {
          helpers.typeof(value, 'array') && acc.push(cur)
        } else {
          helpers.typeof(value, 'date') && acc.push(cur)
        }

        return acc
      }, [])
    },

    labelText () {
      // If the custom label format already has.
      if (helpers.typeof(this.labelFormat, 'function')) {
        return this.labelFormat(this.value)
      }

      // If it is the value in the quick button.
      const _quick = this.quickButtonConfigurations.find(item => helpers.equal(this.value, item.value))
      if (_quick) return _quick.label

      // Defult time format.
      const _format = this.getFormat()

      // The Format of date or datetime
      if (helpers.typeof(this.value, 'date')) {
        return dateHelpers.format(this.value, _format)
      }

      // The Format of range or rangetime
      if (helpers.typeof(this.value, 'array')) {
        const strings = this.value.reduce((acc, cur) => {
          helpers.typeof(cur, 'date') && acc.push(dateHelpers.format(cur, _format))
          return acc
        }, [])

        return strings.join(` ${this.$_language('PICKER_RANGE_JOIN')} `)
      }

      return ''
    }
  },
  methods: {
    togglePicker (e) {
      if (this.disabled === true) return

      if (this.toggle) {
        let target = e ? e.target : null

        while (target) {
          if (target !== this._pickerInstance.$el) {
            target = target.parentNode
            continue
          }

          break
        }

        if (target) return

        this.toggle = false
        this.closePicker()
      } else {
        this.toggle = true
        this.openPicker()
      }
    },

    openPicker () {
      let _data = {
        type: this.type,
        quickBtnsType: this.quickBtnsType,
        disabled: this.disabled,
        timeDisabled: this.timeDisabled,
        timeVisible: this.timeVisible,
        autoChange: this.autoChange,
        maxDays: this.maxDays,
        defaultTime: this.defaultTime,
        value: this.value,
        scrollParent: this.scrollParent,
        reference: this.$el,
        quickButtonConfigurations: this.quickButtonConfigurations,
        pickerCallback: this.pickerCallback,
        format: this.getFormat()
      }

      if (helpers.typeof(this.disabled, 'function')) {
        _data['disabled'] = this.disabled
      }

      const _beforeEnter = () => {
        setTimeout(() => {
          Listener.addListener(window, 'click', this.togglePicker)
        })
      }

      const _afterEnter = () => {
        this.$listeners.opened && this.$listeners.opened()
      }

      this._pickerInstance = new PickerPopperCtor({
        data: _data,
        methods: {
          beforeEnter: _beforeEnter,
          afterEnter: _afterEnter
        }
      }).$mount()

      // Save the old value for change event.
      this.oldValue = helpers.deepCopy(this.value)
    },

    closePicker () {
      this._pickerInstance.open = false
      Listener.removeListener(window, 'click', this.togglePicker)

      if (helpers.equal(this.value, this.oldValue)) return

      this.$listeners.change && this.$listeners.change(this.value)
    },

    getFormat () {
      return this.format || (/time$/.test(this.type) ? 'YYYY-MM-DD hh:mm:ss' : 'YYYY-MM-DD')
    },

    pickerCallback (data) {
      if (data.type === 'confirm' && this.toggle) {
        this.togglePicker()
        return
      }

      // If the selected value is equal the current value, break after.
      if (helpers.equal(data.value, this.value)) return

      // Emit v-model input event.
      this.$listeners.input && this.$listeners.input(data.value)

      // If It is triggered by outer quick button, emit change event.
      if (data.type === 'quick' && this.quickBtnsType === 'outer') {
        this.$listeners.change && this.$listeners.change(this.value)
      }

      // auto close picker.
      if (/^(date|range)$/.test(this.type) && this.toggle) {
        this.$nextTick(() => {
          this.togglePicker()
        })
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

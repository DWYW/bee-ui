<template>
  <label :class="['bee-input', 'bee-input__' + theme, {
    'bee-input__disabled': disabled,
    'left--icon': icon && icon.position === 'left',
    'right--icon': icon && icon.position === 'right',
  }]">
    <input ref='input' v-on='listeners'
      :type=type
      :maxlength=maxlength
      :disabled=disabled
      :placeholder=placeholder
      :readonly=readonly
      :value='value'
    >
    <bee-icon v-if='icon'
      :class="['adorn-icon']"
      :font-family='icon.fontFamily'
      :icon="icon.icon"
      v-on='icon.listeners'
    ></bee-icon>
  </label>
</template>

<script>
import helpers from '../../utils/helpers'

export default {
  name: 'BeeInput',
  props: {
    autofocus: Boolean,
    disabled: [Boolean, String],
    icon: Object,
    maxlength: [Number, String],
    placeholder: String,
    readonly: Boolean,
    reg: [Function, String, RegExp],
    theme: {
      type: String,
      default: 'default'
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    listeners () {
      return Object.assign({}, this.$listeners, {
        input: this.customInput,
        keyup: this.customKeyup
      })
    }
  },
  created () {
    this.initValue()
  },
  mounted () {
    this.$nextTick(() => {
      // auto focus
      if (this.autofocus) {
        this.$refs.input.focus()
      }
    })
  },
  methods: {
    initValue () {
      let _value = this.value || ''

      if (this.maxlength) {
        _value = _value.slice(0, this.maxlength)
      }

      this.$listeners.input && this.$listeners.input(_value)
    },

    customKeyup (e) {
      if (e.keyCode === 13 && this.$listeners.enter) this.$listeners.enter(e)

      if (this.$listeners.keyup) this.$listeners.keyup(e)
    },

    customInput (e) {
      let _value = e.target.value

      if (this.maxlength) {
        _value = _value.slice(0, this.maxlength)
      }

      if (_value && this.reg) {
        _value = this.validator(_value)

        if (_value !== e.target.value) {
          e.target.value = _value
        }
      }

      this.$listeners.input && this.$listeners.input(_value)
    },

    validator (value) {
      if (helpers.typeof(this.reg, 'function')) {
        const validator = this.reg(value)

        if (validator === false) {
          value = this.value
        } else if (validator !== true) {
          value = validator
        }
      } else if (helpers.typeof(this.reg, 'regexp')) {
        if (this.reg.test(value) === false) {
          value = this.value
        }
      } else {
        const regExp = new RegExp(this.reg)

        if (regExp.test(value) === false) {
          value = this.value
        }
      }

      return value
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

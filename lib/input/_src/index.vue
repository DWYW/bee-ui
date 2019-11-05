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
      :value=value
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
    reg: [Function, String],
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
        input: this.customChange,
        keyup: this.customKeyup
      })
    }
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
    customKeyup (e) {
      if (e.keyCode === 13 && this.$listeners.enter) this.$listeners.enter(e)

      if (this.$listeners.keyup) this.$listeners.keyup(e)
    },

    customChange (e) {
      if (e.target.value && this.reg) {
        const validator = this.validator(e.target.value)

        if (validator !== e.target.value) {
          e.target.value = validator
        }
      }

      this.$listeners.input && this.$listeners.input(e.target.value)
    },

    validator (value) {
      if (helpers.typeof(this.reg, 'function')) {
        const validator = this.reg(value)

        if (validator === false) {
          value = this.value
        } else if (validator !== true) {
          value = validator
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

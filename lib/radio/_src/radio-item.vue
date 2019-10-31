<template>
  <label :class="['bee-radio', {
    'bee-radio__selected': this.checked,
    'bee-radio__disabled': this.disabled
  }]" v-on='listeners'>
    <transition-group name='bee-radio-fade'>
      <bee-icon key='unselected' v-bind='icons[0]' v-show='!checked'></bee-icon>
      <bee-icon key='selected' v-bind="icons[1]" v-show='checked'></bee-icon>
    </transition-group>

    <span class="bee-radio--label">
      <slot></slot>
    </span>

    <input type="radio" :disabled='disabled' @change="changeEvent" :checked='checked'>
  </label>
</template>

<script>
export default {
  name: 'BeeRadio',
  props: {
    icons: {
      type: Array,
      default: () => [{
        fontFamily: 'beefont',
        icon: 'radio-unselected'
      }, {
        fontFamily: 'beefont',
        icon: 'radio-selected'
      }]
    },
    disabled: Boolean,
    value: [Boolean]
  },
  data () {
    return {
      checked: this.value === true
    }
  },
  computed: {
    listeners () {
      const _listeners = {}

      for (let eventName in this.$listeners) {
        if (['input', 'change'].indexOf(eventName) === -1) {
          _listeners[eventName] = this.$listeners[eventName]
        }
      }

      return _listeners
    }
  },
  methods: {
    changeEvent (e) {
      this.checked = e.target.checked
      this.$listeners.input && this.$listeners.input(this.checked)
    }
  },
  watch: {
    'checked': function (value, oldValue) {
      if (value !== oldValue && value !== this.value) {
        this.$listeners.change && this.$listeners.change(this.checked)
      }
    },
    'value': function (value) {
      if (value !== this.checked) this.checked = value
    }
  }
}
</script>

<style lang="less">
  @import './radio-item.less';
</style>

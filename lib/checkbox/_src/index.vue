<template>
  <label :class="['bee-checkbox', {
    'bee-checkbox__selected': this.checked,
    'bee-checkbox__disabled': this.disabled
  }]" v-on='listeners'>
    <transition-group name='bee-checkbox-fade'>
      <bee-icon key='unselected' v-bind='icons[0]' v-show='!checked'></bee-icon>
      <bee-icon key='selected' v-bind="icons[1]" v-show='checked'></bee-icon>
    </transition-group>

    <span class="bee-checkbox--label">
      <slot></slot>
    </span>

    <input type="checkbox" :disabled='disabled' @change="changeEvent" :checked='checked'>
  </label>
</template>

<script>
export default {
  name: 'BeeCheckbox',
  props: {
    icons: {
      type: Array,
      default: () => [{
        fontFamily: 'beefont',
        icon: 'checkbox-unselected'
      }, {
        fontFamily: 'beefont',
        icon: 'checkbox-selected'
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
  @import './index.less';
</style>

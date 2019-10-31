<template>
  <label :class='["bee-switch", {
    "bee-switch__sm": size === "sm",
    "bee-switch__lg": size === "lg",
    "bee-switch__open": checked,
    "bee-switch__close": !checked,
    "bee-switch__disabled": disabled
  }]' :style='{backgroundColor: openColor}'>
    <span class="bee-switch--before" :style='{backgroundColor: closeColor}'></span>
    <span class="bee-switch--after"></span>

    <input type="checkbox" :checked='checked' :disabled='disabled' @change='onChange'>
  </label>
</template>

<script>
export default {
  name: 'BeeSwitch',
  props: {
    size: {
      type: String,
      validator: function (value) {
        return /^sm|lg$/.test(value)
      }
    },
    openColor: String,
    closeColor: String,
    disabled: Boolean,
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: this.value
    }
  },
  methods: {
    onChange (e) {
      const next = e.target.checked

      if (next === this.checked) return

      this.changed(next)
    },

    changed (value) {
      this.checked = value
      const events = ['input', 'change']

      events.forEach((event) => {
        this.$listeners[event] && this.$listeners[event](value)
      })
    }
  },
  watch: {
    value (value) {
      if (value !== this.checked) {
        this.checked(value)
      }
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>

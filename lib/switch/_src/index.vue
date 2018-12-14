<template>
  <label :class='["bee-switch--wp", {
    "bee-switch__sm": size === "sm",
    "bee-switch__lg": size === "lg",
    "bee-switch__open": checked,
    "bee-switch__close": !checked,
    "bee-switch__disabled": disabled
  }]' :style='switchStyle'>
    <input type="checkbox" :checked='checked' :disabled='disabled' @change='switchChange'>
  </label>
</template>

<script>
export default {
  name: 'BeeSwitch',
  props: {
    size: {
      type: String,
      validator: function (val) {
        let _sizes = ['sm', 'lg']
        return _sizes.indexOf(val) !== -1
      }
    },
    openColor: String, // opened color
    closeColor: String, // closed color
    disabled: Boolean,
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: false
    }
  },
  computed: {
    switchStyle () {
      return ({
        backgroundColor: this.checked ? this.openColor : this.closeColor,
        borderColor: this.checked ? this.openColor : this.closeColor
      })
    }
  },
  created () {
    this.checked = this.value
  },
  methods: {
    /* switch开关事件 */
    switchChange (e) {
      this.checked = e.target.checked
      this.$emit('input', e.target.checked)
    }
  },
  watch: {
    value (newVal) {
      if (newVal !== this.checked) {
        this.checked = newVal
      }
    }
  }
}
</script>

<style lang='less'>
@import '../../theme.less';
@root: bee-switch;
@distance: 4px;

.@{root}--wp {
  width: @switch-width;
  height: @switch-height;
  border-radius: 500px;
  box-sizing: border-box;
  transition: background 0.15s;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;

  input {
    display: none;
  }

  &::before {
    content: '';
    width: @switch-height - @distance;
    height: @switch-height - @distance;
    border-radius: 50%;
    background-color: @switch-btn-bg;
    display: inline-block;
    transition: margin 0.15s, border 0.15s;
  }

  &.disabled::before {
    cursor: no-drop;
  }

  &.@{root}__open {
    background-color: @switch-active-bg;

    &::before {
      margin-left: @switch-width - @switch-height + 1px;
    }
  }

  &.@{root}__close {
    background-color: @switch-default-bg;

    &::before {
      box-shadow: 0 0 2px @switch-btn-shadow-color;
      margin-left: @distance - 1px;
    }
  }

  &.@{root}__sm {
    width: @switch-width-sm;
    height: @switch-height-sm;

    &::before  {
      width: @switch-height-sm - @distance;
      height: @switch-height-sm - @distance;

    }

    &.@{root}__open::before{
      margin-left: @switch-width-sm - @switch-height-sm + 1px;
    }
  }

  &.@{root}__lg {
    width: @switch-width-lg;
    height: @switch-height-lg;

    &::before  {
      width: @switch-height-lg - @distance;
      height: @switch-height-lg - @distance;

    }

    &.@{root}__open::before{
      margin-left: @switch-width-lg - @switch-height-lg + 1px;
    }
  }

   &.@{root}__disabled {
    cursor: no-drop;
    opacity: .4;
  }
}
</style>

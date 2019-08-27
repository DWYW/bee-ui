<template>
  <label :class='["radio--wp", {
    "radio__selected": checked,
    "radio__disabled": disabled
  }]'>
    <transition name='radio-fade'>
      <bee-icon :icon='icons[0]' v-if='!checked'></bee-icon>
    </transition>

    <transition name='radio-fade'>
      <bee-icon :icon='icons[1]' v-if='checked'></bee-icon>
    </transition>

    <span class='radio--label'><slot></slot></span>
    <input type="radio" @change='changeEvent' :checked='checked' :disabled='disabled'>
  </label>
</template>

<script>
export default {
  name: 'BeeRadio',
  props: {
    icons: {
      type: Array,
      default: () => ['radio-unselected', 'radio-selected']
    },
    disabled: Boolean,
    value: [Boolean]
  },
  data () {
    return {
      checked: this.value
    }
  },
  mounted () {
    if (this.value) {
      this.$emit('input', this.value)
    }
  },
  methods: {
    changeEvent (e) {
      this.isChanged(this.checked, e.target.checked)
      this.checked = e.target.checked
      this.$emit('input', e.target.checked)
    },

    isChanged (current, next) {
      if (current === next) return false

      this.$nextTick(() => {
        this.$emit('change', next)
      })
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
@root: radio;
.@{root}--wp {
  font-size: 14px;
  line-height: @radio-line-height;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  position: relative;

  i.bee--font {
    font-size: 20px;
    color: @radio-color-unselected;
    vertical-align: middle;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  .@{root}--label {
    padding-left: 24px;
  }

  input {
    display: none;
  }

  &.@{root}__selected {
    i.bee--font {
      color: @radio-color-selected;
    }
  }

  &.@{root}__disabled {
    cursor: no-drop;
    opacity: .4;

    i.bee--font {
      color: @radio-color-unselected;
    }
  }

  .radio-fade-enter-active, .radio-fade-leave-active {
    transition: opacity .3s, color .3s;;
  }

  .radio-fade-enter, .radio-fade-leave-to {
    opacity: 0;
  }
}
</style>

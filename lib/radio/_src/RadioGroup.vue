<template>
  <div class='radio-group--wp'>
    <bee-radio :class='{
      "radio__block": block
    }'
      v-for='(radio, $index) in groups'
      :key='$index'
      :disabled='radio.disabled'
      :value='value === $index'
      @input='itemSelected($event, $index)'
    >
      {{radio.label}}
    </bee-radio>
  </div>
</template>

<script>
export default {
  name: 'BeeRadioGroup',
  props: {
    groups: {
      type: Array,
      default: () => []
    },
    block: Boolean,
    value: Number
  },
  data () {
    return {}
  },
  mounted () {
    // if the value can`t used, reset the value.
    if (this.value >= this.groups.length || this.value < 0) {
      this.$emit('input', null)
    }
  },
  methods: {
    itemSelected (value, index) {
      if (value) {
        this.$emit('input', index)
      }
    }
  }
}
</script>

<style lang='less'>
.radio-group--wp {
  display: inline-block;

  .radio--wp {
    padding-right: 15px;

    &:last-child {
      padding-right: 0;
    }

    &.radio__block {
      display: block;
    }
  }
}
</style>

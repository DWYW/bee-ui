<template>
  <div class="bee-radio-group">
    <div :class="['bee-group--item', {
      'bee-group--item__block': block,
      'bee-group--item__disable': radio.disabled
    }]" v-for='(radio, index) in groups' :key=index>
      <!-- radio item -->
      <bee-radio class="bee-group-item--radio"
        :disabled=radio.disabled
        :value="selected === index"
        @change="itemSelected($event, index)"
      >{{radio.label}}</bee-radio>

      <span class="bee-group-item--desc">{{radio.desc}}</span>
    </div>
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
    return {
      selected: this.value
    }
  },
  methods: {
    itemSelected (value, index) {
      if (!value) return
      if (index === this.selected) return

      this.selected = index
      this.$listeners.input && this.$listeners.input(this.selected)
    }
  },
  watch: {
    'selected': function (value, oldValue) {
      if (value !== oldValue && value !== this.value) {
        this.$listeners.change && this.$listeners.change(value)
      }
    },
    'value': function (value) {
      if (value !== this.selected) this.selected = value
    }
  }
}
</script>

<style lang="less">
  @import './radio-group.less';
</style>

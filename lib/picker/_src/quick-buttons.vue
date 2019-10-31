<template>
  <section :class="[
    'bee-picker--quick-buttons',
    'bee-picker--quick-buttons__' + quickBtnsType
  ]">
    <span :class="[
      'bee-picker-quick-buttons--item', {
        'bee-picker-quick-buttons--item__selected': isSelected(item)
      }]"
      v-for="(item, key) in quickBtns"
      :key="'quick-button-' + key"
      @click='picker(item)'
      :disabled='disabled === true'
    >{{item.label}}</span>
  </section>
</template>

<script>
import helpers from '../../utils/helpers'

export default {
  props: {
    quickBtns: Array,
    quickBtnsType: String,
    type: String,
    disabled: null,
    callback: Function,
    value: [Date, Array]
  },
  methods: {
    /**
     * Whether the current quick button is be selected.
     * @param {Object} data configurations for the quick button.
     * @returns {Boolean}
     */
    isSelected (data) {
      return helpers.equal(data.value, this.value)
    },

    /**
     * The callback of the quick button picker.
     * @param {Object} data configure for the quick button.
     */
    picker (data) {
      if (this.disabled === true) return

      this.callback({
        value: data.value,
        type: 'quick'
      })
    }
  }
}
</script>

<style lang="less">
  @import './quick-buttons.less';
</style>

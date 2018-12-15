export default {
  name: 'BeeTableColumn',
  render: function (createElement) {
    return createElement('span', this.$slots.default)
  },
  props: {
    width: {
      type: [Number, String],
      default: 75
    },
    fixed: String,
    prop: String,
    type: {
      type: String,
      default: 'general'
    },
    label: String,
    placeholder: String,
    align: {
      type: String,
      default: 'center'
    }
  }
}

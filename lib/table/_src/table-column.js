export default {
  name: 'BeeTableColumn',
  render: function (createElement) {
    return createElement('span', this.$slots.default)
  },
  props: {
    width: {
      type: [Number, String],
      default: 50
    },
    fixed: String,
    prop: String,
    label: String,
    placeholder: String,
    align: {
      type: String,
      default: 'center'
    },
    styles: [Object, String]
  }
}

export default {
  name: 'BeeTabItem',
  props: {
    label: String
  },
  render (createElement) {
    return createElement('div', {
      class: 'tab-item'
    }, this.$slots.default)
  }
}

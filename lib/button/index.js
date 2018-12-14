import BeeButton from './_src/index.vue'

BeeButton.install = function (Vue) {
  Vue.component(BeeButton.name, BeeButton)
}

export default BeeButton

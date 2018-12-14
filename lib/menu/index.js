import BeeMenu from './_src/index.vue'

BeeMenu.install = function (Vue) {
  Vue.component(BeeMenu.name, BeeMenu)
}

export default BeeMenu

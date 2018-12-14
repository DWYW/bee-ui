import BeeDialog from './_src/index.vue'

BeeDialog.install = function (Vue) {
  Vue.component(BeeDialog.name, BeeDialog)
}

export default BeeDialog

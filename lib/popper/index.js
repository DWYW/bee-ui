import Popper from './_src/index.vue'

export default {
  install: function (Vue) {
    Vue.component(Popper.name, Popper)
  }
}

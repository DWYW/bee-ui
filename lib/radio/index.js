import BeeRadio from './_src/Radio.vue'
import BeeRadioGroup from './_src/RadioGroup.vue'

BeeRadio.install = function (Vue) {
  Vue.component(BeeRadio.name, BeeRadio)
}

BeeRadioGroup.install = function (Vue) {
  Vue.component(BeeRadioGroup.name, BeeRadioGroup)
}

export {
  BeeRadio,
  BeeRadioGroup
}

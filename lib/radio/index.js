import Radio from './_src/radio-item.vue'
import RadioGroup from './_src/radio-group.vue'

export const BeeRadio = {
  install: function (Vue) {
    Vue.component(Radio.name, Radio)
  }
}

export const BeeRadioGroup = {
  install: function (Vue) {
    Vue.component(RadioGroup.name, RadioGroup)
  }
}

import Tab from './_src/index.js'
import TabItem from './_src/tab-item.vue'

export const BeeTab = {
  install: function (Vue) {
    Vue.component(Tab.name, Tab)
  }
}

export const BeeTabItem = {
  install: function (Vue) {
    Vue.component(TabItem.name, TabItem)
  }
}

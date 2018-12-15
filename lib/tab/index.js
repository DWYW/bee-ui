import BeeTab from './_src/tab'
import BeeTabItem from './_src/tab-item'

BeeTab.install = function (Vue) {
  Vue.compontent(BeeTab.name, BeeTab)
}

BeeTabItem.install = function (Vue) {
  Vue.compontent(BeeTabItem.name, BeeTabItem)
}

export {
  BeeTab,
  BeeTabItem
}

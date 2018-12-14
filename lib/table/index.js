import BeeTable from './_src'
import BeeTableColumn from './_src/table-column'

BeeTable.install = function (Vue) {
  Vue.compontent(BeeTable.name, BeeTable)
}

BeeTableColumn.install = function (Vue) {
  Vue.compontent(BeeTableColumn.name, BeeTableColumn)
}

export {
  BeeTable,
  BeeTableColumn
}

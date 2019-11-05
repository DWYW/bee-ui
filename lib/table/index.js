import Table from './_src/index.vue'
import TableColumn from './_src/table-column.vue'

export const BeeTable = {
  install: function (Vue) {
    Vue.component(Table.name, Table)
  }
}

export const BeeTableColumn = {
  install: function (Vue) {
    Vue.component(TableColumn.name, TableColumn)
  }
}

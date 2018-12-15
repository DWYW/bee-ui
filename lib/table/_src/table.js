import BeeEmpty from '../../empty/_src/index.vue'
import BeeIcon from '../../icon/_src/index.vue'
import { deepValue } from '../../utils/object'
import Utils from '../../utils/utils'

export default {
  name: 'Table',
  components: {
    BeeEmpty,
    BeeIcon
  },
  props: {
    data: Array,
    columns: Array,
    slots: Array,
    selections: Array,
    activeIndex: null
  },
  data () {
    return {}
  },
  computed: {
    allSelected () {
      let count = 0

      if (!this.selections.length) return count

      for (let i = 0; i < this.data.length; i++) {
        if (this.selections.find(item => Utils.eq(item, this.data[i]))) {
          count += 1
        }
      }

      if (!count) {
        return count
      } else if (count !== this.data.length) {
        return 1
      } else {
        return 2
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.updateSize()
    })
  },
  methods: {
    updateSize () {
      this.$emit('tableSize', {
        thead: {
          height: this.$refs.thead.offsetHeight + 1
        },
        table: {
          width: this.$refs.table.offsetWidth
        }
      })
    }
  },
  render: function (createElement) {
    const nodes = {
      table: (children) => {
        return createElement('table', {
          atrrs: {
            cellspacing: 0,
            cellpadding: 0
          },
          ref: 'table'
        }, children)
      },
      colgroup: () => {
        return createElement('colgroup', {}, this.columns.map((col) => {
          return createElement('col', {
            attrs: {
              width: col.width
            }
          })
        }))
      },
      thead: () => {
        return createElement('thead', {
          ref: 'thead'
        }, [
          createElement('tr', {}, this.columns.map((col) => {
            return createElement('th', {
              class: ['bee-table--col', {
                'bee-table--col__left': col.align === 'left',
                'bee-table--col__center': col.align === 'center',
                'bee-table--col__right': col.align === 'right'
              }]
            }, [
              col.type === 'selection' ? createElement(BeeIcon, {
                class: [{
                  'icon--wp__active': this.allSelected > 0,
                  'icon--wp__disabled': this.data.length === 0
                }],
                props: {
                  icon: this.allSelected === 0 ? 'checkbox-unselected' : this.allSelected === 1 ? 'selected-part' : 'checkbox-selected'
                },
                on: {
                  click: () => {
                    if (this.data.length) {
                      this.$emit('allToggle', this.allSelected === 2)
                    }
                  }
                }
              }) : col.label
            ])
          }))
        ])
      },
      tbody: () => {
        const createCol = (row, rowIndex, col) => {
          if (col.type === 'selection') {
            const selected = this.selections.find(item => Utils.eq(item, row))

            return createElement(BeeIcon, {
              class: [{
                'icon--wp__active': selected
              }],
              props: {
                icon: selected ? 'checkbox-selected' : 'checkbox-unselected'
              },
              on: {
                click: () => {
                  this.$emit('someToggle', row)
                }
              }
            })
          } else if (col.prop) {
            return deepValue(col.prop, row) || col.placeholder
          } else if (this.slots[col.index].data.scopedSlots) {
            return this.slots[col.index].data.scopedSlots.default({
              row: row,
              $index: rowIndex
            })
          } else {
            return col.placeholder
          }
        }

        return createElement('tbody', {}, this.data.length ? this.data.map((row, index) => {
          return createElement('tr', {
            class: {
              'bee-table--row__active': index === this.activeIndex
            }
          }, this.columns.map((col) => {
            return createElement('td', {
              class: ['bee-table--col', {
                'bee-table--col__left': col.align === 'left',
                'bee-table--col__center': col.align === 'center',
                'bee-table--col__right': col.align === 'right'
              }]
            }, [
              createCol(row, index, col)
            ])
          }))
        }) : [nodes.empty()])
      },
      empty: () => {
        return createElement('tr', {}, [
          createElement('td', {
            class: 'bee-table--col',
            attrs: {
              colspan: this.columns.length
            }
          }, [
            createElement(BeeEmpty)
          ])
        ])
      }
    }

    return nodes.table([
      nodes.colgroup(),
      nodes.thead(),
      nodes.tbody()
    ])
  }
}

import helpers from '../../utils/helpers'

export default {
  props: {
    columnsConfig: Array,
    data: Array,
    placeholder: String,
    rowClassName: Function,
    selections: Array,
    slots: Array,
    summary: Boolean,
    summaryText: String,
    summaryMethod: Function
  },
  computed: {
    countSelected () {
      if (!this.selections || this.selections.length === 0) return 0

      let count = 0

      for (let i = 0; i < this.data.length; i++) {
        const item = this.data[i]

        if (this.selections.find(_item => helpers.equal(_item, item))) {
          count++
        }
      }

      return count
    },

    footerConfig () {
      if (helpers.typeof(this.summaryMethod) === 'function') {
        return this.summaryMethod(this.columns, this.data, this.summaryText)
      }

      return this.columnsConfig.map((column, index) => {
        if (index === 0) return this.summaryText

        if (column.prop) {
          return this.data.reduce((acc, cur) => {
            const item = helpers.getValueByPath(cur, column.prop)
            acc += (Number(item) || 0)
            return acc
          }, 0)
        }

        return column.placeholder || this.placeholder
      })
    }
  },
  render (h) {
    const renderCol = (column) => {
      return h('col', {
        attrs: {
          width: column.width
        }
      })
    }

    const renderTh = (column) => {
      const _slot = this.slots[column.slotIndex]

      const getChildren = () => {
        let _children = []

        if (column.type === 'selection') {
          _children.push(h('bee-icon', {
            class: [{
              'selection__selected': this.countSelected > 0,
              'selection__disabled': this.data.length === 0
            }],
            props: {
              icon: this.countSelected === 0 ? 'checkbox-unselected' : this.countSelected === this.data.length ? 'checkbox-selected' : 'selected-part'
            },
            on: {
              click: () => {
                if (!this.data.length) return false

                this.$listeners.selection && this.$listeners.selection({
                  type: 'all',
                  value: this.countSelected === this.data.length
                })
              }
            }
          }))
        } else {
          _children.push(column.label)
        }

        if (_slot.data.scopedSlots && _slot.data.scopedSlots.header) {
          _children.push(_slot.data.scopedSlots.header(column))
        }

        return _children
      }

      return h('th', {
        class: ['bee-table--cell', {
          'bee-table--cell__text-left': column.align === 'left',
          'bee-table--cell__text-center': column.align === 'center',
          'bee-table--cell__text-right': column.align === 'right'
        }, _slot.data.staticClass, _slot.data.class]
      }, getChildren())
    }

    const renderTd = (column, row) => {
      const _slot = this.slots[column.slotIndex]
      let _selected = this.selections && this.selections.find(_item => helpers.equal(_item, row.row))

      const getChildren = () => {
        let _children = []

        if (column.type === 'selection') {
          _children.push(h('bee-icon', {
            class: [{
              'selection__selected': _selected
            }],
            props: {
              icon: _selected ? 'checkbox-selected' : 'checkbox-unselected'
            },
            on: {
              click: () => {
                this.$listeners.selection && this.$listeners.selection({
                  type: 'item',
                  value: row.row
                })
              }
            }
          }))
        } else if (_slot.data.scopedSlots && _slot.data.scopedSlots.default) {
          _children.push(_slot.data.scopedSlots.default(row))
        } else if (column.prop) {
          return helpers.getValueByPath(row.row, column.prop, column.placeholder || this.placeholder)
        } else {
          return column.placeholder || this.placeholder
        }

        return _children
      }

      return h('td', {
        class: ['bee-table--cell', {
          'bee-table--cell__text-left': column.align === 'left',
          'bee-table--cell__text-center': column.align === 'center',
          'bee-table--cell__text-right': column.align === 'right',
          'bee-table--cell__selected': _selected
        }, _slot.data.staticClass, _slot.data.class]
      }, getChildren())
    }

    const renderTf = (column, columnIndex) => {
      const _slot = this.slots[column.slotIndex]

      return h('td', {
        class: ['bee-table--cell', {
          'bee-table--cell__text-left': column.align === 'left',
          'bee-table--cell__text-center': column.align === 'center',
          'bee-table--cell__text-right': column.align === 'right'
        }, _slot.data.staticClass, _slot.data.class]
      }, [this.footerConfig[columnIndex]])
    }

    const renderColumns = (tag, row) => {
      return this.columnsConfig.map((col, index) => {
        if (tag === 'col') return renderCol(col)
        if (tag === 'th') return renderTh(col)
        if (tag === 'td') return renderTd(col, row)
        if (tag === 'tf') return renderTf(col, index)
        return null
      })
    }

    const renderColGroup = () => {
      return h('colgroup', {}, renderColumns('col'))
    }

    const renderThead = () => {
      return h('thead', {}, [
        h('tr', {}, renderColumns('th'))
      ])
    }

    const renderTbody = () => {
      return h('tbody', {}, this.data.map((row, index) => {
        return h('tr', {
          class: this.rowClassName && this.rowClassName(row, index)
        }, renderColumns('td', {
          row: row,
          $index: index
        }))
      }))
    }

    const renderEmpty = () => {
      return h('tr', {}, [
        h('td', {
          class: 'bee-table--cell',
          attrs: {
            colspan: this.columnsConfig.length
          }
        }, [
          h('bee-empty')
        ])
      ])
    }

    const renderTfoot = () => {
      return h('tfoot', {}, [
        h('tr', {}, renderColumns('tf'))
      ])
    }

    return h('table', {
      attrs: {
        cellspacing: 0,
        cellpadding: 0
      }
    }, [
      renderColGroup(),
      renderThead(),
      this.summary && this.data.length ? renderTfoot() : null,
      this.data.length ? renderTbody() : renderEmpty()
    ])
  }
}

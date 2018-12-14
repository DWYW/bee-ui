import { deepValue } from '../../utils/object'

export default {
  props: {
    data: Array,
    columns: Array,
    type: String,
    activedIndex: Number
  },
  methods: {
    vNodeProps (vNode) {
      let _component = new vNode.componentOptions.Ctor(vNode.componentOptions.propsData)
      return _component.$options._propKeys.reduce((target, key) => {
        if (_component.$options[key] !== undefined) {
          target[key] = _component.$options[key]
        }

        return target
      }, _component._props)
    },

    /** create tbody node. */
    createBody (children) {
      return createElement => {
        return createElement('tbody', children)
      }
    },

    /** create tr nodes. */
    createTr (createChildren) {
      return createElement => {
        return this.data.map((row, key) => {
          return createElement('tr', {
            class: {
              'bee-table--row__actived': this.activedIndex === key
            }
          }, createChildren(row, key)(createElement))
        })
      }
    },

    /** create td nodes. */
    createTd (row, key) {
      return createElement => {
        return this.columns.map(vNode => {
          let _props = this.vNodeProps(vNode)

          return createElement('td', {
            class: {
              'bee-table--col__left': _props.align === 'left',
              'bee-table--col__center': _props.align === 'center',
              'bee-table--col__right': _props.align === 'right'
            },
            style: _props.styles
          }, _props.prop ? deepValue(_props.prop, row) : [vNode.data.scopedSlots.default({
            $index: key,
            row: row
          })])
        })
      }
    },

    createEmpty (createElement) {
      return createElement('tr', [
        createElement('td', {
          class: {
            'bee-table--col__empty': true
          },
          attrs: {
            colspan: this.columns.length
          }
        })
      ])
    }
  },
  render: function (createElement) {
    return this.createBody([
      this.data.length ? this.createTr(this.createTd)(createElement) : this.createEmpty(createElement)
    ])(createElement)
  }
}

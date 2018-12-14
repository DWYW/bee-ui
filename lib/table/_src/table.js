import Thead from './table-head'
import Tbody from './table-body'

export default {
  components: {
    Thead,
    Tbody
  },
  props: {
    data: Array,
    columns: Array,
    type: String,
    placeholder: String,
    minWidth: Number,
    activedIndex: Number
  },
  data () {
    return {

    }
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

    /** create table node */
    createTabel (children) {
      return createElement => {
        return createElement('table', {
          class: {
            'bee-table--table': true
          },
          style: {
            minWidth: `${this.minWidth}px`
          }
        }, children)
      }
    },

    /** create colgroup node */
    createColgroup (createElement) {
      return createElement('colgroup', this.columns.map(vNode => {
        return createElement('col', {
          attrs: {
            width: this.vNodeProps(vNode).width
          }
        })
      }))
    }
  },
  render: function (createElement) {
    let _props = {
      columns: this.columns,
      fixColumns: this.fixColumns,
      type: this.type
    }

    return this.createTabel([
      this.createColgroup(createElement),
      createElement(Thead, {
        props: _props
      }),
      createElement(Tbody, {
        props: Object.assign({}, _props, {
          data: this.data,
          placeholder: this.placeholder,
          activedIndex: this.activedIndex
        })
      })
    ])(createElement)
  }
}

export default {
  props: {
    columns: Array,
    type: String
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

    /** create thead node. */
    createThead (children) {
      return createElement => {
        return createElement('thead', children)
      }
    },

    /** create tr node. */
    createTr (children) {
      return createElement => {
        return createElement('tr', {
          class: {}
        }, children)
      }
    },

    /** create th nodes. */
    createTh (createElement) {
      return this.columns.map(vNode => {
        let _props = this.vNodeProps(vNode)

        return createElement('th', {
          class: {
            'bee-table--col__left': _props.align === 'left',
            'bee-table--col__center': _props.align === 'center',
            'bee-table--col__right': _props.align === 'right',
            'bee-table--col__fix-left': _props.fixed === 'left' && this.type === 'body',
            'bee-table--col__fix-right': _props.fixed === 'right' && this.type === 'body'
          },
          style: _props.styles
        }, _props.label ? _props.label : vNode.$scopedSlots.default({
          $index: null,
          row: null
        }))
      })
    }
  },
  render: function (createElement) {
    return this.createThead([
      this.createTr(this.createTh(createElement))(createElement)
    ])(createElement)
  }
}

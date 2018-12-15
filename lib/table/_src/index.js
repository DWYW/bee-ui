import Listener from '../../utils/listener'
import Utils from '../../utils/utils'
import Table from './table'

import './index.less'

export default {
  name: 'BeeTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    height: Number,
    maxHeight: Number,
    placeholder: String,
    activeIndex: Number,
    scrollDom: null
  },
  computed: {
    columns () {
      if (!this.$slots.default) return []

      const general = []
      const left = []
      const right = []
      let minWidth = 0
      let leftWidth = 0
      let rightWidth = 0

      this.$slots.default.forEach((vNode, index) => {
        if (vNode.componentOptions && vNode.componentOptions.tag === 'bee-table-column') {
          const item = Object.assign({
            index: index
          }, this.vNodeProps(vNode))

          minWidth += (parseInt(item.width) || 75)

          if (item.fixed === 'left') {
            leftWidth += (parseInt(item.width) || 75)
            left.push(item)
          } else if (item.fixed === 'right') {
            rightWidth += (parseInt(item.width) || 75)
            right.push(item)
          } else {
            general.push(item)
          }
        }
      })

      this.$set(this.table, 'minWidth', this.data.length ? minWidth : null)
      this.$set(this.fixed, 'left', left.length ? leftWidth : null)
      this.$set(this.fixed, 'right', right.length ? rightWidth : null)

      return [].concat(left, general, right)
    }
  },
  data () {
    return {
      table: {
        width: null,
        minWidth: null
      },
      header: {
        width: null,
        height: null
      },
      scrollbarWidth: [0, 0],
      fixed: {
        height: this.height,
        right: null,
        left: null,
        isStart: true,
        isEnd: false
      },
      selections: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.resize()

      Listener.addListener(this.$refs.body, 'scroll', this.scrollEvent)
      Listener.addListener(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    Listener.removeListener(this.$refs.body, 'scroll', this.scrollEvent)
    Listener.removeListener(window, 'resize', this.resize)
  },
  methods: {
    scrollEvent (e) {
      this.$refs.header.scrollLeft = e.target.scrollLeft

      if (this.$refs.left) {
        this.$set(this.fixed, 'isStart', e.target.scrollLeft === 0)
        this.$refs.left.scrollTop = e.target.scrollTop
      }

      if (this.$refs.right) {
        this.$set(this.fixed, 'isEnd', e.target.scrollLeft + e.target.clientWidth === e.target.scrollWidth)
        this.$refs.right.scrollTop = e.target.scrollTop
      }
    },

    resize () {
      this.$set(this.header, 'width', this.$refs.body.clientWidth)
      this.$set(this.fixed, 'height', this.$refs.body.clientHeight)
      this.scrollbarWidth = [this.$refs.body.offsetWidth - this.$refs.body.clientWidth, this.$refs.body.offsetHeight - this.$refs.body.clientHeight]
    },

    vNodeProps (vNode) {
      let _component = new vNode.componentOptions.Ctor(vNode.componentOptions.propsData)
      return _component.$options._propKeys.reduce((target, key) => {
        if (_component.$options[key] !== undefined) {
          target[key] = _component.$options[key]
        }

        return target
      }, _component._props)
    },

    tableSize (size) {
      this.$set(this.header, 'height', size.thead.height)
      this.$set(this.table, 'width', size.table.width)
    },

    someToggle (row) {
      let deleteKey = this.selections.findIndex(item => Utils.eq(item, row))

      if (deleteKey >= 0) {
        this.selections.splice(deleteKey, 1)
      } else {
        this.selections.push(row)
      }
    },

    allToggle (value) {
      this.data.forEach(row => {
        let deleteKey = this.selections.findIndex(item => Utils.eq(item, row))

        if (value && deleteKey >= 0) {
          this.selections.splice(deleteKey, 1)
        } else if (!value && deleteKey < 0) {
          this.selections.push(row)
        }
      })
    },
    clearSelections () {
      this.selections = []
    }
  },
  watch: {
    'selections': function (value) {
      this.$emit('selectionChange', value)
    }
  },
  render: function (createElement) {
    const nodes = {
      wrapper: (children) => {
        return createElement('div', {
          class: ['bee-table--wp', {
            'bee-table--wp__empty': this.data.length === 0
          }]
        }, children)
      },

      header: () => {
        return createElement('div', {
          class: ['bee-table--header'],
          style: {
            width: `${this.header.width}px`,
            height: `${this.header.height}px`
          },
          ref: 'header'
        }, [nodes.table({
          tableSize: this.tableSize
        })])
      },

      body: () => {
        return createElement('div', {
          class: ['bee-table--body'],
          style: {
            height: `${this.height}px`,
            maxHeight: `${this.maxHeight}px`
          },
          ref: 'body'
        }, [nodes.table()])
      },

      fixed: (type) => {
        return createElement('div', {
          class: ['bee-table--fixed', {
            'bee-table--fixed__left': type === 'left',
            'bee-table--fixed__right': type === 'right',
            'bee-table--scroll__start': type === 'left' && this.fixed.isStart,
            'bee-table--scroll__end': type === 'right' && this.fixed.isEnd
          }],
          style: {
            width: `${this.fixed[type]}px`,
            height: `${this.fixed.height}px`,
            right: type === 'right' ? `${this.scrollbarWidth[0]}px` : null
          }
        }, [
          createElement('div', {
            class: ['bee-table-fixed--header'],
            style: {
              width: `${this.table.width}px`,
              height: `${this.header.height}px`
            }
          }, [nodes.table()]),
          createElement('div', {
            class: ['bee-table-fixed--body'],
            style: {
              width: `${this.table.width}px`,
              height: `${this.fixed.height}px`
            },
            ref: type
          }, [nodes.table()])
        ])
      },

      table: (listener) => {
        return createElement(Table, {
          style: {
            minWidth: `${this.table.minWidth}px`
          },
          props: {
            data: this.data,
            columns: this.columns,
            slots: this.$slots.default,
            activeIndex: this.activeIndex,
            selections: this.selections
          },
          on: Object.assign({
            someToggle: this.someToggle,
            allToggle: this.allToggle
          }, listener)
        })
      }
    }

    return nodes.wrapper([
      nodes.header(),
      nodes.body(),
      this.fixed.left && this.data.length && this.scrollbarWidth[1] ? nodes.fixed('left') : null,
      this.fixed.right && this.data.length && this.scrollbarWidth[1] ? nodes.fixed('right') : null
    ])
  }
}

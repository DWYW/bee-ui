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
    resetScroll: {
      type: Boolean,
      default: true
    },
    summary: {
      type: Boolean,
      default: false
    },
    summaryMethod: Function,
    summaryText: {
      type: String,
      default: '合计'
    },
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
      footer: {
        width: null,
        height: null
      },
      borderWidth: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      scrollbar: {
        vertical: {
          distance: 0,
          visible: false
        },
        horizontal: {
          distance: 0,
          visible: false
        }
      },
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
      this.$emit('update:scrollDom', this.$refs.body)

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

      if (this.$refs.footer) {
        this.$refs.footer.scrollLeft = e.target.scrollLeft
      }

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
      this.borderWidth = {
        top: parseInt(Utils.getCss(this.$refs.body, 'border-top-width')) || 0,
        right: parseInt(Utils.getCss(this.$refs.body, 'border-right-width')) || 0,
        bottom: parseInt(Utils.getCss(this.$refs.body, 'border-bottom-width')) || 0,
        left: parseInt(Utils.getCss(this.$refs.body, 'border-left-width')) || 0
      }

      this.$set(this.header, 'width', this.$refs.body.clientWidth)
      this.$set(this.footer, 'width', this.$refs.body.clientWidth)
      this.$set(this.fixed, 'height', this.$refs.body.clientHeight)

      this.scrollbar = {
        vertical: {
          distance: this.$refs.body.offsetWidth - this.$refs.body.clientWidth,
          visible: this.$refs.body.scrollHeight !== this.$refs.body.clientHeight
        },
        horizontal: {
          distance: this.$refs.body.offsetHeight - this.$refs.body.clientHeight,
          visible: this.$refs.body.scrollWidth !== this.$refs.body.clientWidth
        }
      }
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
      this.$set(this.footer, 'height', size.tfoot.height)
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
    },
    'data': function (value, oldValue) {
      this.$nextTick(() => {
        this.resize()

        if (this.resetScroll) {
          this.$refs.body.scrollTop = 0
          this.$refs.body.scrollLeft = 0
        }
      })
    },
    'height': function (value, oldValue) {
      if (value === oldValue) return false

      this.$nextTick(() => {
        this.resize()
      })
    },
    'maxHeight': function (value, oldValue) {
      if (value === oldValue) return false

      this.$nextTick(() => {
        this.resize()
      })
    }
  },
  render: function (createElement) {
    const nodes = {
      wrapper: (children) => {
        return createElement('div', {
          class: ['bee-table--wp', {
            'bee-table--wp__empty': this.data.length === 0,
            'bee-table--wp__fixed--left': this.fixed.left && this.data.length && this.scrollbar.horizontal.visible,
            'bee-table--wp__fixed--right': this.fixed.right && this.data.length && this.scrollbar.horizontal.visible,
            'bee-table--wp__scroll-x': this.scrollbar.horizontal.visible,
            'bee-table--wp__scroll-y': this.scrollbar.vertical.visible
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
        }, [
          nodes.table({
            tableSize: this.tableSize
          })
        ])
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

      foot: () => {
        return createElement('div', {
          class: ['bee-table--footer'],
          style: {
            width: `${this.footer.width}px`,
            height: `${this.footer.height}px`,
            bottom: this.scrollbar.horizontal.visible ? `${this.scrollbar.horizontal.distance - this.borderWidth.bottom}px` : null
          },
          ref: 'footer'
        }, [
          nodes.table(null, {
            marginTop: `${this.footer.height}px`
          })
        ])
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
            right: type === 'right' ? `${this.scrollbar.vertical.distance - this.borderWidth.right - this.borderWidth.left}px` : null
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
          }, [nodes.table()]),
          createElement('div', {
            class: ['bee-table-fixed--footer'],
            style: {
              width: `${this.table.width}px`,
              height: `${this.footer.height}px`
            }
          }, [
            nodes.table(null, {
              marginTop: `${this.footer.height}px`
            })
          ])
        ])
      },

      table: (listener, style) => {
        return createElement(Table, {
          style: Object.assign({
            minWidth: `${this.table.minWidth}px`
          }, style),
          props: {
            data: this.data,
            columns: this.columns,
            slots: this.$slots.default,
            activeIndex: this.activeIndex,
            selections: this.selections,
            summary: this.summary,
            summaryMethod: this.summaryMethod,
            summaryText: this.summaryText
          },
          on: Object.assign({
            someToggle: this.someToggle,
            allToggle: this.allToggle
          }, listener)
        })
      }
    }

    return nodes.wrapper([
      nodes.body(),
      nodes.header(),
      this.data.length && this.scrollbar.vertical.visible ? nodes.foot() : null,
      this.fixed.left && this.data.length && this.scrollbar.horizontal.visible ? nodes.fixed('left') : null,
      this.fixed.right && this.data.length && this.scrollbar.horizontal.visible ? nodes.fixed('right') : null
    ])
  }
}

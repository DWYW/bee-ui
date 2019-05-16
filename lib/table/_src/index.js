import Listener from '../../utils/listener'
import Utils from '../../utils/utils'
import TableRect from './table'
import BeeScroll from '../../scroll'

import './index.less'

export default {
  name: 'BeeTable',
  components: {
    BeeScroll,
    TableRect
  },
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
  data () {
    return {
      columns: null,
      size: {
        tableMinWidth: null,
        tableWidth: null,
        tableHeight: null,
        viewWidth: null,
        viewHeight: null,
        headerHeight: null,
        footerHeight: null,
        leftWidth: null,
        rightWidth: null
      },
      scrollbar: {
        horizontal: false,
        vertical: false,
        start: true,
        end: false
      },
      selections: []
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.body.$nextTick(() => {
        this.updateSize()
        Listener.addListener(window, 'resize', this.resizeEvent)
      })
    })
  },
  updated () {
    this.$nextTick(() => {
      this.$refs.body.$nextTick(() => {
        this.updateSize()
      })
    })
  },
  beforeDestroy () {
    Listener.removeListener(window, 'resize', this.resizeEvent)
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

    /**
     * data initialize.
     */
    init () {
      if (!this.$slots.default) return []

      const column = {
        general: [],
        fixedLeft: [],
        fixedRight: []
      }

      const size = {
        minWidth: 0,
        fixedLeft: 0,
        fixedRight: 0
      }

      this.$slots.default.forEach((vNode, index) => {
        if (vNode.componentOptions && vNode.componentOptions.tag === 'bee-table-column') {
          const item = Object.assign({
            index
          }, this.vNodeProps(vNode))

          const itemWidth = parseInt(item.width)

          size.minWidth += itemWidth

          if (item.fixed === 'left') {
            size.fixedLeft += itemWidth
            column.fixedLeft.push(item)
          } else if (item.fixed === 'right') {
            size.fixedRight += itemWidth
            column.fixedRight.push(item)
          } else {
            column.general.push(item)
          }
        }
      })

      this.columns = [].concat(column.fixedLeft, column.general, column.fixedRight)

      this.$set(this.size, 'tableMinWidth', size.minWidth)
      this.$set(this.size, 'leftWidth', size.fixedLeft)
      this.$set(this.size, 'rightWidth', size.fixedRight)
    },

    updateSize () {
      // table size.
      const { width: tableWidth, height: tableHeight } = this.$refs.bodyTable.$el.getBoundingClientRect()
      const { width: bodyWidth } = this.$refs.body.$el.getBoundingClientRect()
      const _width = Math.max(tableWidth, bodyWidth)
      const _height = Math.min(tableHeight, this.maxHeight || this.height)

      if (Math.ceil(_width) !== this.size.tableWidth) {
        this.$set(this.size, 'tableWidth', Math.ceil(_width))
      }

      if (Math.ceil(_height) !== this.size.tableHeight) {
        this.$set(this.size, 'tableHeight', Math.ceil(_height))
      }

      // header
      const _headerHeight = this.$refs.bodyTable.$refs.thead.getBoundingClientRect().height

      if (Math.ceil(_headerHeight) !== this.size.headerHeight) {
        this.$set(this.size, 'headerHeight', Math.ceil(_headerHeight))
      }

      // footer
      if (this.$refs.bodyTable.$refs.tfoot) {
        const _footerHeight = this.$refs.bodyTable.$refs.tfoot.getBoundingClientRect().height

        if (Math.ceil(_footerHeight) !== this.size.footerHeight) {
          this.$set(this.size, 'footerHeight', Math.ceil(_footerHeight))
        }
      }

      // scrollbar infomation.
      const { horizontal, vertical } = this.$refs.body

      if (horizontal !== this.scrollbar.horizontal) {
        this.$set(this.scrollbar, 'horizontal', horizontal)
      }

      if (vertical !== this.scrollbar.vertical) {
        this.$set(this.scrollbar, 'vertical', vertical)
      }
    },

    resizeEvent () {
      this.updateSize()
    },

    scrollEvent (e) {
      const { scrollLeft, scrollTop, scrollWidth, clientWidth } = e.target

      if (this.$refs.header) {
        this.$refs.header.scrollLeft = scrollLeft
      }

      if (this.$refs.footer) {
        this.$refs.footer.scrollLeft = scrollLeft
      }

      if (this.$refs.leftBody) {
        this.$refs.leftBody.scrollTop = scrollTop
      }

      if (this.$refs.rightBody) {
        this.$refs.rightBody.scrollTop = scrollTop
      }

      if (this.scrollbar.vertical && scrollLeft === 0) {
        !this.scrollbar.start && this.$set(this.scrollbar, 'start', true)
      } else if (this.scrollbar.vertical && scrollLeft !== 0) {
        this.scrollbar.start && this.$set(this.scrollbar, 'start', false)
        this.scrollbar.end && scrollLeft < (scrollWidth - clientWidth) && this.$set(this.scrollbar, 'end', false)
        !this.scrollbar.end && scrollLeft >= (scrollWidth - clientWidth) && this.$set(this.scrollbar, 'end', true)
      }
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
  render (createElement) {
    const createTable = (params) => {
      const { style, listener, ref } = params || {}

      return createElement(TableRect, {
        style: Object.assign({
          minWidth: `${this.data.length && this.size.tableMinWidth}px`
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
        ref: ref,
        on: Object.assign({
          someToggle: this.someToggle,
          allToggle: this.allToggle
        }, listener)
      })
    }

    const createFixed = (type) => {
      return [
        createElement('section', {
          class: ['bee-table-fixed--body'],
          style: {
            width: `${this.size.tableWidth}px`,
            height: `${this.size.tableHeight}px`
          },
          ref: `${type}Body`
        }, [
          createTable()
        ]),

        createElement('section', {
          class: ['bee-table-fixed--header'],
          style: {
            width: `${this.size.tableWidth}px`,
            height: `${this.size.headerHeight}px`
          }
        }, [
          createTable()
        ])
      ]
    }

    return createElement('section', {
      class: ['bee-table--wp'],
      style: {
        height: `${this.height ? this.height : this.size.tableHeight}px`,
        maxHeight: `${this.maxHeight}px`
      }
    }, [
      // body rect.
      createElement(BeeScroll, {
        class: ['bee-table--body'],
        style: {
          height: `${this.height ? this.height : this.size.tableHeight}px`,
          maxHeight: `${this.maxHeight}px`
        },
        on: {
          'onScroll': this.scrollEvent
        },
        ref: 'body'
      }, [createTable({
        ref: 'bodyTable'
      })]),

      // header rect.
      this.data.length && this.scrollbar.horizontal ? createElement('section', {
        class: ['bee-table--header'],
        style: {
          height: `${this.size.headerHeight}px`
        },
        ref: 'header'
      }, [
        createTable({
          ref: 'headerTable'
        })
      ]) : null,

      // footer rect.
      this.data.length && this.scrollbar.horizontal && this.summary ? createElement('section', {
        class: ['bee-table--footer'],
        style: {
          height: `${this.size.footerHeight}px`
        },
        ref: 'footer'
      }, [
        createTable({
          ref: 'footerTable',
          style: {
            marginTop: `${this.size.footerHeight}px`
          }
        })
      ]) : null,

      // left rect.
      this.data.length && this.scrollbar.vertical && this.size.leftWidth ? createElement('section', {
        class: ['bee-table--fixed bee-table--fixed__left', {
          'bee-table--scroll__start': this.scrollbar.start
        }],
        style: {
          width: `${this.size.leftWidth}px`,
          height: `${this.size.tableHeight}px`
        }
      }, [
        createFixed('left')
      ]) : null,

      // right rect.
      this.data.length && this.scrollbar.vertical && this.size.rightWidth ? createElement('section', {
        class: ['bee-table--fixed bee-table--fixed__right', {
          'bee-table--scroll__end': this.scrollbar.end
        }],
        style: {
          width: `${this.size.rightWidth}px`,
          height: `${this.size.tableHeight}px`
        }
      }, [
        createFixed('right')
      ]) : null
    ])
  },
  watch: {
    'selections': function (value) {
      this.$emit('selectionChange', value)
    },
    'data': function (value, oldValue) {
      if (this.resetScroll) {
        this.$refs.body.$refs.body.scrollTop = 0
        this.$refs.body.$refs.body.scrollLeft = 0
      }
    }
  }
}

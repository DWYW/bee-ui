import './index.less'
import tableComponent from './table'
import Listener from '../../utils/listener'

export default {
  name: 'BeeTable',
  components: {
    tableComponent
  },
  props: {
    data: Array,
    height: [String, Number],
    maxHeight: [String, Number],
    placeholder: {
      type: String,
      default: '/'
    },
    activedIndex: Number,
    scrollDom: null
  },
  data () {
    return {
      columns: null,
      fixColumns: null,
      width: null,
      minWidth: null,
      head: {
        height: null
      },
      fixed: {
        width: null,
        height: null,
        hasLeft: false,
        hasRight: false,
        leftWidth: null,
        rightWidth: null,
        right: null,
        leftClass: 'bee-table--col__fix-left',
        rightClass: 'bee-table--col__fix-right',
        isStart: true,
        isEnd: true
      },
      colTagName: 'bee-table-column'
    }
  },
  created () {
    this.beforeMount()
  },
  mounted () {
    this.$nextTick(() => {
      this.resize()
      Listener.addListener(this.$refs.tbody, 'scroll', this.onScroll)
      Listener.addListener(window, 'resize', this.resize)

      // update props
      this.$emit('update:scrollDom', this.$refs.tbody)
    })
  },
  updated () {
    this.$nextTick(() => {
      this.resize()
    })
  },
  beforeDestroy () {
    Listener.removeListener(this.$refs.tbody, 'scroll', this.onScroll)
    Listener.removeListener(window, 'resize', this.resize)
  },
  methods: {
    beforeMount () {
      let { columns, minWidth, hasLeft, hasRight } = this.getTableData()
      this.columns = columns
      this.minWidth = minWidth
      this.$set(this.fixed, 'hasLeft', hasLeft)
      this.$set(this.fixed, 'hasRight', hasRight)
    },

    onScroll (evt) {
      const thead = this.$refs.thead
      const tbody = this.$refs.tbody
      thead.scrollLeft = tbody.scrollLeft
      this.$set(this.fixed, 'isStart', tbody.scrollLeft === 0)
      this.$set(this.fixed, 'isEnd', tbody.scrollLeft + tbody.clientWidth === tbody.scrollWidth)

      if (this.$refs.leftBody) {
        this.$refs.leftBody.querySelector('.bee-table-fix--body').scrollTop = tbody.scrollTop
      }

      if (this.$refs.rightBody) {
        this.$refs.rightBody.querySelector('.bee-table-fix--body').scrollTop = tbody.scrollTop
      }
    },

    resize () {
      this.setHeadSize()
      this.setFixedData()
      this.onScroll()
    },

    setHeadSize () {
      const tbody = this.$refs.tbody
      this.width = tbody.clientWidth
      this.$set(this.head, 'height', tbody.querySelector('thead').offsetHeight + 1)
    },

    setFixedData () {
      const tbody = this.$refs.tbody
      this.$set(this.fixed, 'width', tbody.scrollWidth)
      this.$set(this.fixed, 'height', tbody.clientHeight)
      this.$set(this.fixed, 'right', tbody.offsetWidth - tbody.clientWidth)

      const fixedLefts = tbody.getElementsByClassName(this.fixed.leftClass)
      let _fixedLeft = 0

      if (fixedLefts) {
        for (let i = 0; i < fixedLefts.length; i++) {
          _fixedLeft += fixedLefts[i].getBoundingClientRect().width
        }
      }

      this.$set(this.fixed, 'leftWidth', _fixedLeft)

      const fixedRights = tbody.getElementsByClassName(this.fixed.rightClass)
      let _fixedRight = 0

      if (fixedRights) {
        for (let i = 0; i < fixedRights.length; i++) {
          _fixedRight += fixedRights[i].getBoundingClientRect().width
        }
      }

      this.$set(this.fixed, 'rightWidth', _fixedRight)
      this.$set(this.fixed, 'hasLeft', tbody.scrollWidth !== tbody.clientWidth && this.data && this.data.length)
      this.$set(this.fixed, 'hasRight', tbody.scrollWidth !== tbody.clientWidth && this.data && this.data.length)
    },

    getTableData () {
      let _center = []
      let _left = []
      let _right = []
      let minWidth = 0

      this.$slots.default.forEach((vNode) => {
        if (vNode.componentOptions && vNode.componentOptions.tag === this.colTagName) {
          let _props = this.vNodeProps(vNode)
          minWidth += parseInt(_props.width) || 0

          if (_props.fixed === 'left') {
            _left.push(vNode)
          } else if (_props.fixed === 'right') {
            _right.push(vNode)
          } else {
            _center.push(vNode)
          }
        }
      })

      return {
        columns: [].concat(_left, _center, _right),
        minWidth: minWidth,
        hasLeft: _left.length && this.data && this.data.length,
        hasRight: _right.length && this.data && this.data.length
      }
    },

    /** get vNode props */
    vNodeProps (vNode) {
      let _component = new vNode.componentOptions.Ctor(vNode.componentOptions.propsData)
      return _component.$options._propKeys.reduce((target, key) => {
        if (_component.$options[key] !== undefined) {
          target[key] = _component.$options[key]
        }

        return target
      }, _component._props)
    },

    /** create wrapper node. */
    createWrapper (children) {
      return createElement => {
        return createElement('div', {
          class: {
            'bee-table--wp': true
          }
        }, children)
      }
    },

    /** create header wrapper node. */
    createHeadWrapper (children) {
      return createElement => {
        return createElement('div', {
          class: {
            'bee-table--head': true
          },
          style: {
            height: `${this.head.height}px`,
            maxWidth: `${this.width}px`
          }
        }, children)
      }
    },

    /** create bodyu wrapper node. */
    createHeadBody (children) {
      return createElement => {
        return createElement('div', {
          class: {
            'bee-table-head--body': true
          },
          ref: 'thead'
        }, children)
      }
    },

    /** create body wrapper node. */
    createBodyWrapper (children) {
      return createElement => {
        return createElement('div', {
          class: {
            'bee-table--body': true
          },
          style: {
            // marginTop: `-${this.head.height}px`,
            height: `${this.height}px`,
            maxHeight: `${this.maxHeight}px`
          },
          ref: 'tbody'
        }, children)
      }
    },

    createFixWrapper (children, type) {
      return createElement => {
        return createElement('div', {
          class: {
            'bee-table--fix': true,
            'bee-table--fix__left': type === 'left',
            'bee-table--fix__right': type === 'right',
            'bee-table--fix__start': type === 'left' && this.fixed.isStart,
            'bee-table--fix__end': type === 'right' && this.fixed.isEnd
          },
          style: {
            width: type === 'left' ? `${this.fixed.leftWidth}px` : `${this.fixed.rightWidth}px`,
            height: `${this.fixed.height}px`,
            left: type === 'left' ? 0 : null,
            right: type === 'right' ? `${this.fixed.right}px` : null
          },
          ref: type + 'Body'
        }, children)
      }
    },

    createFixHeadWrapper (children) {
      return createElement => {
        return createElement('div', {
          class: {
            'bee-table-fix--head': true
          },
          style: {
            width: `${this.fixed.width}px`,
            height: `${this.head.height}px`
          }
        }, children)
      }
    },

    createFixBodyWrapper (children) {
      return createElement => {
        return createElement('div', {
          class: {
            'bee-table-fix--body': true
          },
          style: {
            width: `${this.fixed.width}px`,
            height: `${this.fixed.height}px`
          }
        }, children)
      }
    }
  },
  render: function (createElement) {
    let _props = {
      columns: this.columns,
      data: this.data,
      minWidth: this.minWidth,
      placeholder: this.placeholder,
      activedIndex: this.activedIndex
    }

    return this.createWrapper([
      // create head
      this.createHeadWrapper([
        this.createHeadBody([
          createElement(tableComponent, {
            props: Object.assign({}, _props, {
              type: 'head'
            })
          })
        ])(createElement)
      ])(createElement),
      // create body
      this.createBodyWrapper([
        createElement(tableComponent, {
          props: Object.assign({}, _props, {
            type: 'body'
          })
        })
      ])(createElement),

      // create fix left
      this.fixed.hasLeft ? this.createFixWrapper([
        this.createFixHeadWrapper([
          createElement(tableComponent, {
            props: Object.assign({}, _props, {
              type: 'fixed'
            })
          })
        ])(createElement),

        this.createFixBodyWrapper([
          createElement(tableComponent, {
            props: Object.assign({}, _props, {
              type: 'fixed'
            })
          })
        ])(createElement)
      ], 'left')(createElement) : null,

      // create fix right
      this.fixed.hasRight ? this.createFixWrapper([
        this.createFixHeadWrapper([
          createElement(tableComponent, {
            props: Object.assign({}, _props, {
              type: 'fixed'
            })
          })
        ])(createElement),

        this.createFixBodyWrapper([
          createElement(tableComponent, {
            props: Object.assign({}, _props, {
              type: 'fixed'
            })
          })
        ])(createElement)
      ], 'right')(createElement) : null
    ])(createElement)
  }
}

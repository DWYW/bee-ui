// https://vuejs.org/v2/guide/components-edge-cases.html#Recursive-Components

import helpers from '../../utils/helpers'

export default {
  name: 'tree-node',
  inject: ['treeInstance'],
  props: {
    nodeData: Object,
    nodeKey: String
  },
  data () {
    return {
      toggle: this.initToggle(),
      duration: 300
    }
  },
  computed: {
    transition () {
      const prefix = ['-webkit-', '-moz-', '-ms-', '-o-', '']
      return prefix.map(item => `${item}transition: height ${this.duration / 1000}s;`)
    }
  },
  created () {
    this.initSelected()
  },
  methods: {
    beforeEnter (el) {
      el.style.height = 0
    },

    enter (el) {
      setTimeout(() => {
        el.style.height = `${el.scrollHeight}px`
      }, 15)
    },

    afterEnter (el) {
      el.style.height = ''
    },

    beforeLeave (el) {
      el.style.height = `${el.scrollHeight}px`
    },

    leave (el) {
      // Solve the problem that some browsers cannot display animation effects.
      setTimeout(() => {
        el.style.height = 0
      }, 15)
    },

    afterLeave (el) {
      el.style.height = ''
    },

    initToggle () {
      const { defaultUnfoldAll, foldDisabled, defaultUnfold } = this.treeInstance
      let _toggle = foldDisabled ? true : defaultUnfoldAll

      if (helpers.typeof(defaultUnfold, 'function')) {
        _toggle = defaultUnfold(this.nodeKey, this.nodeData) || false
      }

      return _toggle
    },

    initSelected () {
      const { children } = this.nodeData
      const { selectedKey, halfSelectedKey } = this.treeInstance

      if (!children) {
        this.$set(this.nodeData, halfSelectedKey, 0)
        return
      }

      const childrenSlectedCount = children.reduce((count, item) => {
        if (helpers.getValueByPath(item, selectedKey)) {
          count.all++
        }

        if (helpers.getValueByPath(item, halfSelectedKey)) {
          count.half++
        }

        return count
      }, {
        all: 0,
        half: 0
      })

      if (childrenSlectedCount.all === children.length) {
        this.$set(this.nodeData, halfSelectedKey, 0)
        this.$set(this.nodeData, selectedKey, 1)
      } else {
        this.$set(this.nodeData, halfSelectedKey, Number(childrenSlectedCount.all > 0 || childrenSlectedCount.half > 0))
        this.$set(this.nodeData, selectedKey, 0)
      }
    },

    toggleChildren () {
      const { loaded } = this.nodeData
      const { loadData } = this.treeInstance

      if (loadData && !loaded) {
        this.getAsyncData()
      } else {
        this.toggle = !this.toggle
      }
    },

    getAsyncData () {
      this.$set(this.nodeData, 'loaded', 1)

      const { loadData, selectedKey } = this.treeInstance
      loadData(this.nodeKey, this.nodeData).then((children) => {
        this.nodeData.loaded = 2

        if (helpers.typeof(children, 'array')) {
          this.$set(this.nodeData, 'children', children)
          this.toggle = !this.toggle

          // update
          let selected = Number(helpers.getValueByPath(this.nodeData, selectedKey)) || 0

          if (selected) {
            this.setChildrenSelected(this.nodeData.children, selected, this.nodeKey)
          }
        }
      }).catch(() => {
        this.nodeData.loaded = 0
      })
    },

    toggleChecked (selected) {
      if (this.nodeData.children) {
        // set self selected status by watch nodeData.children.
        this.setChildrenSelected(this.nodeData.children, selected, this.nodeKey)
      } else {
        this.$set(this.nodeData, this.treeInstance.selectedKey, selected)
      }
    },

    itemChecked () {
      let selected = Number(helpers.getValueByPath(this.nodeData, this.treeInstance.selectedKey)) || 0
      selected = ~selected + 2

      this.toggleChecked(selected)

      this.treeInstance.onChecked({
        value: selected,
        key: this.nodeKey,
        data: this.nodeData,
        instance: this
      })
    },

    setChildrenSelected (children, value, nodeKey) {
      if (!helpers.typeof(children, 'array')) return false

      const { selectedKey, nodeDisabled } = this.treeInstance

      children.forEach((item, key) => {
        const _childNodeKey = `${nodeKey}-${key}`
        const _nodeDisabled = nodeDisabled ? nodeDisabled(_childNodeKey, item) : false

        if (!_nodeDisabled) {
          this.$set(item, selectedKey, value)
        }

        if (item.children) {
          this.setChildrenSelected(item.children, value, _childNodeKey)
        }
      })
    }
  },
  render (h) {
    const { children, loaded } = this.nodeData
    const { nameKey, selectedKey, halfSelectedKey, foldIcon, foldDisabled, foldLine, nodeDisabled, loadData } = this.treeInstance

    const _nodeDisabled = nodeDisabled ? nodeDisabled(this.nodeKey, this.nodeData) : false

    // checkbox
    function TreeNodeSelectedIcon () {
      const getIcon = (data) => {
        if (!data.children) {
          return helpers.getValueByPath(data, selectedKey) ? 'checkbox-selected' : 'checkbox-unselected'
        }

        if (helpers.getValueByPath(data, selectedKey)) {
          return 'checkbox-selected'
        } else if (helpers.getValueByPath(data, halfSelectedKey)) {
          return 'selected-part'
        } else {
          return 'checkbox-unselected'
        }
      }

      return h('bee-icon', {
        class: 'select-status',
        props: {
          icon: getIcon(this.nodeData)
        },
        on: _nodeDisabled ? undefined : {
          click: this.itemChecked
        }
      })
    }

    // fold and unfold
    function TreeNodeToggle () {
      let hasEvents = true
      let vnodes = []

      if (children || (loadData && !loaded)) {
        vnodes = [
          h('bee-icon', {
            props: {
              fontFamily: foldIcon.fontFamily,
              icon: this.toggle ? foldIcon.icons[0] : foldIcon.icons[1]
            }
          })
        ]
      } else if (loadData && loaded === 1) {
        hasEvents = false
        vnodes = [
          h('bee-icon', {
            props: {
              icon: 'loading-icon'
            }
          })
        ]
      }

      return h('span', {
        class: ['toggle-icon'],
        on: hasEvents ? {
          click: this.toggleChildren
        } : ''
      }, vnodes)
    }

    // tree node content.
    function TreeNodeContent () {
      let contentChilren = []

      if (this.treeInstance.$scopedSlots && this.treeInstance.$scopedSlots.default) {
        contentChilren = [
          !foldDisabled && TreeNodeToggle.bind(this)(),
          this.treeInstance.$scopedSlots.default({
            data: this.nodeData,
            key: this.nodeKey,
            instance: this
          })
        ]
      } else {
        contentChilren = [
          !foldDisabled && TreeNodeToggle.bind(this)(),
          TreeNodeSelectedIcon.bind(this)(),
          h('span', {
            class: ['node-name']
          }, [
            helpers.getValueByPath(this.nodeData, nameKey)
          ])
        ]
      }

      return h('p', {
        class: ['node-content', {
          'node_disabled': _nodeDisabled
        }]
      }, contentChilren)
    }

    // tree node children.
    function TreeNodeChildren () {
      return h('ul', {
        class: ['tree-child-tree', foldLine ? `fold-line_${foldLine}` : null],
        ref: 'children'
      }, children.map((child, key) => {
        return h('tree-node', {
          props: {
            nodeData: child,
            nodeKey: `${this.nodeKey}-${key}`
          },
          key: `${this.nodeKey}-${key}`
        })
      }))
    }

    // render return
    return h('li', {
      class: ['tree-node']
    }, [
      TreeNodeContent.bind(this)(),
      children && h('transition', {
        props: {
          name: 'tree-children'
        },
        on: {
          'beforeEnter': this.beforeEnter,
          'enter': this.enter,
          'afterEnter': this.afterEnter,
          'beforeLeave': this.beforeLeave,
          'leave': this.leave,
          'afterLeave': this.afterLeave
        }
      }, [
        this.toggle ? TreeNodeChildren.bind(this)() : ''
      ])
    ])
  },
  watch: {
    'toggle': function (value, oldValue) {
      if (value !== oldValue) this.treeInstance.onToggle({
        value: value,
        key: this.nodeKey,
        data: this.nodeData,
        instance: this
      })
    },
    'nodeData.children': {
      deep: true,
      handler: function (value) {
        this.initSelected()
      }
    }
  }
}

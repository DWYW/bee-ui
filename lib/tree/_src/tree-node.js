import helpers from '../../utils/helpers'

export default {
  name: 'TreeNode',
  inject: ['_treeVm'],
  props: {
    node: Object,
    paths: Array
  },
  data () {
    return {
      loaded: false,
      loading: false,
      enterTimeout: 0,
      leaveTimeout: 0
    }
  },
  computed: {
    nodeName () {
      return helpers.getValueByPath(this.node, this._treeVm.nameAttr)
    },
    childrenSelectedRate () {
      const { selectedAttr, unrelated } = this._treeVm
      if (unrelated) return 0

      const { children } = this.node

      if (!children || children.length === 0) return 0
      const rate = children.reduce((count, item) => {
        if (helpers.getValueByPath(item, selectedAttr)) count++
        return count
      }, 0) / children.length

      this.$set(this.node, selectedAttr, rate > 0)

      return rate
    },
    nodeDisabled () {
      const { disabledAttr } = this._treeVm
      return helpers.getValueByPath(this.node, disabledAttr)
    },
    nodeIsSelected () {
      const { selectedAttr } = this._treeVm
      return helpers.getValueByPath(this.node, selectedAttr, false)
    },
    childrenIsFold () {
      const { foldAttr, foldDefault } = this._treeVm
      return helpers.getValueByPath(this.node, foldAttr, foldDefault)
    },
    foldIcon () {
      const { loadChildren, foldDisabled, foldIcon } = this._treeVm
      if (this.loading) return 'loading-icon'
      if (!this.loaded && loadChildren) return foldIcon.fold

      if (helpers.getValueByPath(this.node, 'children.length', 0) === 0 || foldDisabled) return ''

      return this.childrenIsFold ? foldIcon.fold : foldIcon.unfold
    }
  },
  methods: {
    onBeforeEnter (el) {
      el.style.height = 0
    },
    onEnter (el) {
      if (this.enterTimeout) clearTimeout(this.enterTimeout)

      this.enterTimeout = setTimeout(() => {
        el.style.height = `${el.scrollHeight}px`
      }, 16)
    },
    onAfterEnter (el) {
      el.style.height = ''

      this._treeVm.$emit('fold', {
        value: false,
        node: this.node,
        paths: this.paths,
        vm: this
      })
    },
    onBeforeLeave (el) {
      el.style.height = `${el.scrollHeight}px`
    },
    onLeave (el) {
      if (this.leaveTimeout) clearTimeout(this.leaveTimeout)

      this.leaveTimeout = setTimeout(() => {
        el.style.height = '0px'
      }, 16)
    },
    onAfterLeave (el) {
      this.$nextTick(() => {
        el.style.height = ''
      })

      this._treeVm.$emit('fold', {
        value: true,
        node: this.node,
        paths: this.paths,
        vm: this
      })
    },
    updateChildrenSelected (children, value) {
      if (!children || children.length === 0) return

      const { selectedAttr, disabledAttr } = this._treeVm
      children.forEach((child) => {
        if (!helpers.getValueByPath(child, disabledAttr)) {
          this.$set(child, selectedAttr, value)
          this.updateChildrenSelected(child.children, value)
        }
      })
    },
    foldChildren () {
      const { foldAttr, loadChildren, unrelated } = this._treeVm
      if (!this.loaded && loadChildren) {
        if (this.loading) return
        this.loading = true

        loadChildren({ data: this.node, paths: this.paths, vm: this }).then((res) => {
          this.loaded = true

          if (helpers.typeof(res, 'array')) {
            if (!unrelated && this.nodeIsSelected) {
              this.updateChildrenSelected(res, this.this.nodeIsSelected)
            }

            this.$set(this.node, 'children', res)
            this.$set(this.node, foldAttr, !this.childrenIsFold)
          }
        }).catch(() => {}).finally(() => {
          this.loading = false
        })
      } else {
        this.$set(this.node, foldAttr, !this.childrenIsFold)
      }
    },
    changeNodeChecked () {
      const { disabledAttr, unrelated, loadChecked, selectedAttr } = this._treeVm
      const { children } = this.node
      const promise = loadChecked ? loadChecked({ value: !this.nodeIsSelected, data: this.node, vm: this }) : Promise.resolve(!this.nodeIsSelected)

      promise.then((_value) => {
        if (children && children.length) {
          const isSelectedAllChildren = !children.some((child) => {
            return !helpers.getValueByPath(child, selectedAttr) && !helpers.getValueByPath(child, disabledAttr)
          })

          if (isSelectedAllChildren && _value) _value = false
        }

        this.$set(this.node, selectedAttr, _value)

        if (!unrelated) {
          this.updateChildrenSelected(children, _value)
        }

        this._treeVm.$emit('checked', {
          value: _value,
          node: this.node,
          paths: this.paths,
          vm: this
        })
      })
    }
  },
  render (h) {
    return h('li', {
      class: ['tree-node', { disabled: this.nodeDisabled }]
    }, [
      renderTreeNodeContent.call(this, h),
      h('transition', {
        props: {
          name: 'tree-children'
        },
        on: {
          'beforeEnter': this.onBeforeEnter,
          'enter': this.onEnter,
          'afterEnter': this.onAfterEnter,
          'beforeLeave': this.onBeforeLeave,
          'leave': this.onLeave,
          'afterLeave': this.onAfterLeave
        }
      }, [
        renderChildrenContent.call(this, h)
      ])
    ])
  }
}

function renderFoldIcon (h) {
  const events = {}

  if (this.foldIcon) {
    events.click = this.foldChildren
  }

  return h('bee-icon', {
    class: 'fold-icon',
    props: {
      icon: this.foldIcon
    },
    on: events
  })
}

function renderCheckboxIcon (h) {
  let icon = this.nodeIsSelected ? 'checkbox-selected' : 'checkbox-unselected'
  if (this.childrenSelectedRate > 0 && this.childrenSelectedRate < 1) {
    icon = 'selected-part'
  }

  const events = {}
  if (!this.nodeDisabled) {
    events.click = this.changeNodeChecked
  }

  return h('bee-icon', {
    class: 'selected-icon',
    props: {
      icon: icon
    },
    on: events
  })
}

function renderTreeNodeContent (h) {
  if (this._treeVm.$scopedSlots && this._treeVm.$scopedSlots.default) {
    return this._treeVm.$scopedSlots.default({
      data: this.node,
      vm: this
    })
  }

  return h('div', {
    class: 'tree-node-content'
  }, [
    renderFoldIcon.call(this, h),
    renderCheckboxIcon.call(this, h),
    h('span', {
      class: 'node-name'
    }, [this.nodeName])
  ])
}

function renderChildrenContent (h) {
  const { children } = this.node
  if (!children || children.length === 0) return null

  const { foldDisabled, disabledAttr } = this._treeVm
  if (!foldDisabled && this.childrenIsFold) return null

  return h('ul', {
    class: 'bee-tree node-tree'
  }, children.map((child, idx) => {
    if (this.nodeDisabled) {
      child[disabledAttr] = this.nodeDisabled
    }

    return h('tree-node', {
      props: {
        node: child,
        paths: this.paths.concat([idx])
      }
    })
  }))
}

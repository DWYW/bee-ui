<template>
  <ul class="bee-tree">
    <tree-node
      v-for='(child, key) in data'
      :key='key + ""'
      :node-key='key + ""'
      :node-data='child'
    ></tree-node>
  </ul>
</template>

<script>
import TreeNode from './tree-node'
import helpers from '../../utils/helpers'

export default {
  name: 'BeeTree',
  provide () {
    return {
      treeInstance: this
    }
  },
  components: {
    TreeNode
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    nameKey: {
      type: String,
      default: 'name'
    },
    selectedKey: {
      type: String,
      validator: (value) => /^\w+$/.test(value),
      default: 'selected'
    },
    halfSelectedKey: {
      type: String,
      validator: (value) => /^\w+$/.test(value),
      default: 'halfSelected'
    },
    foldIcon: {
      type: Object,
      default: () => ({
        fontFamily: undefined,
        icons: ['arr-down', 'arr-right']
      })
    },
    foldDisabled: {
      type: Boolean,
      default: false
    },
    foldLine: {
      type: String,
      validator: (value) => /^(solid|dashed)$/.test(value)
    },
    defaultUnfoldAll: {
      type: Boolean,
      default: false
    },
    defaultUnfold: Function,
    nodeDisabled: Function,
    loadData: Function
  },
  methods: {
    recursive (data, containHalfSelected) {
      let selected = []

      if (!helpers.typeof(data, 'array')) return selected

      let i = 0

      while (i < data.length) {
        const item = data[i++]

        if (helpers.getValueByPath(item, this.selectedKey)) {
          selected.push(item)
        } else if (containHalfSelected && helpers.getValueByPath(item, this.halfSelectedKey)) {
          selected.push(item)
        }

        if (item.children) {
          selected = selected.concat(this.recursive(item.children, containHalfSelected))
        }
      }

      return selected
    },

    getSelectedNode (containHalfSelected) {
      return this.recursive(this.data, containHalfSelected)
    },

    onChecked (checked, key, data) {
      this.$nextTick(() => {
        if (this.$listeners.checked) {
          this.$listeners.checked(Boolean(checked), key, data)
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

<template>
  <ul class="bee-tree">
    <tree-node v-for="(child, key) in tree" :key="child[primaryAttr]"
      :node="child"
      :paths="[key]"
    ></tree-node>
  </ul>
</template>

<script>
import TreeNode from './tree-node'

export default {
  name: 'BeeTree',
  components: {
    TreeNode
  },
  provide () {
    return {
      _treeVm: this
    }
  },
  props: {
    tree: {
      type: Array,
      required: true
    },
    primaryAttr: {
      type: String,
      default: 'id'
    },
    nameAttr: {
      type: String,
      default: 'name'
    },
    foldIcon: {
      type: Object,
      default: () => ({
        fold: 'arr-right',
        unfold: 'arr-down'
      })
    },
    foldAttr: {
      type: String,
      default: 'fold'
    },
    foldDisabled: {
      type: Boolean,
      default: false
    },
    foldDefault: {
      type: Boolean,
      default: true
    },
    selectedAttr: {
      type: String,
      default: 'selected'
    },
    disabledAttr: {
      type: String,
      default: 'disabled'
    },
    unrelated: {
      type: Boolean,
      default: false
    },
    loadChildren: Function,
    loadChecked: Function
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

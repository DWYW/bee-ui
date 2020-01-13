<template>
  <bee-popper
    class="alias-select-option"
    :scroll-parent="scrollParent"
    :reference="reference"
    @beforeEnter='beforeEnter'
    @afterLeave='afterLeave'
    v-model='open'
  >
    <div :style="styles">
      <template v-for='(item, key) in options'>
        <div class="option--item"
          :key="key"
          v-if='selected !== getValue(item)'
          @click='onSelected(item)'
        >
          <div class="option-item--content">{{getValue(item)}}</div>
        </div>
      </template>
    </div>
  </bee-popper>
</template>

<script>
export default {
  data () {
    return {
      open: false,
      refrence: null,
      scrollParent: null,
      options: [],
      optionKey: '',
      selected: '',
      onSelected: null
    }
  },
  computed: {
    styles () {
      return {
        maxWidth: this.maxWidth,
        minWidth: this.minWidth,
        minHeight: this.minHeight
      }
    }
  },
  mounted () {
    document.body.appendChild(this.$el)
    this.open = true
  },
  destroyed () {
    if (this._vnode.elm.parentNode) {
      this._vnode.elm.parentNode.removeChild(this._vnode.elm)
    }
  },
  methods: {
    afterLeave () {
      this.$destroy()
    }
  }
}
</script>

<style lang="less">
  @import './select-options.less';
</style>

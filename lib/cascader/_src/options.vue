<template>
  <bee-popper class="bee-cascader-options"
    :reference='reference'
    :scroll-parent="scrollParent"
    @beforeEnter='beforeEnter'
    @afterLeave='afterLeave'
    v-model='open'
    ref='popper'
  >
   <section class="bee-cascader-item-options" v-for="(item, key) in optionsData" :key="key">
      <bee-scrollbar>
        <template v-for="(option, optionKey) in item">
          <div :class="['options--item', {
            'options--item__actived': itemIsActived(option),
            'options--item__disabled': getItemDisabled(option)
          }]"
            :key="optionKey"
            @click="optionItemSelected(option, key)"
          >
            <span>{{getItemLabel(option)}}</span>
            <bee-icon icon="right" v-if="option.children && option.children.length > 0"></bee-icon>
          </div>
        </template>
      </bee-scrollbar>
   </section>
  </bee-popper>
</template>

<script>
export default {
  data () {
    return {
      open: false,
      reference: null,
      selected: [],
      options: [],
      optionKey: null,
      optionsData: []
    }
  },
  created () {
    this.updateOptions(this.selected)
  },
  mounted () {
    document.body.appendChild(this.$el)
    this.open = true

    this.$nextTick(() => {
      this.updateScollTop()
    })
  },
  destroyed () {
    if (this._vnode.elm.parentNode) {
      this._vnode.elm.parentNode.removeChild(this._vnode.elm)
    }
  },
  methods: {
    beforeEnter () {
      this._beforeEnter()
    },
    afterLeave () {
      this._afterLeave()
      this.$destroy()
    },
    itemIsActived (data) {
      return this.selected.indexOf(this.getItemValue(data)) > -1
    },
    updateOptions (selected = []) {
      const _options = [this.options]
      let i = 0
      let data = this.options
      let selectItem = selected[i++]

      while (data && selectItem) {
        const _item = data.find(v => this.getItemValue(v) === selectItem)

        if (!_item || !_item.children) break

        data = _item.children
        _options.push(data)
        selectItem = selected[i++]
      }

      this.optionsData = _options
    },
    updateScollTop () {
      const selects = this.$el.querySelectorAll('.options--item__actived')
      let i = 0

      while (i < selects.length) {
        const _item = selects[i++]
        const _itemParent = _item.parentNode
        _itemParent.scrollTop = _item.offsetTop - _itemParent.offsetTop
      }
    },
    optionItemSelected (data, index) {
      if (this.getItemDisabled(data)) return

      const _selected = this.selected.slice(0, index)
      _selected.push(this.getItemValue(data))
      this.selected = _selected

      this.$nextTick(() => {
        this.$refs.popper.updatePosition()

        switch (this.type) {
          case 'last':
            if (!(data.children && data.children.length > 0)) this.onPick(_selected)
            break
          case 'every':
            this.onPick(_selected, !data.children)
            break
        }
      })
    }
  },
  watch: {
    'selected': function (value) {
      this.updateOptions(value)
    }
  }
}
</script>

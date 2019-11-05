<template>
  <bee-popper class="select-options-"
    :scroll-parent="scrollParent"
    :reference="reference"
    v-model='open'
    @beforeEnter='beforeEnter'
    @afterLeave='afterLeave'
    ref='popper'
    >
    <bee-scrollbar class="options--body"
      :style='{minWidth: `${minWidth}px`}'
      show-type='hover'
      ref='scrollbar'
    >
      <!-- option list -->
      <div v-for='(option, key) in options' :key='key' :class="['option--item', {
        'option--item__selected': itemIsSelected(option)
      }]" @click='selectItem(option)'>
        <span>{{optionLabel(option)}}</span>

        <bee-icon class="item-icon" icon='correct' v-if='itemIsSelected(option)'></bee-icon>
      </div>

      <!-- nothing can be selected -->
      <div v-if='options.length === 0' class="options__empty" @click='selectItem()'>{{$_language('SELECT_EMPTY')}}</div>
    </bee-scrollbar>
  </bee-popper>
</template>

<script>
import helpers from '../../utils/helpers'

export default {
  data () {
    return {
      selected: [],
      open: false,
      options: null,
      optionKey: null,
      multiple: null,
      scrollParent: null,
      reference: null,
      minWidth: null,
      onSelected: null
    }
  },
  computed: {
    optionLabel () {
      return (data) => helpers.getValueByPath(data, this.optionKey.label)
    },
    optionValue () {
      return (data) => helpers.getValueByPath(data, this.optionKey.value)
    }
  },
  mounted () {
    document.body.appendChild(this.$el)
    this.open = true

    this.$nextTick(() => {
      this.$refs.scrollbar.updateSizeConfig()
    })
  },
  destroyed () {
    if (this._vnode.elm.parentNode) {
      this._vnode.elm.parentNode.removeChild(this._vnode.elm)
    }
  },
  methods: {
    beforeEnter () {},

    afterLeave () {
      this.$destroy()
    },

    selectItem (option) {
      if (!option) {
        this.onSelected()
        return
      }

      const _value = this.optionValue(option)

      if (this.multiple) {
        const _index = this.selected.findIndex(item => item === _value)

        if (_index > -1) {
          this.selected.splice(_index, 1)
        } else {
          this.selected.push(_value)
        }
      } else {
        this.selected = [_value]
      }

      this.onSelected(this.selected)
    },

    itemIsSelected (option) {
      return this.selected.findIndex(item => item === this.optionValue(option)) > -1
    },

    setSelected (values) {
      this.selected = values
      this.onSelected(this.selected)
    }
  },
  watch: {
    'options': function () {
      this.$refs.scrollbar.updateSizeConfig()
    }
  }
}
</script>

<style lang="less">
  @import './select-options.less';
</style>

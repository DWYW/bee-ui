<template>
  <span :class='["select--wp", {
    "select__placeholder": selectedItem === null && !selectedItems.toString(),
    "select__multiple": multiple,
    "select__disabled": disabled
  }]' @click='openOptions' ref='wrapper'>
    <span class="select--body">
      <!-- multiple -->
      <span class="select--text" v-if='multiple'>
        <span class='select-text--wp' v-for='(item, key) in selectedLabels' :key='"label_item_" + key'>
          {{item}}
          <bee-icon icon='error' @click.stop='removeItem(key)'></bee-icon>
        </span>
        <span class="select-text--wp" v-if='selectedItems && !selectedItems.length'>{{placeholder}}</span>
      </span>

      <!-- base -->
      <span class="select--text" v-else>
        <!-- use search -->
        <input type="text" class="select--input" ref='input' v-if='isSearch' :disabled='disabled' :readonly='readonly' v-model='selectedLabel' :placeholder='placeholder'>

        <!-- no search -->
        <span class="select-text--wp" v-else>
          {{selectedLabel || placeholder}}
        </span>
      </span>
    </span>

    <bee-icon class="select--icon" icon='arr-down'></bee-icon>
  </span>
</template>

<script>
import Vue from 'vue'
import Listener from '../../utils/listener'
import Options from './Options.vue'
import { deepValue } from '../../utils/object'

const OptionsConstructor = Vue.extend(Options)

export default {
  name: 'BeeSelect',
  props: {
    type: {
      type: String,
      default: 'auto'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    optionKey: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value'
        }
      }
    },
    searchLength: {
      type: Number,
      default: 10
    },
    placeholder: String,
    scrollDom: null,
    value: ''
  },
  data () {
    return {
      _wrapper: null,
      _instance: null,
      backup: {
        value: null,
        label: null
      },
      selectedItem: null,
      selectedLabel: null,
      selectedItems: [],
      selectedLabels: [],
      readonly: true
    }
  },
  computed: {
    isSearch () {
      return (this.type === 'search' || (this.type === 'auto' && this.options.length >= this.searchLength)) && !this.multiple
    }
  },
  mounted () {
    this._wrapper = this.$refs.wrapper
    this.init(this.value)
  },
  beforeDestroy () {
    this.closeOptions()
  },
  methods: {
    /**
     * 数据初始化
     * @param  {Any} value 当前的this.value值
     */
    init (value) {
      if (value !== undefined && value !== null) {
        if (this.multiple) {
          this.selectedItems = value
          this.selectedLabels = this.getSelectedLabel(this.selectedItems)
        } else {
          this.selectedItem = value
          this.selectedLabel = this.getSelectedLabel(this.selectedItem)
          this.setBackupData()
        }
      } else {
        // 重置value
        if (this.multiple) {
          this.selectedItems = []
          this.selectedLabels = []
        } else {
          this.selectedItem = null
          this.selectedLabel = null
        }
      }
    },

    /**
     * 打开options选择层
     */
    openOptions () {
      if (this.disabled || this._instance) return

      if (this.isSearch) {
        this.readonly = false
        this.$refs.input.focus()
        this.$refs.input.select()
      }

      const _config = {
        followDom: this._wrapper,
        scrollDom: this.scrollDom,
        multiple: this.multiple,
        options: this.options,
        optionKey: this.optionKey,
        pickerCallBack: this.pickerCallBack,
        value: this.multiple ? this.selectedItems : this.selectedItem,
        textContainerWidth: this._wrapper.offsetWidth,
        textContainerHeight: !this.multiple ? this._wrapper.offsetHeight : null
      }

      this._instance = new OptionsConstructor({ data: _config })
      this._instance.vm = this._instance.$mount()
      this._instance.dom = this._instance.vm.$el
      document.body.appendChild(this._instance.dom)

      setTimeout(() => {
        Listener.addListener(document, 'click', this.closeOptions)
      })
    },

    /**
     * 关闭options选择层
     */
    closeOptions () {
      if (this._instance) {
        const scrollRect = this._instance.$refs.ScrollRect

        if (scrollRect && scrollRect.switch) {
          return false
        }

        this.readonly = true
        this._instance.vm.$destroy()
        document.body.removeChild(this._instance.dom)
        this._instance = null
        Listener.removeListener(document, 'click', this.closeOptions)

        if (this.isSearch && this.selectedLabel !== this.backup.label && this.selectedItem === this.backup.value) {
          this.selectedLabel = this.backup.label
        }
      }
    },

    /**
     * 值是否发生了改变
     * @param  {any} option 选中的options item
     * @param  {any} option 选中的options item
     */
    isChanged (current, next) {
      if (this.multiple) {
        if (this.arrayIsEqual(current, next)) return false
      } else {
        if (current === next) return false
      }

      this.$nextTick(() => {
        this.$emit('change', next)
      })
    },

    /**
     * 拾取后的回调函数
     * @param  {Object} option 选中的options item
     * @param  {Number} index  选中的item的索引号
     */
    pickerCallBack (option, index) {
      option = Object.assign({}, option)

      if (this.multiple) {
        let findIndex = this.selectedItems.indexOf(deepValue(this.optionKey.value, option))

        if (findIndex === -1) {
          // add
          this.selectedItems.push(deepValue(this.optionKey.value, option))
          this.selectedLabels.push(deepValue(this.optionKey.label, option))
        } else {
          // remove
          this.selectedItems.splice(findIndex, 1)
          this.selectedLabels.splice(findIndex, 1)
        }

        this.isChanged(this.value, this.selectedItems)
        this.$emit('input', [].concat(this.selectedItems))
        this.$nextTick(() => {
          this._instance.vm.$refs.menu.setPosition()
          this._instance.textContainerWidth = this._wrapper.offsetWidth
        })
      } else {
        this.setBackupData()
        this.selectedItem = deepValue(this.optionKey.value, option)
        this.selectedLabel = deepValue(this.optionKey.label, option)
        this.isChanged(this.value, this.selectedItem)
        this.$emit('input', deepValue(this.optionKey.value, option))
        this.closeOptions()
      }
    },

    /** 设置备份数据，用于搜索类型的下拉组件恢复数据 */
    setBackupData () {
      if (this.isSearch) {
        this.$set(this.backup, 'value', this.selectedItem)
        this.$set(this.backup, 'label', this.selectedLabel)
      }
    },

    /**
     * 获取选中的label值
     * @param  {String} value 当前选中的值
     * @return {String}       当前选中值对应的label值
     */
    getSelectedLabel (value) {
      let label = value instanceof Array ? [] : ''
      if (this.options.length === 0) return label

      if (value instanceof Array) {
        for (let i = 0; i < value.length; i++) {
          let _item = this.options.find((item) => {
            let _value = deepValue(this.optionKey.value, item)
            return _value === value[i] || _value === (value[i] + '')
          })

          if (_item) {
            label.push(deepValue(this.optionKey.label, _item))
          }
        }
      } else {
        // 单选下拉
        for (let i = 0; i < this.options.length; i++) {
          let _value = deepValue(this.optionKey.value, this.options[i])

          if (_value === value || _value === (value + '')) {
            label = deepValue(this.optionKey.label, this.options[i])
            break
          }
        }
      }

      return label
    },

    /**
     * 通过过滤字段过滤options
     * @param  {String} filterWord 过滤字段
     * @return {Array}
     */
    filterOptions (filterWord) {
      if (!filterWord) return this.options

      let _options = []

      this.options.forEach((item) => {
        deepValue(this.optionKey.label, item).match(filterWord) ? _options.push(item) : null
      })

      return _options
    },

    /**
     * 多选时，点击叉号，删除点击项
     * @param  {Number} index item的索引值
     */
    removeItem (index) {
      if (this.disabled) return false

      this.selectedItems.splice(index, 1)
      this.selectedLabels.splice(index, 1)
      this.isChanged(this.value, this.selectedItems)
      this.$emit('input', [].concat(this.selectedItems))
    },

    /**
     * 判断两个简单数组是否相等
     * @param {Array} arr1
     * @param {Array} arr2
     */
    arrayIsEqual (arr1, arr2) {
      if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false

      if (arr1.length !== arr2.length) return false

      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return false
        }
      }

      return true
    }
  },
  watch: {
    options (opts) {
      // 如果不存在下拉选项，则将选中内容置空
      if (opts.length === 0) {
        if (this.multiple) {
          this.selectedItems = []
          this.selectedLabels = []
        } else {
          this.selectedItem = null
        }
      } else {
        this.init(this.value)
      }
    },
    value (value) {
      if (this.multiple) {
        if (!this.arrayIsEqual(value, this.selectedItems)) this.init(value)
      } else {
        this.init(value)
      }
    },
    selectedLabel (value) {
      if (this._instance) {
        this._instance.options = this.filterOptions(value)
      }
    }
  }
}
</script>

<style lang='less'>
@import '../../theme.less';
@root: select;

.@{root}--wp {
  min-width: @select-min-width;
  height: @select-height;
  line-height: @select-height;
  display: inline-flex;
  border: 1px solid @select-border-color;
  border-radius: @border-radius;
  box-sizing: border-box;
  position: relative;
  align-items: center;
  cursor: pointer;
  color: @font-color;
  user-select: none;
  background-color: @select-bg-color;

  .@{root}--body, .@{root}--icon {
    display: inline-block;
  }

  .@{root}--icon {
    flex: 0 1 20px;
    color: @font-tint-color;
  }

  .@{root}--body {
    flex: 1 1 auto;
    width: calc(~'100% - 20px');

    .@{root}--text {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      height: @select-height;
      vertical-align: middle;

      .@{root}-text--wp, .@{root}--input {
        outline: none;
        border: none;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
        padding: 0 5px;
        font-size: 13px;
      }

      .@{root}--input {
        height: @select-height;
        background: transparent;
        color: @font-color;

        &::placeholder {
          color: @placeholder-color;
        }
      }

      .@{root}-text--wp {
        display: inline-block;
      }
    }
  }

  &.@{root}__placeholder {
    color: @placeholder-color;
  }

  &.@{root}__multiple {

    line-height: @select-height;

    &:not(.@{root}__placeholder) {
      height: auto;
      line-height: initial;

      .@{root}--body {
        .@{root}--text {
          overflow: hidden;
          line-height: initial;
          height: auto;
          .@{root}-text--wp {
            display: block;
            width: auto;
            height: 24px;
            line-height: 24px;
            border-radius: @border-radius;
            margin: 2px auto 2px 2px;
            background-color: @select-multiple-item-bg;
            float: left;

            .bee--font {
              color: @border-color;

              &:hover {
                color: @font-tint-color;
              }
            }
          }
        }
      }
    }
  }

  &.@{root}__disabled {
    cursor: no-drop;
    background-color: @select-disabled-bg;
    opacity: .6;

    &.@{root}__multiple {
      .@{root}--body {
        .@{root}--text {
          .@{root}-text--wp {
            .bee--font:hover {
              color: @border-color;
            }
          }
        }
      }
    }
  }
}

</style>

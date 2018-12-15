<template>
  <bee-menu :follow-target='followDom' :scroll-dom='scrollDom' :autoHide='!multiple' ref='menu'>

    <ul class='options--wp' :style='{minWidth: `${textContainerWidth}px`}'>
      <!-- has options -->
      <template v-if='options.length'>
        <li :class='["options--item", {
          "options__selected": isSelectedItem(option),
          "options__multiple": multiple
          }]'
          :style='{lineHeight: (textContainerHeight - 2) + "px"}'
          v-for='(option, index) in options'
          @click='pickerItem(option, index)'
          :key='"option_item_" + deepValue(optionKey.value, option)'
        >
          {{deepValue(optionKey.label, option)}}
          <bee-icon class='multiple--icon' icon='correct' v-if='multiple'></bee-icon>
        </li>
      </template>

      <!-- no options -->
      <li v-if='!options.length' class='options--item' :style='{lineHeight: (textContainerHeight - 2) + "px"}'>暂无可选项</li>
    </ul>
  </bee-menu>
</template>

<script>
import { deepValue } from '../../utils/object'

export default {
  name: 'BeeSelectOptions',
  data () {
    return {
      deepValue: deepValue
    }
  },
  updated () {
    this.$nextTick(() => {
      // 重新计算menu的位置
      this.$refs.menu.setPosition()
    })
  },
  methods: {
    /**
     * 拾取选项
     * @param  {Object} option 选中的options item
     * @param  {Number} index  选中的item的索引号
     */
    pickerItem (option, index) {
      this.pickerCallBack(option, index)
    },

    /**
     * 判断是否是选中的option
     * @param  {Object} option 要判断的option
     */
    isSelectedItem (option) {
      if (this.value === null && this.value === undefined) return

      if (this.value instanceof Array) {
        // 多选
        return this.value.indexOf(this.deepValue(this.optionKey.value, option)) !== -1
      } else {
        // 单选
        return this.deepValue(this.optionKey.value, option) === this.value
      }
    }
  }
}
</script>

<style lang="less">
@import '../../theme.less';

@root: options;

.@{root}--wp {
  list-style: none;
  border: 1px solid @select-border-color;
  min-width: @select-min-width;
  border-radius: @border-radius;
  background-color: @select-options-bg-color;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 28px * 8 + 2px;
  color: @font-tint-color;

  .@{root}--item {
    line-height: 28px;
    list-style: none;
    cursor: pointer;
    padding: 0 8px;
    transition: background 0.2s;
    white-space: nowrap;

    &.@{root}__multiple {
      padding-right: 20px;

      .multiple--icon {
        float: right;
        margin-right: -16px;
        font-size: 13px;
        display: none;
      }
    }

    &.@{root}__selected {
      color: @font-color;

      .multiple--icon {
        display: block;
      }
    }

    &:hover {
      background-color: @select-options-hover-bg-color;
    }
  }
}
</style>

<template>
  <div :class='["quick-btn--wp", "quick-btn__" + quickBtnsType]'>
    <div :class='["quick-btn--item", {
      "quick-btn--item__actived": isActived(btn.value),
    }]'
    v-for='(btn, key) in quickBtns'
    :key='"date_panel_quick_btn_" + key'
    @click='picker(btn)'>
      {{btn.label}}
    </div>
  </div>
</template>

<script>
import utils from './utils'

export default {
  props: {
    quickBtns: Array,
    quickBtnsType: String,
    isRange: Boolean,
    callback: Function,
    value: [Date, Array]
  },
  data () {
    return {}
  },
  methods: {
    /**
     * 当前按钮是否是选中状态
     * @param {Array|Date} value 当前按钮的值
     * @return {Boolean}
     */
    isActived (value) {
      return this.value && this.value.toString() === value.toString()
    },

    /**
     * 快速按钮拾取
     *  @param {Array|Date} value 当前按钮的值
     */
    picker (data) {
      if (utils.typeof(this.callback) === 'function') {
        this.callback(data)
      }
    }
  }
}
</script>

<style lang="less">
@import '../../theme.less';
@root: quick-btn;

.@{root}--wp {
  width: @picker-quick-btn-width;
  height: 100%;
  padding: 10px 0;
  user-select: none;
  box-sizing: border-box;

  .@{root}--item {
    padding: 0 10px;
    line-height: 28px;
    cursor: pointer;
    transition: 0.15s ease;
  }

  &.@{root}__inner {
    .@{root}--item {
      &:hover {
        color: @primary-color;
      }
      &.@{root}--item__actived {
        color: @primary-color;
      }
    }
  }

  &.@{root}__outer {
    width: auto;
    padding: 0;
    display: inline-block;
    white-space: nowrap;
    vertical-align: middle;

    .@{root}--item {
      display: inline-block;
      line-height: @ipt-height - 2px;
      height: @ipt-height - 2px;
      border: 1px solid @picker-border-color;
      border-radius: @border-radius;
      color: @font-tint-color;
      margin-right: 4px;

      &.@{root}--item__actived {
        color: @primary-color;
        border-color: @primary-color;
      }
    }
  }
}
</style>

<template>
  <ul class='picker-time-item--wp' :style='{
    width: width + "%"
  }' ref='itemWrapper' @mouseenter='mountedPadding'>

    <li :class='["picker-time-item--item", "picker-time-item--item__" + item.value, {
      "picker-time-item--item__selected": selected === item.value,
      "picker-time-item--item__disabled": item.disabled
    }]'
    v-for='(item, index) in data'
    :key='"item_" + index'
    @click='picker(item)'>
      <span>{{item.value}}</span>
    </li>

    <li :style="{
      height: paddingBottom
    }"></li>
  </ul>
</template>

<script>
import utils from './utils'

export default {
  props: {
    data: Array,
    type: Number,
    width: Number,
    value: Number
  },
  data () {
    return {
      paddingBottom: null,
      isAnimation: false,
      interTimer: null,
      selected: null
    }
  },
  mounted () {
    this.paddingBottom = `${this.$refs.itemWrapper.getBoundingClientRect().height - 24}px`

    this.$nextTick(() => {
      let hasSelected = this.data.findIndex(item => Number(item.value) === this.value)

      if (hasSelected > -1) {
        this.selected = this.data[hasSelected].value
        this.$refs.itemWrapper.scrollTop = hasSelected * 24
      }
    })
  },
  methods: {
    mountedPadding (e) {
      this.paddingBottom = `${e.target.getBoundingClientRect().height - 24}px`
    },

    picker (data) {
      clearInterval(this.interTimer)

      if (data.disabled) {
        data = this.data.find(item => !item.disabled)
      }

      if (!data) {
        data = this.data.find(item => item.value === this.selected)
      }

      this.isAnimation = true
      let itemTop = this.$refs.itemWrapper.querySelector('.picker-time-item--item__' + data.value).getBoundingClientRect().top
      let wrapperTop = this.$refs.itemWrapper.getBoundingClientRect().top
      this.animation(itemTop - wrapperTop)
      this.selected = data.value
      this.$emit('picker', {
        value: data.value,
        type: this.type
      })
    },

    animation (len) {
      if (len === 0) {
        this.isAnimation = false
        return false
      }

      let start = this.$refs.itemWrapper.scrollTop
      let _time = 300
      let _times = 20
      let stepLen = len / _times

      this.interTimer = window.setInterval(() => {
        stepLen += stepLen

        if (start + stepLen >= start + len) {
          clearInterval(this.interTimer)
          this.$refs.itemWrapper.scrollTop = start + len
          this.isAnimation = false
        } else {
          this.$refs.itemWrapper.scrollTop = start + stepLen
        }
      }, _time / _times)
    }
  },
  watch: {
    value: function (value, oldValue) {
      if (value !== oldValue) {
        this.picker({
          value: utils.two(value),
          type: this.type
        })
      }
    }
  }
}
</script>

<style lang="less">
@import '../../theme.less';
@root: picker-time-item;

.@{root}--wp {
  height: 100%;
  overflow: hidden;
  float: left;
  box-sizing: border-box;
  cursor: pointer;

  > li {
    list-style: none;
    text-align: left;
    font-size: 13px;
    line-height: 24px;
  }

  >li.@{root}--item {
    >span {
      display: block;
    }
    &.@{root}--item__selected {
      background-color: @picker-time-selected-bg-color;
      font-weight: bold;
    }
    &.@{root}--item__disabled {
      color: @font-tint-color;
      &:hover {
        background-color: inherit;
      }
    }
    &:hover {
      background-color: @picker-time-selected-bg-color;
    }
  }

  &:hover {
    overflow-y: auto;
  }

  &:not(:last-child) {
    border-right: 1px solid @picker-border-color;
  }
}
</style>

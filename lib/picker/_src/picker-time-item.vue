<template>
  <div class="bee-picker-time--item" :style="{
    width: width
  }">
    <bee-scrollbar showType="hover" :scroll-element.sync='scrollbar'>
      <template  v-for='(item, key) in configuration'>
        <div :key="key" :class="['time-value--item', {
          'time-value--item__selected': item.selected,
          'time-value--item__disabled': item.disabled
        }]" :data-value='item.value'
        @click="itemSelect(item)"
      >
          <span>{{item.label}}</span>
        </div>
      </template>

      <div :style="fillStyle"></div>
    </bee-scrollbar>
  </div>
</template>

<script>
export default {
  props: {
    configuration: Array,
    width: String,
    type: String,
    callback: Function
  },
  data () {
    return {
      fillStyle: null,
      isAnimation: false,
      interTimer: null,
      scrollbar: null
    }
  },
  mounted () {
    this.setFillStyle()

    this.$nextTick(() => {
      this.init(false)
    })
  },
  methods: {
    init (animation = true) {
      clearInterval(this.interTimer)
      const selected = this.configuration.find(item => item.selected)

      if (selected.disabled) {
        this.itemSelect(selected)
      } else {
        if (!this.scrollbar) return

        const offsetTop = this.$el.querySelector(`[data-value='${selected.value}']`).offsetTop

        if (animation) {
          this.animation(offsetTop)
        } else {
          this.scrollbar.scrollTop = offsetTop
        }
      }
    },

    setFillStyle () {
      if (!this.$el) return null

      this.fillStyle = {
        width: '100%',
        height: `${(this.$el.clientHeight) - 24}px`
      }
    },

    /**
     * Item on selected.
     * @param {Object} data selected item configuration
     */
    itemSelect (data) {
      clearInterval(this.interTimer)

      if (data.disabled) {
        data = this.configuration.find(item => !item.disabled && item.value > data.value)
      }

      if (!data) return

      this.isAnimation = true
      this.animation(this.$el.querySelector(`[data-value='${data.value}']`).offsetTop)
      this.callback(data)
    },

    /**
     * The animation for reset scroll-top.
     * @param {Number} distance target offsetTop
     */
    animation (distance) {
      if (distance === 0 || !this.scrollbar) {
        this.isAnimation = false
        return false
      }

      distance -= this.scrollbar.scrollTop
      let start = this.scrollbar.scrollTop
      let _time = 300
      let _times = 20
      let stepLen = distance / _times

      this.interTimer = window.setInterval(() => {
        stepLen += stepLen

        if (start + stepLen >= start + distance) {
          clearInterval(this.interTimer)
          this.scrollbar.scrollTop = start + distance
          this.isAnimation = false
        } else {
          this.scrollbar.scrollTop = start + stepLen
        }
      }, _time / _times)
    }
  },
  watch: {
    'configuration': function () {
      this.init()
    }
  }
}
</script>

<style lang="less">
  @import './picker-time-item.less';
</style>

<template>
  <bee-menu :class='["picker--pop", {
    "pop__btns": hasQuickBtns
  }]'
  :follow-target='followDom'
  :scroll-dom='scrollDom'
  :has-arr='false'
  :auto-hide='false'
  ref='menu'>
    <div class="pop--wp">
      <quick-btns v-if='hasQuickBtns && this.pickerType === "date"'
        :callback="quickBtnPicked"
        :quick-btns='quickBtns'
        :quick-btns-type='quickBtnsType'
        :is-range='isRange'
        :value='value'></quick-btns>

      <Date v-if='pickerType === "date"'
        :callback='datePicked'
        :disabled='disabled'
        :format='format'
        :is-range='isRange'
        :is-need-time='isNeedTime'
        :max-days='maxDays'
        :static-text='text'
        :type='type'
        :value='value'
      ></Date>

      <Time v-else
        :callback='timePicked'
        :disabled='timeDisabled'
        :format='format'
        :is-range='isRange'
        :static-text='text'
        :type='type'
        :value='value'
      ></Time>
    </div>

    <section :class='["pop--switch", {
      "pop--switch__abled": !this.timePickerDisabled
    }]' v-if='isNeedTime'>
      <span @click='pickerTypeSwitch("time")' v-if='pickerType === "date"'>{{text.selectTime}}</span>

      <span @click='pickerTypeSwitch("date")' v-else>{{text.selectDate}}</span>

      <span :class='["switch--btn"]' @click='close'>
        {{text.comfim}}
      </span>
    </section>
  </bee-menu>
</template>

<script>
import Date from './Date.vue'
import Time from './Time.vue'
import QuickBtns from './QuickBtns.vue'

export default {
  components: {
    Date, Time, QuickBtns
  },
  data () {
    return {
      pickerType: 'date',
      timePickerDisabled: true
    }
  },
  computed: {
    hasQuickBtns () {
      return this.quickBtns && this.quickBtns.length && this.quickBtnsType === 'inner'
    }
  },
  created () {
    this.timePickerDisabled = !this.value
  },
  methods: {
    /**
     * 选择类型切换
     * @param {String} type 选择类型 date|time
     */
    pickerTypeSwitch (type) {
      if (type === 'time' && this.timePickerDisabled) return false

      this.pickerType = type
    },

    /**
     * 日期拾取后的回调
     * @param {Date|DateArray} date 拾取的日期值
     * @param {Date|DateArray} date 拾取的类型 pick|other
     */
    datePicked (date, type) {
      this.timePickerDisabled = !date

      if (date) {
        this.value = date
        this.callback(date, type)
      }
    },

    /**
     * 时间拾取后的回调
     * @param {Date} date 拾取的日期时间
     */
    timePicked (date) {
      if (date) {
        this.value = date
        this.callback(date, 'pick')
      }
    },

    /**
     * 快速按钮的拾取回调
     * @param {Object} data 拾取的快速按钮的信息
     */
    quickBtnPicked (data) {
      this.value = data.value
      this.quickCallback(data, 'quick')
    },

    /**
     * 关闭选择区域
     */
    close () {
      if (this.timePickerDisabled) return false

      this.closePicker()
    }
  }
}
</script>

<style lang="less">
@import '../../theme.less';
@root: picker;
@pop: pop;

.@{root}--pop {
  display: inline-block;
  border: 1px solid @picker-border-color;
  border-radius: @border-radius;
  background-color: @picker-bg-color;
  color: @font-color;
  font-size: 14px;
  word-break: break-word;

  .@{pop}--wp {
    display: flex;
    height: @picker-pop-height;
  }

  .@{pop}--switch {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding: 6px 10px;
    color: @font-tint-color;
    border-top: 1px solid @picker-border-color;
    user-select: none;

    &.@{pop}--switch__abled > span{
      color: @primary-color;
    }

    .switch--btn {
      cursor: pointer;
    }
  }

  &.@{pop}__btns {
    .date--wp {
      border-left: 1px solid @picker-border-color;
    }
  }
}
</style>

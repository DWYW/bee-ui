<template>
  <div class="date--wp">
    <div class='date--header'>
      <bee-icon icon='prev' @click='prevYear()'></bee-icon>
      <bee-icon icon='left' @click='prevMonth()'></bee-icon>
      <span class='date-header--ym'>
        {{dateData.year}}{{staticText.year}}{{dateData.month + 1}}{{staticText.month}}
      </span>
      <bee-icon icon='right' @click='nextMonth()'></bee-icon>
      <bee-icon icon='next' @click='nextYear()'></bee-icon>
    </div>

    <div class='date--body'>
      <!-- 危险提示 -->
      <transition name='warn-message'>
        <div class="date-body--message" v-if='daysOverflow'>
          {{staticText.maxDays.replace(/{day}/, maxDays)}}
        </div>
      </transition>

      <!-- label -->
      <div class='date-body--title'>
        <span v-for='item in staticText.week' :key='item'>{{item}}</span>
      </div>

      <!-- body -->
      <div class='date-body--container'>
        <div :class='mountClassNames(dateData.prevMonthDays - dateData.prevDays + day, 1)'
          v-for='day in dateData.prevDays'
          :key='"day_prev_" + day'
          @mouseenter='dateRange(dateData.prevMonthDays - dateData.prevDays + day, 1)'
          @click='picker(dateData.prevMonthDays - dateData.prevDays + day, 1)'>
          <div class='item--text'>
            {{dateData.prevMonthDays - dateData.prevDays + day}}
          </div>
        </div>

        <div :class='mountClassNames(day, 2)'
          v-for='day in dateData.days'
          :key='"day_" + day'
          @mouseenter='dateRange(day, 2)'
          @click='picker(day, 2)'>
          <div :class='["item--text", {
            "item--text__selected": selectedDate && getStamp(day, 2) === new Date(selectedDate.year, selectedDate.month, selectedDate.date, 0, 0, 0).getTime(),
            "item--text__today": getStamp(day, 2) === today.times
          }]'>{{day}}</div>
        </div>

        <div :class='mountClassNames(day, 3)'
          v-for='day in dateData.nextDays'
          :key='"day_next_" + day'
          @mouseenter='dateRange(day, 3)'
          @click='picker(day, 3)'>
          <div class='item--text'>{{day}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from './utils'

export default {
  props: {
    type: String,
    staticText: Object,
    maxDays: Number,
    disabled: Function,
    format: String,
    callback: Function,
    isRange: Boolean,
    isNeedTime: Boolean,
    defaultTime: [Object, Function],
    value: [Date, Array] // date or dateArray
  },
  data () {
    return {
      dateData: null,
      rangeStart: null,
      rangeEnd: null,
      isHalfSelected: null, // 范围选择记录选择了开始日期
      selectedDate: null,
      daysOverflow: null,
      daysOverflowTime: 1000
    }
  },
  computed: {
    today () {
      let _now = new Date()
      return utils.date2object(new Date(_now.getFullYear(), _now.getMonth(), _now.getDate(), 0, 0, 0))
    }
  },
  created () {
    this.dataInit()
  },
  methods: {
    /**
     * 信息初始化
     */
    dataInit () {
      if (this.value) {
        if (this.isRange) {
          let _start = utils.date2object(this.value[0])
          let _end = utils.date2object(this.value[1])
          this.rangeStart = utils.date2object(new Date(_start.year, _start.month, _start.date, 0, 0, 0))
          this.rangeEnd = utils.date2object(new Date(_end.year, _end.month, _end.date, 0, 0, 0))
          this.dateData = utils.date2object(new Date(_start.year, _start.month, 1, 0, 0, 0))
        } else {
          let _date = utils.date2object(this.value)
          this.dateData = utils.date2object(new Date(_date.year, _date.month, 1, 0, 0, 0))
          this.selectedDate = _date
        }
      } else {
        let { year, month } = this.today
        this.dateData = utils.date2object(new Date(year, month, 1, 0, 0, 0))
      }
    },

    /* 上一年 */
    prevYear () {
      let { year, month } = this.dateData
      let _newDate = new Date(year - 1, month, 1, 0, 0, 0)
      this.dateData = utils.date2object(_newDate)
    },

    /* 下一年 */
    nextYear () {
      let { year, month } = this.dateData
      let _newDate = new Date(year + 1, month, 1, 0, 0, 0)
      this.dateData = utils.date2object(_newDate)
    },

    /* 上一个月 */
    prevMonth () {
      let { year, month } = this.dateData
      let _prevMonth = (month + 11) % 12
      let _newYear = month ? year : year - 1
      let _newDate = new Date(_newYear, _prevMonth, 1, 0, 0, 0)
      this.dateData = utils.date2object(_newDate)
    },

    /* 下一个月 */
    nextMonth () {
      let { year, month } = this.dateData
      let _nextMonth = (month + 1) % 12
      let _newYear = _nextMonth ? year : year + 1
      let _newDate = new Date(_newYear, _nextMonth, 1)
      this.dateData = utils.date2object(_newDate)
    },

    /* 获取当前状态下的年月 */
    getYearMonth (type) {
      let _dateData = this.dateData
      let _year = null
      let _month = null

      switch (type) {
        case 1:
          // 上一年
          _year = _dateData.month === 0 ? _dateData.year - 1 : _dateData.year
          _month = (_dateData.month + 11) % 12
          break
        case 3:
          // 下一年
          _month = (_dateData.month + 1) % 12
          _year = _month ? _dateData.year : _dateData.year + 1
          break
        default:
          // 当前月
          _year = _dateData.year
          _month = _dateData.month
      }

      return { year: _year, month: _month }
    },

    /* 获取当前日期的时间戳 */
    getStamp (day, type) {
      let { year, month } = this.getYearMonth(type)
      return utils.date2Stamp(new Date(year, month, day, 0, 0, 0))
    },

    // 不可用过滤
    disableFilter (day, type) {
      if (!this.disabled) {
        return false
      }

      let { year, month } = this.getYearMonth(type)

      return this.disabled(new Date(year, month, day, 0, 0, 0))
    },

    /* 计算hover所在日期 */
    dateRange (day, type) {
      if (!this.isHalfSelected) {
        return false
      }

      if (this.disableFilter(day, type)) {
        return false
      }

      let { year, month } = this.getYearMonth(type)
      let _date = utils.date2object(new Date(year, month, day, 0, 0, 0))

      if (_date.times >= this.rangeStart.times) {
        this.rangeEnd = _date
      } else {
        this.rangeEnd = null
      }
    },

    /**
     * 获取每个日期class值
     */
    mountClassNames (day, type) {
      let { year, month } = this.dateData
      let rangeStart = this.rangeStart
      let rangeEnd = this.rangeEnd
      let className = {
        'container--item': true,
        'container--item__prev': type === 1,
        'container--item__next': type === 3
      }

      if (type === 2) {
        let _times = utils.date2Stamp(new Date(year, month, day, 0, 0, 0))

        if (this.isRange) {
          className['container--item__selected'] = rangeEnd && rangeStart && _times >= rangeStart.times && _times <= rangeEnd.times
          className['container--item__start'] = rangeStart && _times === rangeStart.times
          className['container--item__end'] = rangeEnd && _times === rangeEnd.times
        }
      }

      className['container--item__disabled'] = this.disableFilter(day, type)

      return className
    },

    /**
     * 获取默认时间
     */
    getDefaultTime () {
      const _timeData = utils.typeof(this.defaultTime) === 'function' ? this.defaultTime() : this.defaultTime
      let _data = {
        startHour: (_timeData && _timeData.startHour) || 0,
        startMinute: (_timeData && _timeData.startMinute) || 0,
        startSecond: (_timeData && _timeData.startSecond) || 0,
        endHour: (_timeData && _timeData.endHour) || 23,
        endMinute: (_timeData && _timeData.endMinute) || 59,
        endSecond: (_timeData && _timeData.endSecond) || 59
      }

      if (utils.typeof(this.value) === 'date') {
        _data.startHour = this.value.getHours()
        _data.startMinute = this.value.getMinutes()
        _data.startSecond = this.value.getSeconds()
      } else if (utils.typeof(this.value) === 'array') {
        if (utils.typeof(this.value[0]) === 'date') {
          _data.startHour = this.value[0].getHours()
          _data.startMinute = this.value[0].getMinutes()
          _data.startSecond = this.value[0].getSeconds()
        }

        if (utils.typeof(this.value[1]) === 'date') {
          _data.endHour = this.value[1].getHours()
          _data.endMinute = this.value[1].getMinutes()
          _data.endSecond = this.value[1].getSeconds()
        }
      }

      return _data
    },

    /* 日期拾取 */
    picker (day, type) {
      if (this.disableFilter(day, type)) {
        return false
      }

      if (this.isRange) {
        this.rangePicker(day, type)
      } else {
        let { year, month } = this.getYearMonth(type)
        const { startHour, startMinute, startSecond } = this.getDefaultTime()
        this.selectedDate = utils.date2object(new Date(year, month, day, 0, 0, 0))
        this.callback(new Date(year, month, day, startHour, startMinute, startSecond), 'pick')
      }
    },

    rangePicker (day, type) {
      let { year, month } = this.getYearMonth(type)

      // 选择开始时间
      if (!this.isHalfSelected) {
        if (type !== 2) {
          this.dateData = utils.date2object(new Date(year, month, 1, 0, 0, 0))
        }

        this.isHalfSelected = true
        this.rangeStart = utils.date2object(new Date(year, month, day, 0, 0, 0))
        this.rangeEnd = null
        this.callback(null, 'pick')

      // 选择结束时间
      } else {
        let _date = utils.date2object(new Date(year, month, day, 0, 0, 0))

        // 如果结束时间小于开始时间，则将结束时间设置为开始时间
        if (_date.times < this.rangeStart.times) {
          this.rangeStart = _date

          if (type !== 2) {
            this.dateData = Object.assign({}, _date)
          }

        // 如果选择的范围大于设定的最大选择范围， 则取消此次的选择结果
        } else if (this.maxDays && _date.times - this.rangeStart.times >= this.maxDays * 24 * 3600 * 1000) {
          clearTimeout(this.daysOverflow)

          this.daysOverflow = setTimeout(() => {
            this.daysOverflow = null
          }, this.daysOverflowTime)

        // 选择结束时间
        } else {
          this.isHalfSelected = false
          this.rangeEnd = _date

          const { startHour, startMinute, startSecond, endHour, endMinute, endSecond } = this.getDefaultTime()
          let _startDate = new Date(this.rangeStart.year, this.rangeStart.month, this.rangeStart.date, startHour, startMinute, startSecond)
          let _endDate = new Date(this.rangeEnd.year, this.rangeEnd.month, this.rangeEnd.date, endHour, endMinute, endSecond)

          if (_endDate < _startDate) {
            _endDate = _startDate
          }

          this.callback([_startDate, _endDate], 'pick')
        }
      }
    }
  }
}
</script>

<style lang="less">
@import '../../theme.less';
@root: date;

.@{root}--wp {
  width: @picker-pop-width;
  height: 100%;
  padding: 10px;
  display: inline-block;
  box-sizing: border-box;

  .@{root}--header {
    width: 100%;
    line-height: @picker-pop-header-height;
    font-size: 16px;
    display: flex;
    justify-content: center;

    .bee--font {
      font-size: 14px;
      font-weight: bold;
      color: @font-tint-color;
      flex: 0 1 @picker-pop-header-height;
      text-align: center;
      cursor: pointer;
      transition: color 0.15s;
      &:active {
        color: @primary-color;
      }
    }
    .@{root}-header--ym {
      display: inline-block;
      flex: 1 1 auto;
      text-align: center;
    }
  }

  .@{root}--body {
    width: 100%;
    padding-top: 20px;
    position: relative;

    .@{root}-body--message {
      width: 100%;
      height: 34px;
      line-height: 34px;
      font-size: 14px;
      text-align: center;
      background-color: @picker-bg-color;
      color: @primary-color;
      position: absolute;
      top: 10px;
      left: 0;
    }

    .date-message-enter-active,
    .date-message-leave-active {
      transition: opacity .2s;
    }
    .date-message-enter,
    .date-message-leave-to {
      opacity: 0;
    }

    .@{root}-body--title {
      display: flex;
      border-bottom: 1px solid @picker-border-color;
      line-height: 24px;
      >span {
        flex: 1 1 auto;
        text-align: center;
      }
    }
    .@{root}-body--container {
      display: flex;
      flex-wrap: wrap;
      padding: 10px 0 0;
      cursor: pointer;

      .container--item {
        flex: 0 1 100%/7;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        margin: 3px 0;
        user-select: none;

        .item--text {
          width: 26px;
          height: 26px;
          line-height: 26px;
          border-radius: 50%;
          &.item--text__today {
            color: @primary-color;
          }
          &.item--text__selected {
            background-color: @primary-color;
            color: @primary-font-color  !important;
          }
        }
        &:hover .item--text {
          color: @primary-color;
        }

        &.container--item__selected {
          background-color: @picker-range-selected-bg-color;
        }
        &.container--item__start {
          background-color: @picker-range-selected-bg-color;
          border-top-left-radius: 18px;
          border-bottom-left-radius: 18px;
          .item--text{
            background-color: @primary-color;
            color: @primary-font-color;
          }
        }
        &.container--item__end {
          background-color: @picker-range-selected-bg-color;
          border-top-right-radius: 18px;
          border-bottom-right-radius: 18px;
          .item--text {
            background-color: @primary-color;
            color: @primary-font-color;
          }
        }

        &.container--item__prev, &.container--item__next {
          color: @picker-border-color;
          &:hover .day-text {
            color: @picker-border-color;
          }
        }
        &.container--item__disabled {
          cursor: no-drop;
          color: @picker-border-color;
          &:hover .item--text {
            color: @picker-border-color;
          }
          .item--text.item--text__today {
            color: @picker-border-color;
          }
        }
      }
    }
  }
}
</style>

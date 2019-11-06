<template>
  <section class="bee-picker-date">
    <!-- header -->
    <div class="bee-picker-date--header">
      <bee-icon icon="prev" class="date-year__prev" @click="updateMounteDate('prevYear')"></bee-icon>
      <bee-icon icon="left" class="date-month__prev" @click="updateMounteDate('prevMonth')"></bee-icon>
      <div class="date-header--text">
        {{mounteDate.year}}{{$_language('YEAR')}}
        {{mounteDate.month + 1}}{{$_language('MONTH')}}
      </div>
      <bee-icon icon='right' class="date-month__next" @click="updateMounteDate('nextMonth')"></bee-icon>
      <bee-icon icon='next' class="date-year__next" @click="updateMounteDate('nextYear')"></bee-icon>
    </div>

    <!-- body -->
    <div class="bee-picker-date--body">
      <!-- days overflow -->
      <transition name='bee-picker-days-overflow'>
        <div class="bee-picker--days-overflow" v-if='daysOverflow'>
          {{$_language('PICKER_MAX_DAYS', {
            day: maxDays
          })}}
        </div>
      </transition>

      <!-- week labels -->
      <div class="date-week--labels">
        <span class="date-week-label--item"
          v-for='(label, key) in weekLabels'
          :key='key'
        >{{label}}</span>
      </div>

      <!-- date days -->
      <div class="date--days">
        <!-- prev month -->
        <div :class="['date--item', 'date--item__prev']"
          v-for="day in mounteDate.prevDays"
          :key="'prev-' + day"
          @click.stop="onSelected(mounteDate.prevMonthDays - mounteDate.prevDays + day, 'prevMonth')"
        >
          <span class="date-item--text">{{mounteDate.prevMonthDays - mounteDate.prevDays + day}}</span>
        </div>

        <!-- current month -->
        <div :class="['date--item', 'date--item__current', {
          'date--item__today': isToday(mounteDate.year, mounteDate.month, day),
          'date--item__selected': isSelectedDay(mounteDate.year, mounteDate.month, day),
          'date--item__range': isInRange(mounteDate.year, mounteDate.month, day),
          'date--item__range-start': isBoundingRange(mounteDate.year, mounteDate.month, day).start,
          'date--item__range-end': isBoundingRange(mounteDate.year, mounteDate.month, day).end,
          'date--item__disabled': isDisabledDay(day, 'currentMonth')
        }]"
          v-for='day in mounteDate.days'
          :key="'current-' + day"
          @click.stop="onSelected(day, 'currentMonth')"
          @mouseenter="rangeEndPreview(day, 'currentMonth')"
        >
          <div class="date-item--text">{{day}}</div>
        </div>

        <!-- next month -->
        <div :class="['date--item', 'date--item__next']"
          v-for="day in mounteDate.nextDays"
          :key="'next-' + day"
          @click.stop="onSelected(day, 'nextMonth')"
        >
          <div class="date-item--text">{{day}}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import helpers from '../../utils/helpers'
import dateHelpers from '../../utils/date'

export default {
  props: {
    type: String,
    disabled: [Function, Boolean],
    defaultTime: [Function, Object],
    callback: Function,
    updateTimeDisabled: Function,
    maxDays: [Number, String],
    value: [Date, Array]
  },
  data () {
    return {
      mounteDate: null,
      rangeStart: null,
      rangeEnd: null,
      rangeProcess: false,
      daysOverflow: null,
      daysOverflowTime: 1000
    }
  },
  beforeMount () {
    this.init()
  },
  computed: {
    weekLabels () {
      const keys = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT']
      return keys.map(item => this.$_language(item))
    },

    getDate () {
      return {
        prevYear: (year, month, date, hours = 0, minutes = 0, seconds = 0) => {
          return new Date(year - 1, month, date, hours, minutes, seconds)
        },
        nextYear: (year, month, date, hours = 0, minutes = 0, seconds = 0) => {
          return new Date(year - 1, month, date, hours, minutes, seconds)
        },
        prevMonth: (year, month, date, hours = 0, minutes = 0, seconds = 0) => {
          if (month-- < 1) {
            month += 12
            year -= 1
          }

          return new Date(year, month, date, hours, minutes, seconds)
        },
        nextMonth: (year, month, date, hours = 0, minutes = 0, seconds = 0) => {
          if (month++ > 10) {
            month = month % 12
            year += 1
          }

          return new Date(year, month, date, hours, minutes, seconds)
        },
        currentMonth: (year, month, date, hours = 0, minutes = 0, seconds = 0) => {
          return new Date(year, month, date, hours, minutes, seconds)
        }
      }
    }
  },
  methods: {
    init () {
      // Range init.
      if (/range/i.test(this.type) && helpers.typeof(this.value, 'array')) {
        const [start, end] = this.value

        if (helpers.typeof(start, 'date') && !helpers.equal(start, this.rangeStart)) {
          this.rangeStart = start
        }

        if (helpers.typeof(end, 'date') && !helpers.equal(end, this.rangeEnd)) {
          this.rangeEnd = end
        }
      }

      this.mounteDate = this.getMounteDate()
    },

    getMounteDate () {
      if (helpers.typeof(this.value) === 'date') {
        return dateHelpers.date2object(this.value)
      }

      if (helpers.typeof(this.value) === 'array') {
        const [ start ] = this.value

        if (helpers.typeof(start) === 'date') {
          return dateHelpers.date2object(start)
        }
      }

      return dateHelpers.date2object(new Date())
    },

    getDateString (date) {
      if (helpers.typeof(date) !== 'date') return ''

      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    },

    isToday (year, month, nthDay) {
      const current = this.getDateString(new Date(year, month, nthDay, 0, 0, 0))
      const today = this.getDateString(new Date())
      return current === today
    },

    isSelectedDay (year, month, nthDay) {
      if (helpers.typeof(this.value) !== 'date') return false

      const current = this.getDateString(new Date(year, month, nthDay, 0, 0, 0))
      const selected = this.getDateString(this.value)
      return current === selected
    },

    isBoundingRange (year, month, nthDay) {
      if (!/range/i.test(this.type)) return false

      const current = this.getDateString(new Date(year, month, nthDay, 0, 0, 0))
      const start = this.getDateString(this.rangeStart)
      const end = this.getDateString(this.rangeEnd)

      return {
        start: current === start,
        end: current === end
      }
    },

    isInRange (year, month, nthDay) {
      if (!/range/i.test(this.type)) return false

      const current = new Date(year, month, nthDay, 0, 0, 0).getTime()

      if (!helpers.typeof(this.rangeStart, 'date') || !helpers.typeof(this.rangeEnd, 'date')) return false

      const start = new Date(this.rangeStart.getFullYear(), this.rangeStart.getMonth(), this.rangeStart.getDate(), 0, 0, 0).getTime()
      const end = new Date(this.rangeEnd.getFullYear(), this.rangeEnd.getMonth(), this.rangeEnd.getDate(), 0, 0, 0).getTime()

      return start <= current && current <= end
    },

    isDisabledDay (nthDay, type) {
      let { year, month } = this.mounteDate
      const _date = this.getDate[type](year, month, nthDay)

      if (helpers.typeof(this.disabled, 'function')) {
        return this.disabled(_date)
      }

      return false
    },

    updateMounteDate (type) {
      let { year, month } = this.mounteDate
      const _date = this.getDate[type](year, month, 1)
      this.mounteDate = dateHelpers.date2object(_date)
    },

    rangeEndPreview (nthDay, type) {
      if (!this.rangeProcess || !/range/i.test(this.type)) return false

      let { year, month } = this.mounteDate
      this.rangeEnd = this.getDate[type](year, month, nthDay)
    },

    getDateTimeConfiguration (date) {
      let _timeConfig = [0, 0, 0, 23, 59, 59]

      if (!this.value || helpers.equal(this.value, [null, null])) {
        let _defaultTime = helpers.typeof(this.defaultTime, 'function') ? this.defaultTime(date) : this.defaultTime

        // Reset time configuration.
        if (helpers.typeof(_defaultTime, 'object')) {
          Object.entries(_defaultTime).forEach(([key, value]) => {
            let index = /end/i.test(key) ? 3 : 0

            if (/hour/i.test(key) && value >= 0 && value <= 23) {
              _timeConfig[index] = value
            } else if (/minute/i.test(key) && value >= 0 && value <= 59) {
              _timeConfig[index + 1] = value
            } else if (/second/i.test(key) && value >= 0 && value <= 59) {
              _timeConfig[index + 2] = value
            }
          })
        }
      } else {
        if (helpers.typeof(this.value) === 'date') {
          _timeConfig.splice(0, 3, ...this.value.toString().match(/(\d+):(\d+):(\d+)/).slice(1))
        }

        if (helpers.typeof(this.value) === 'array') {
          const [start, end] = this.value

          if (helpers.typeof(start) === 'date') {
            _timeConfig.splice(0, 3, ...start.toString().match(/(\d+):(\d+):(\d+)/).slice(1))
          }

          if (helpers.typeof(end) === 'date') {
            _timeConfig.splice(3, 3, ...end.toString().match(/(\d+):(\d+):(\d+)/).slice(1))
          }
        }
      }

      return _timeConfig
    },

    onSelected (nthDay, type) {
      // Whether the date is be disabled.
      if (this.isDisabledDay(nthDay, type)) return

      let { year, month } = this.mounteDate
      let _date = this.getDate[type](year, month, nthDay)
      let _timeConfig = this.getDateTimeConfiguration(_date)

      // The picker type in [date, datetime]
      if (/date/.test(this.type)) {
        _date = this.getDate[type](year, month, nthDay, ..._timeConfig.slice(0, 3))
        helpers.typeof(this.callback, 'function') && this.callback(_date)
        return
      }

      // The picker type in [range, rangetime]
      if (/range/.test(this.type)) {
        const setRangeStart = (value) => {
          this.updateTimeDisabled(null)
          this.rangeStart = value
          this.rangeEnd = value
        }

        const setRnageEnd = (value) => {
          this.rangeEnd = value
        }

        // Set range start.
        if (!this.rangeProcess) {
          _date = this.getDate[type](year, month, nthDay, ..._timeConfig.slice(0, 3))
          setRangeStart(_date)
          this.rangeProcess = true
          return
        }

        const _start = new Date(this.rangeStart.getFullYear(), this.rangeStart.getMonth(), this.rangeStart.getDate(), 0, 0, 0)
        const rangeTimes = _date.getTime() - _start.getTime()

        // If the selected date lt the range start, reset the range start.
        if (rangeTimes < 0) {
          _date = this.getDate[type](year, month, nthDay, ..._timeConfig.slice(0, 3))
          setRangeStart(_date)
          return
        }

        // If the range value gt maxDay, break after.
        if (rangeTimes >= this.maxDays * 24 * 3600 * 1000) {
          clearTimeout(this.daysOverflow)

          this.daysOverflow = window.setTimeout(() => {
            this.daysOverflow = null
          }, this.daysOverflowTime)

          return
        }

        // Set range end.
        _date = this.getDate[type](year, month, nthDay, ..._timeConfig.slice(3))
        setRnageEnd(_date)
        this.rangeProcess = false

        // Date callback.
        helpers.typeof(this.callback, 'function') && this.callback([this.rangeStart, this.rangeEnd])
      }
    }
  },
  watch: {
    'value': function (value, oldValue) {
      if (!helpers.equal(value, oldValue)) {
        this.init()
      }
    }
  }
}
</script>

<style lang="less">
  @import './picker-date.less';
</style>

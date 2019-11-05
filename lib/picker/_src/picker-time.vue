<template>
  <section class="bee-picker-time">
    <template v-for="(item, key) in configuration">
      <picker-time-item
        v-if="item"
        :key="key"
        :type="type"
        :width="100/visibleCount + '%'"
        :configuration="item"
        :callback="itemCallback"
      ></picker-time-item>
    </template>
  </section>
</template>

<script>
import helpers from '../../utils/helpers'
import dateHelpers from '../../utils/date'
import PickerTimeItem from './picker-time-item.vue'

export default {
  components: {
    PickerTimeItem
  },
  props: {
    type: String,
    visible: Object,
    disabled: Object,
    callback: Function,
    value: [Date, Array]
  },
  data () {
    return {
      configuration: this.getConfiguration()
    }
  },
  computed: {
    visibleCount () {
      return this.configuration.reduce((acc, cur) => {
        return cur ? ++acc : acc
      }, 0)
    },

    isSameDay () {
      if (/date/i.test(this.type)) return false

      const [start, end] = this.value

      if (!helpers.typeof(start, 'date') || !helpers.typeof(end, 'date')) return false

      return start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth() && start.getDate() === end.getDate()
    }
  },
  methods: {
    /**
     * Get the configurations of times.
     */
    getConfiguration () {
      let _config = new Array(6)
      let i = 0

      while (i < 6) {
        _config[i] = this.getItemConfiguration(i)
        i++
      }

      return _config
    },

    /**
     * Get the configurations of index item.
     * @param {Number} index the index of item
     */
    getItemConfiguration (index) {
      let types = ['hour', 'minute', 'second']
      const _type = types[index % 3]

      // If the current type is invisible.
      if (!this.visible[_type]) return null

      if (helpers.typeof(this.value) === 'date') {
        if (index >= 3) return null

        const _date = dateHelpers.date2object(this.value)
        const _params = [_date.year, _date.month, _date.date, _date.hour, _date.minute]
        return this.createItemConfiguration(_params.slice(0, 3 + index % 3), index)
      }

      if (helpers.typeof(this.value) === 'array') {
        const [start, end] = this.value

        if (!helpers.typeof(start, 'date') || !helpers.typeof(end, 'date')) return null

        if (index < 3) {
          const _start = dateHelpers.date2object(start)
          const _startParams = [_start.year, _start.month, _start.date, _start.hour, _start.minute]
          return this.createItemConfiguration(_startParams.slice(0, 3 + index % 3), index)
        } else {
          const _end = dateHelpers.date2object(start)
          const _endParams = [_end.year, _end.month, _end.date, _end.hour, _end.minute]
          return this.createItemConfiguration(_endParams.slice(0, 3 + index % 3), index)
        }
      }
    },

    /**
     * Create a configuration for the time item.
     * @param {Array} prefix year, monthIndex, day [, hours [, minutes [, seconds]]]
     * @param {Number} index the index of item
     */
    createItemConfiguration (prefix, index) {
      const counts = [23, 59, 59]
      const suffix = [0, 0, 0]
      const max = counts[index % 3]
      let i = 0
      let _data = []

      while (i <= max) {
        _data[i] = {
          label: dateHelpers.two(i),
          value: i,
          index: index,
          disabled: this.isDisabled(new Date(...prefix, i, ...suffix.slice(0, 5 - prefix.length)), i, index),
          selected: this.isSelected(i, index)
        }

        i++
      }

      return _data
    },

    isSelected (value, index) {
      let methods = ['getHours', 'getMinutes', 'getSeconds']
      let _method = methods[index % 3]

      // datetime
      if (helpers.typeof(this.value, 'date')) {
        return this.value[_method]() === value
      }

      // rangetime
      if (helpers.typeof(this.value, 'array')) {
        const [start, end] = this.value

        // range start.
        if (index < 3 && helpers.typeof(start, 'date')) {
          return value === start[_method]()
        }

        if (index >= 3 && helpers.typeof(end, 'date')) {
          return value === end[_method]()
        }
      }

      return false
    },

    isDisabled (date, value, index) {
      let types = ['hour', 'minute', 'second']
      const _type = types[index % 3]
      const disabled = this.disabled ? this.disabled[_type] : null

      if (helpers.typeof(disabled) !== 'function') return false

      if (disabled(date, index).indexOf(value) > -1) return true

      return false
    },

    updateTimes (date, data) {
      const string = date.toString().replace(/(\d+):(\d+):(\d+)/, function (m, $1, $2, $3) {
        let times = [$1, $2, $3]
        times.splice(data.index % 3, 1, dateHelpers.two(data.value))

        return times.join(':')
      })

      return new Date(string)
    },

    itemCallback (data) {
      let _date = null

      if (/datetime/i.test(this.type)) {
        _date = this.updateTimes(this.value, data)
      }

      if (/rangetime/i.test(this.type)) {
        let [start, end] = this.value

        if (data.index < 3) {
          start = this.updateTimes(start, data)
        } else {
          end = this.updateTimes(end, data)
        }

        if (start - end >= 0) {
          end = new Date(start.getTime() + 1000)
        }

        _date = [start, end]
      }

      if (!_date || helpers.equal(_date, this.value)) {
        return
      }

      this.callback(_date)

      this.$nextTick(() => {
        this.configuration = this.getConfiguration()
      })
    }
  }
}
</script>

<style lang="less">
  @import './picker-time.less';
</style>

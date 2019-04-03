<template>
  <div class="picker-time--wp">
    <section class="picker-time--body">
      <template v-for='(item, index) in datas'>
        <time-item :class='["picker-time--item__" + itemNum]'
          v-if='item'
          :key='"time_item_" + index'
          :type='index'
          :data='item'
          :width='100/itemNum'
          :value='selected[index]'
          @picker='picker'>
        </time-item>
      </template>
    </section>
  </div>
</template>

<script>
import utils from './utils'
import TimeItem from './TimeItem.vue'

export default {
  components: {
    TimeItem
  },
  props: {
    type: String,
    format: String,
    isRange: Boolean,
    disabled: Object,
    visible: Object,
    callback: Function,
    staticText: Object,
    value: [Date, Array]
  },
  data () {
    return {
      itemNum: 0,
      selected: [],
      datas: []
    }
  },
  computed: {
    startDate () {
      if (utils.typeof(this.value) === 'array') {
        return utils.date2object(this.value[0])
      } else if (utils.typeof(this.value) === 'date') {
        return utils.date2object(this.value)
      } else {
        return {}
      }
    },

    endDate () {
      if (utils.typeof(this.value) === 'array') {
        return utils.date2object(this.value[1])
      }

      return {}
    },

    /** 开始结束日期是否是同一天 */
    isOneDay () {
      if (utils.typeof(this.value) === 'array') {
        return this.startDate.year === this.endDate.year && this.startDate.month === this.endDate.month && this.startDate.date === this.endDate.date
      }

      return false
    }
  },
  created () {
    this.setDatas(0)
  },
  methods: {
    /**
     * 获取范围数组
     * @param {Number} start 开始位置
     * @param {Number} end 结束位置
     * @return {Array}
     */
    rang (start, end) {
      let arr = []

      for (let i = start; i <= end; i++) {
        arr.push(i)
      }

      return arr
    },

    /**
     * 获取每个item的数据
     * @param {Number} index item的索引值
     * @param {Array} selected 当前的时间的选中值
     * @return {Array}
     */
    getTimeItem (index, selected) {
      let types = ['hour', 'minute', 'second']
      let type = types[index % 3]

      if (!this.visible[type]) return null

      let ends = [23, 59, 59]
      let { year, month, date } = index < 3 ? this.startDate : this.endDate

      return this.rang(0, ends[index % 3]).map(item => {
        let params = null

        if (index % 3 === 0) {
          params = [year, month, date, item, 0, 0]
        } else if (index % 3 === 1) {
          params = [year, month, date, index < 3 ? selected[0] : selected[3], item, 0]
        } else if (index % 3 === 2) {
          params = [year, month, date, index < 3 ? selected[0] : selected[3], index < 3 ? selected[1] : selected[2], item]
        }

        return {
          value: utils.two(item),
          disabled: this.itemIsDisabled(item, new Date(...params), type, index, selected)
        }
      })
    },

    /**
     * item中的每个值的disabled状态值
     * @param {Number} item item的值
     * @param {Date} date 此时每个item的日期值
     * @param {String} type 当前item的类型 hour|minute|second
     * @param {index} item item的索引值
     * @param {Array} selected 当前的时间的选中值
     * @return {Boolean}
     */
    itemIsDisabled (item, date, type, index, selected) {
      let _disabled = this.disabled && this.disabled[type] && utils.typeof(this.disabled[type]) === 'function'

      if (_disabled) {
        let inDisabled = this.disabled[type](date).indexOf(item) !== -1
        let ltStartTime = this.isOneDay && index >= 3 && item < selected[index % 3]
        return inDisabled || ltStartTime
      } else {
        return false
      }
    },

    /**
     * 获取渲染数据
     * @param {Number} index 从索引值开始更新之后的数据
     */
    setDatas (index) {
      let selected = this.getSelected()
      let datas = []
      let len = this.isRange ? 5 : 2

      for (let i = 0; i <= len; i++) {
        let itemData = this.datas[i]

        if (i >= index) {
          itemData = this.getTimeItem(i, selected)
        }

        // 检测是否disabled
        if (itemData && itemData.find(item => Number(item.value) === selected[i]).disabled) {
          let _item = itemData.find(item => !item.disabled)
          selected[i] = Number((_item && _item.value) || itemData[0].value)
        }

        datas[i] = itemData
      }

      this.itemNum = datas.reduce((t, i) => {
        return i ? t + 1 : t
      }, 0)

      // 开始检测是否由于值变化引起的值更新
      if (selected.toString() !== this.getSelected()) {
        let [startHour, startMinute, startSecond, endHour, endMinute, endSecond] = selected

        if (this.isRange) {
          let _startDate = new Date(this.startDate.year, this.startDate.month, this.startDate.date, startHour, startMinute, startSecond)
          let _endDate = new Date(this.endDate.year, this.endDate.month, this.endDate.date, endHour, endMinute, endSecond)
          this.callback([_startDate, _endDate])
        } else {
          this.callback(new Date(this.startDate.year, this.startDate.month, this.startDate.date, startHour, startMinute, startSecond))
        }
      }

      this.selected = selected
      this.datas = datas
    },

    /**
     * 拾取后的回调
     * @param {Object} data 拾取的对象数据
     */
    picker (data) {
      let isStart = data.type < 3
      let { year, month, date, hour, minute, second } = isStart ? this.startDate : this.endDate
      let params = [
        year,
        month,
        date,
        data.type === 0 || data.type === 3 ? Number(data.value) : hour,
        data.type === 1 || data.type === 4 ? Number(data.value) : minute,
        data.type === 2 || data.type === 5 ? Number(data.value) : second
      ]

      let _date = new Date(...params)

      if (this.isRange) {
        isStart ? this.callback([_date, new Date(this.endDate.times)]) : this.callback([new Date(this.startDate.times), _date])
      } else {
        this.callback(_date)
      }

      this.$set(this.selected, data.type, Number(data.value))
      this.setDatas(0)
    },

    /**
     * 获取选中的时间值
     * @return {Array}
     */
    getSelected () {
      if (this.selected.length === 0) {
        let selected = [this.startDate.hour, this.startDate.minute, this.startDate.second]

        // 如果是范围选择
        if (this.isRange) {
          selected = selected.concat([this.endDate.hour, this.endDate.minute, this.endDate.second])
        }

        return selected
      } else {
        return [...this.selected]
      }
    }
  }
}
</script>

<style lang="less">
@import '../../theme.less';
@root: picker-time;

.@{root}--wp {
  width: @picker-pop-width;
  height: @picker-pop-height;
  box-sizing: border-box;
  overflow: hidden;

  .@{root}--body {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .@{root}-item--wp {

      &.@{root}--item__1 li {
        padding-left: 140px;
      }

      &.@{root}--item__2 li {
        padding-left: 70px;
      }
      &.@{root}--item__3 li {
        padding-left: 40px;
      }
      &.@{root}--item__4 li {
        padding-left: 24px;
      }
      &.@{root}--item__6 li {
        padding-left: 14px;
      }
    }
  }
}
</style>

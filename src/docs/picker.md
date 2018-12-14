<style>
.inline .picker--wp {
  margin: 0 10px 10px 0;
}
</style>
<script>
export default {
  data () {
    return {
      date1: null,
      date2: null,
      date3: null,
      date4: null,
      date5: null,
      date6: null,
      date7: null
    }
  },
  computed: {
    quickBtns () {
      return [{
        label: '今天',
        value: new Date()
      }, {
        label: '最近30天',
        value: [new Date(new Date().getTime() - 30 * 24 * 3600 * 1000), new Date()]
      }, {
        label: '一个月后',
        value: new Date(new Date().getTime() + 30 * 24 * 3600 * 1000)
      }]
    },
    dateDisabled () {
      return (date) => {
        let data = this.date2object(new Date())
        return date.getTime() < new Date(data.year, data.month, data.date, 0, 0, 0).getTime()
      }
    },
    timeDisabled () {
      return {
        hour: (date) => {
          if (date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate()) {
            return this.range(0, new Date().getHours() - 1)
          } else {
            return []
          }
        },
        minute: (date) => {
          if (date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate() && date.getHours() === new Date().getHours()) {
            return this.range(0, new Date().getMinutes() - 1)
          } else {
            return []
          }
        },
        second: (date) => {
          if (date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate() && date.getHours() === new Date().getHours() && date.getMinutes() === new Date().getMinutes()) {
            return this.range(0, new Date().getSeconds())
          } else {
            return []
          }
        }
      }
    }
  },
  methods: {
    range (staft, end) {
      let res = []

      for (let i = staft; i <= end; i++) {
        res.push(i)
      }

      return res
    },
    typeof (data) {
      return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
    },
    date2object (date) {
      if (this.typeof(date) !== 'date') return null

      let _data = {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        times: date.getTime(),
        day: date.getDay()
      }
      _data['days'] = new Date(_data.year, _data.month + 1, 0, 0, 0, 0).getDate()
      _data['prevMonthDays'] = new Date(_data.year, _data.month, 0, 0, 0, 0).getDate()
      _data['prevDays'] = _data.day
      _data['nextDays'] = 6 * 7 - _data.days - _data.prevDays

      return _data
    }
  }
}
</script>
## picker 选择

### 基本用法

::: demo
``` html
<template>
  <div class='inline'>
    <bee-picker></bee-picker>
    <bee-picker type='datetime'></bee-picker> <br/>
    <bee-picker type='range'></bee-picker>
    <bee-picker type='rangetime'></bee-picker>
  </div>
</template>
```
:::

### 禁用日期和时间

::: demo
``` html
<template>
  <div class='inline'>
    <p>禁用今天之前的日期</p>
    <bee-picker v-model='date2' :disabled='dateDisabled'></bee-picker>
    <bee-picker v-model='date3' :disabled='dateDisabled' :time-disabled='timeDisabled' type='datetime'></bee-picker> <br/>
    <bee-picker v-model='date4' :disabled='dateDisabled' type='range'></bee-picker>
    <bee-picker v-model='date5' :disabled='dateDisabled' :time-disabled='timeDisabled' type='rangetime'></bee-picker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date2: null,
      date3: null,
      date4: null,
      date5: null
    }
  },
  computed: {
    dateDisabled () {
      return (date) => {
        let data = this.date2object(new Date())
        return date.getTime() < new Date(data.year, data.month, data.date, 0, 0, 0).getTime()
      }
    },
    timeDisabled () {
      return {
        hour: (date) => {
          if (date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate()) {
            return this.range(0, new Date().getHours() - 1)
          } else {
            return []
          }
        },
        minute: (date) => {
          if (date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate() && date.getHours() === new Date().getHours()) {
            return this.range(0, new Date().getMinutes() - 1)
          } else {
            return []
          }
        },
        second: (date) => {
          if (date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate() && date.getHours() === new Date().getHours() && date.getMinutes() === new Date().getMinutes()) {
            return this.range(0, new Date().getSeconds())
          } else {
            return []
          }
        }
      }
    }
  },
  methods: {
    range (staft, end) {
      let res = []

      for (let i = staft; i <= end; i++) {
        res.push(i)
      }

      return res
    },
    typeof (data) {
      return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
    },
    date2object (date) {
      if (this.typeof(date) !== 'date') return null

      let _data = {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        times: date.getTime(),
        day: date.getDay()
      }
      _data['days'] = new Date(_data.year, _data.month + 1, 0, 0, 0, 0).getDate()
      _data['prevMonthDays'] = new Date(_data.year, _data.month, 0, 0, 0, 0).getDate()
      _data['prevDays'] = _data.day
      _data['nextDays'] = 6 * 7 - _data.days - _data.prevDays

      return _data
    }
  }
}
</script>
```
:::

### 快速选择按钮

::: demo
``` html
<template>
  <div class='inline'>
    <bee-picker v-model='date6' :quick-btns='quickBtns' quick-btns-type='outer'></bee-picker> <br/>
    <bee-picker v-model='date7' :quick-btns='quickBtns' type='range'></bee-picker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date6: null,
      date7: null
    }
  },
  computed: {
    quickBtns () {
      return [{
        label: '今天',
        value: new Date()
      }, {
        label: '最近30天',
        value: [new Date(new Date().getTime() - 30 * 24 * 3600 * 1000), new Date()]
      }, {
        label: '一个月后',
        value: new Date(new Date().getTime() + 30 * 24 * 3600 * 1000)
      }]
    }
  }
}
</script>
```
:::

### 其他用法

::: demo
``` html
<template>
  <div class='inline'>
    <bee-picker format='YYYY-MM' ></bee-picker>
    <bee-picker format='YYYY-MM hh:mm' type='datetime'></bee-picker> <br/>
    <bee-picker :max-days='3' type='range'></bee-picker>
  </div>
</template>
```
:::


### 属性值


|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|type|类型值|string|date,datetime,range,rangetime|date|
|lang|语言|string|zh_cn|zh_cn|
|format|显示的日期格式化参数|string|-|YYYY-MM-DD|YYYY-MM-DD hh:mm:ss|
|labelFormat|显示的日期的别名设置|function|-|-|
|disabled|日期不可用的设置|function|-|-|
|timeDisabled|时间不可用的设置|object|-|-|
|placeholder|占位符|string|-|-|
|quickBtns|快速选择按钮|array|-|-|
|quickBtnsType|快速选择按钮的类型|string|inner,outer|inner|
|maxDays|日期最大的选择天数|number|-|-|
|scrollDom|跟随滚动的DOM节点|HTML DOM|-|document|

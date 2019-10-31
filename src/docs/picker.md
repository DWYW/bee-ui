<style>
.inline .bee-picker, .inline .bee-button {
  margin: 0 10px 10px 0;
  vertical-align: text-bottom;
}

.test-dialog-body {
  height: 320px;
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
}

.test-dialog-body .wp {
  width: 100%;
  padding-top: 280px;
  padding-bottom: 280px;
  box-sizing: border-box;
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
      date7: null,
      date8: null,
      date9: null,
      date10: null,
      date11: null,
      date12: null,
      date13: null,
      visible: {
        hour: true,
        minute: true,
        second: false
      },
      defaultTime: {
        startHour: 1,
        startMinute: 2,
        startSecond: 2,
        endHour: 2,
        endMinute: 2,
        endSecond: 2
      },
      dialogShow: false,
      testDom: null
    }
  },
  computed: {
    scrollDom: (vm) => {
      return vm.$parent.scrollDom
    },
    quickBtns () {
      const _now = new Date()
      const _today = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate(), 0, 0, 0);

      return [{
        label: '今天',
        value: _today
      }, {
        label: '最近30天',
        value: [new Date(_today.getTime() - 30 * 24 * 3600 * 1000), new Date(_today.getTime() + 24 * 3600 * 1000 - 1)]
      }, {
        label: '一个月后',
        value: new Date(_today.getTime() + 30 * 24 * 3600 * 1000)
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
    showDialog () {
      this.dialogShow = true

      this.$nextTick(() => {
        this.testDom = this.$refs.test
      })
    },
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
    },
    onChange (value) {
      console.log('--------- picker onChange strart ---------')
      console.log(value)
      console.log('---------   picker onChange end  ---------')
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
    <bee-picker v-model='date1' @change="onChange"></bee-picker>
    <bee-picker type='datetime' :default-time='defaultTime' v-model='date2' @change="onChange"></bee-picker> <br/>
    <bee-picker type='range' v-model='date3' @change="onChange"></bee-picker>
    <bee-picker type='rangetime' :default-time='defaultTime' v-model='date4' @change="onChange" placeholder='请选择'></bee-picker>
  </div>

  <p>您选择的是：{{date1}}</p>
  <p>您选择的是：{{date2}}</p>
  <p>您选择的是：{{date3}}</p>
  <p>您选择的是：{{date4}}</p>
</template>
```
:::

### 禁用日期和时间

::: demo
``` html
<template>
  <div class='inline'>
    <p>禁用今天之前的日期</p>
    <bee-picker :disabled='dateDisabled' v-model='date5' @change="onChange"></bee-picker>
    <bee-picker :disabled='dateDisabled' :time-disabled='timeDisabled' type='datetime' :auto-change='true' :default-time='defaultTime' v-model='date6' @change="onChange"></bee-picker> <br/>
    <bee-picker :disabled='dateDisabled' type='range' v-model='date7' @change="onChange"></bee-picker>
    <bee-picker :disabled='dateDisabled' :time-disabled='timeDisabled' type='rangetime' :auto-change='true' v-model='date8' @change="onChange"></bee-picker><br/>

    <bee-picker :disabled='true' v-model='date5'></bee-picker>
    <bee-picker :disabled='true' :time-disabled='timeDisabled' type='datetime' v-model='date6'></bee-picker> <br/>
    <bee-picker :disabled='true' type='range' v-model='date7'></bee-picker>
    <bee-picker :disabled='true' :time-disabled='timeDisabled' type='rangetime' v-model='date8'></bee-picker>

    <p>您选择的是：{{date5}}</p>
    <p>您选择的是：{{date6}}</p>
    <p>您选择的是：{{date7}}</p>
    <p>您选择的是：{{date8}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {}
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
    <bee-picker :disabled='true' v-model='date9' @change="onChange" :quick-btns='quickBtns' quick-btns-type='outer'></bee-picker> <br/>
    <bee-picker v-model='date10' @change="onChange" :quick-btns='quickBtns' type='rangetime'></bee-picker>
    <p>您选择的是：{{date9}}</p>
    <p>您选择的是：{{date10}}</p>
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
    <bee-picker format='YYYY-MM' v-model='date11' @change="onChange"></bee-picker>
    <bee-picker format='YYYY-MM hh:mm' :time-visible='visible' type='datetime' v-model='date12' @change="onChange"></bee-picker> <br/>
    <bee-picker :max-days='3' type='range' v-model='date13' @change="onChange"></bee-picker>

    <bee-button @click='showDialog'>show dialog</bee-button>

    <p>您选择的是：{{date11}}</p>
    <p>您选择的是：{{date12}}</p>
    <p>您选择的是：{{date13}}</p>

  
    <bee-dialog v-model='dialogShow'>
      <section class='test-dialog-body' ref='test'>
        <section class='wp'>
          <bee-picker format='YYYY-MM' v-model='date11' @change="onChange"></bee-picker>
        </section>
      </section>
    </bee-dialog>
  </div>
</template>
```
:::


### 属性值


|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|type|类型值|string|date,datetime,range,rangetime|date|-|
|lang|语言|string|zh_cn|zh_cn|-|
|format|显示的日期格式化参数|string|-|见下方|-|
|labelFormat|显示的日期的别名设置|function|-|-|-|
|disabled|日期不可用的设置|function,boolean|-|-|boolean 需要 ^0.7.0|
|timeDisabled|时间不可用的设置|object|-|-|-|
|timeVisible|时间设置可见性|object|-|见下方|-|
|defaultTime|时间的默认设置|object,function|-|见下方|^0.7.1 Object <br/>^0.7.2 Function|
|placeholder|占位符|string|-|-|-|
|quickBtns|快速选择按钮|array|-|-|-|
|quickBtnsType|快速选择按钮的类型|string|inner,outer|inner|-|
|maxDays|日期最大的选择天数|number|-|-|-|
|autoChange|选择日期后是否自动切换到时间选择|boolean|-|-|^0.7.0|

<br/>
<br/>

### 事件
|事件|说明|版本支持|
|---|---|---|
|opened|选项面板打开后的回调事件|^0.7.3|
|change|选取后的回调|^0.7.7|

<br/>
<br/>

> **disabled 为 true 时，将禁止选取<br/>**
> 当type为date或者datetime时， format默认值为 YYYY-MM-DD <br/>
> 当type为range或者rangetime时， format默认值为 YYYY-MM-DD hh:mm:ss

```js
// timeVisible 默认值
{
  hour: true,
  minute: true,
  second: true
}

// timeDisabled 设置
{
  hour: (date, index) => {
    // do something ...
    return // disabled
  },
  minute: (date, index) => {
    // do something ...
    return // disabled
  },
  second: (date, index) => {
    // do something ...
    return // disabled
  }
}

// defaultTime 默认值
{
  startHour: 0,
  startMinute: 0,
  startSecond: 0,
  endHour: 0,
  endMinute: 0,
  endSecond: 0,
}
```
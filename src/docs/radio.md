<style>
  .inline .bee-radio {
    margin-right: 20px;
  }
</style>
<script>
export default {
  data () {
    return {
      fruit: null,
      value1: null,
      value2: true,
      groups: [{
        label: '香蕉'
      }, {
        label: '苹果',
        desc: '这是一段说明信息',
        disabled: true
      }, {
        label: '菠萝',
        desc: '这是一段说明信息'
      }, {
        label: '奇异果'
      }]
    }
  },
  methods: {
    getFruit () {
      return this.groups[this.fruit] ? this.groups[this.fruit].label : null
    },
    onChange (value) {
      console.log(value)
    }
  }
}
</script>

## radio 单选

### 基本用法

::: demo
``` html
<div class='inline'>
  <bee-radio v-model='value1' @change="onChange">苹果</bee-radio>
  <bee-radio disabled>香蕉</bee-radio>
  <bee-radio v-model='value2' @change="onChange">奇异果</bee-radio>
</div>
```
:::

### 属性值

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|icons|选项的图标配置信息|Array|—|见下方|*|
|disabled|禁用状态|Boolean|—|—|*|

```js
/** 
 * icons 默认值 
 */ 

// v0.x.x
['radio-unselected', 'radio-selected']

// v1.x.x
[{
  fontFamily: 'beefont',
  icon: 'radio-unselected'
}, {
  fontFamily: 'beefont',
  icon: 'radio-selected'
}]
```
<br/>

### 事件

1.0.0+没有说明的其它事件, 则通过 $listeners 传入到根元素中。

<br>

|事件|说明|版本支持|
|---|---|---|
|change|选取后的回调|0.7.7|

<br/>
<br/>
<br/>

## radio group 单选组

### 基本用法

::: demo
``` html 
<template>
  <div style='border-bottom:1px solid #ccc;'>
    <bee-radio-group v-model='fruit' :groups='groups' @change="onChange"></bee-radio-group>
  </div>
  <div>
    <bee-radio-group v-model='fruit' :groups='groups' block></bee-radio-group>
  </div>
  <p>您的选择为:{{getFruit()}}</p>
</template>
<script>
export default {
  data () {
    return {
      fruit: null,
      groups: [{
        label: '香蕉'
      }, {
        label: '苹果',
        disabled: true
      }, {
        label: '菠萝'
      }, {
        label: '奇异果'
      }]
    }
  },
  methods: {
    getFruit () {
      return this.groups[this.fruit] ? this.groups[this.fruit].label : null
    }
  }
}
</script>
```
:::

### 属性值

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|groups|选项数据|Array|—|[]|*|
|block|块级显示|Boolean|—|—|*|

<br/>
<br/>

### 事件
|事件|说明|版本支持|
|---|---|---|
|change|选取后的回调|0.7.7|

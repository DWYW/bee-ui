<style>
  .inline .radio--wp {
    margin-right: 20px;
  }
</style>
<script>
export default {
  data () {
    return {
      fruit: null,
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
    }
  }
}
</script>

## radio 单选

### 基本用法

::: demo
``` html
<div class='inline'>
  <bee-radio>苹果</bee-radio>
  <bee-radio disabled>香蕉</bee-radio>
  <bee-radio>奇异果</bee-radio>
</div>
```
:::

### 属性值

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|icons|选项的图标配置信息|array|-|['radio-unselected', 'radio-selected']|
|disabled|禁用状态|boolean|-|-|

<br/>
<br/>
<br/>

## radio group 单选组

### 基本用法

::: demo
``` html 
<template>
  <div style='border-bottom:1px solid #ccc;'>
    <bee-radio-group v-model='fruit' :groups='groups'></bee-radio-group>
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

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|groups|选项数据|array|-|[]|
|block|块级显示|boolean|-|-|


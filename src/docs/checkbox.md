<style>
  .inline .bee-checkbox {
    margin-right: 20px;
  }
</style>
## checkbox 多选

### 基本用法
::: demo 

``` html
<template>
  <div class='inline'>
    <bee-checkbox v-model='banana' @change='onChange'>香蕉</bee-checkbox>
    <bee-checkbox v-model='apple' @change='onChange'>苹果</bee-checkbox>
    <bee-checkbox disabled>奇异果</bee-checkbox>
  </div>
  <p>
    已选择：<span v-if='banana'>香蕉</span> <span v-if='banana && apple'>,</span><span v-if='apple'>苹果</span>
  </p>
</template>

<script>
export default {
  data () {
    return {
      banana: null,
      apple: null
    }
  },
  methods: {
    onChange (value) {
      console.log(value)
    }
  }
}
</script>
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
['checkbox-unselected', 'checkbox-selected']

// v1.x.x
[{
  fontFamily: 'beefont',
    icon: 'checkbox-unselected'
  }, {
    fontFamily: 'beefont',
    icon: 'checkbox-selected'
}]
```
<br/>

### 事件

1.0.0+没有说明的其它事件, 则通过 $listeners 传入到根元素中。
<style>
.demo .ipt--wp {
  margin-right: 20px;
  margin-bottom: 10px;
}
</style>
<script>
export default {
  data () {
    return {
      test1: null,
      test2: null,
      test3: null,
      mobile: null,
      str1: null,
      str2: null,
      readOnly: 'readOnly',
      icon: [{
        icon: 'search',
        position: 'left'
      }, {
        icon: 'mobile',
        position: 'left'
      }, {
        icon: 'correct',
        position: 'right'
      }, {
        icon: 'error',
        position: 'right'
      }]
    }
  },
  computed: {
    mobileReg () {
      return (value) => {
        return value ? /^(1|1[3-9]|1[3-9]\d{1,9})$/g.test(value) ? value : this.mobile : value
      }
    },
    reg1 () {
      return (value) => {
        return /^[a-zA-Z]*$/.test(value)
      }
    }
  },
  methods: {
    enterEvent () {
      console.log(`您输入的手机号为${this.mobile}`)
    }
  }
}
</script>

## input 输入框

### 基本用法

::: demo
``` html
<template>
  <div class='demo'>
    <p>
      <bee-input v-model='test1' placeholder='请输入'></bee-input>
      <bee-input theme='primary' v-model='test1' placeholder='请输入'></bee-input>
      <bee-input theme='success' v-model='test1' placeholder='请输入'></bee-input>
      <bee-input theme='error' v-model='test1' placeholder='请输入'></bee-input>
    </p>
    <p>您输入的是：{{test1}}</p>
  <div>
</template>
```

:::

### 自动获取焦点

::: demo

``` html
<template>
  <div class='demo'>
    <p>
      <bee-input v-model='test3' placeholder='请输入' :auto-focus='true'></bee-input>
    </p>
    <p> 您输入的是：{{test3}}</p>
  <div>
</template>
```
:::

### 带有 icon

::: demo

``` html
<template>
  <div class='demo'>
    <p>
      <bee-input v-model='test2' placeholder='请输入' :icon="icon[0]"></bee-input>
      <bee-input theme='primary' v-model='test2' placeholder='请输入' :icon="icon[1]"></bee-input>
      <bee-input theme='success' v-model='test2' placeholder='请输入' :icon="icon[2]"></bee-input>
      <bee-input theme='error' v-model='test2' placeholder='请输入' :icon="icon[3]"></bee-input>
    </p>
    <p>您输入的是：{{test2}}</p>
  <div>
</template>
```
:::

### 禁用状态

::: demo

``` html
<template>
  <div class='demo'>
    <p>
      <bee-input placeholder='请输入' :icon="icon[0]" disabled></bee-input>
      <bee-input theme='primary' placeholder='请输入' :icon="icon[1]" disabled></bee-input>
      <bee-input theme='success' placeholder='请输入' :icon="icon[2]" disabled></bee-input>
      <bee-input theme='error' placeholder='请输入' :icon="icon[3]" disabled></bee-input>
    </p>
  <div>
</template>
```
:::

### 只读状态

::: demo

``` html
<template>
  <div class='demo'>
    <p>
      <bee-input placeholder='请输入' :icon="icon[0]" :read-only='true' value='readOnly'></bee-input>
      <bee-input theme='primary' placeholder='请输入' :icon="icon[1]" :read-only='true' value='readOnly'></bee-input>
      <bee-input theme='success' placeholder='请输入' :icon="icon[2]" :read-only='true' value='readOnly'></bee-input>
      <bee-input theme='error' placeholder='请输入' :icon="icon[3]" :read-only='true' value='readOnly'></bee-input>
    </p>
  <div>
</template>
```
:::

### 过滤

::: demo

``` html
<template>
  <div class='demo'>
    <p>
      <bee-input v-model='mobile' placeholder='请输入手机号' maxlength='11' :icon="icon[1]" :reg='mobileReg' :enter-event='enterEvent'></bee-input>

      <bee-input v-model='str1' placeholder='请输入字母' maxlength='11' :icon="icon[1]" :reg='reg1' ></bee-input>

      <bee-input v-model='str2' placeholder='只能输入数字' maxlength='11' :icon="icon[1]" reg='^[0-9]*$' ></bee-input>
    </p>
  <div>
</template>

<script>
// 请打开控制台
export default {
  data () {
    return {
      mobile: null,
      str1: null,
      str2: null
    }
  },
  computed: {
    mobileReg () {
      return (value) => {
        return value ? /^(1|1[3-9]|1[3-9]\d{1,9})$/g.test(value) ? value : this.mobile : value
      }
    },
    reg1 () {
      return (value) => {
        return /^[a-zA-Z]*$/.test(value)
      }
    }
  },
  methods: {
    enterEvent () {
      console.log(`您输入的手机号为${this.mobile}`)
    }
  }
}
</script>
```
:::

### 属性值

<!-- ``` html
<bee-input
  :theme='String'
  :type='String'
  :icon='Object'
  :placeholder='String'
  :auto-focus='Boolean'
  :read-only='Boolean'
  :maxlength='Number'
  :reg='Function'
  :enter-event='Function'
  disabled
></bee-input>
``` -->

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|theme|按钮的类型|string|default,primary,success,error|default|
|type|输入框的类型|string|*|text|
|icon|要显示的图标|object|-|-|
|placeholder|占位符|string|-|-|
|autoFocus|自动获取焦点|boolean|-|-|
|readOnly|只读|boolean|-|-|
|maxlength|输入的最大长度|number|-|-|
|reg|value的格式化函数或正则表达式|function,string|-|-|
|enterEvent|enter按键的回调函数|function|-|-|
|disabled|禁用状态|boolean|-|-|

``` js
// icon的格式

{
  icon: IconName,
  position: left|right
}
```

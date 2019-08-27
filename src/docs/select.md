<script>
export default {
  computed: {
    scrollDom: (vm) => {
      return vm.$parent.scrollDom
    }
  },
  data () {
    return {
      disabled1: 1,
      disabled2: [1, 2],
      value1: null,
      value2: null,
      value3: null,
      options: [{
        label: '香蕉',
        value: 1
      }, {
        label: '苹果',
        value: 2
      }, {
        label: '梨',
        value: 3
      }, {
        label: '奇异果',
        value: 4
      }, {
        label: '榴莲',
        value: 5
      }, {
        label: '芒果',
        value: 6
      }, {
        label: '橘子',
        value: 7
      }, {
        label: '樱桃',
        value: 8
      }, {
        label: '柚子',
        value: 9
      }, {
        label: '西瓜',
        value: 10
      }, {
        label: '哈密瓜',
        value: 11
      }]
    }
  },
  methods: {
    onChanged (value, key) {
      console.log(value, this[key])
    }
  }
}
</script>
## select 下拉选框
 
### 基本用法

::: demo
``` html
<template>
  <p class='inline'>
    <bee-select :scroll-dom='scrollDom' :options='options' v-model='value1' @change="onChanged($event, 'value1')"></bee-select>
    <bee-select :scroll-dom='scrollDom' :options='[]' v-model='value2' @change="onChanged($event, 'value2')"></bee-select>
  </p>
</template>
```
:::

### 多选

::: demo
``` html
<template>
  <p class='inline'>
    <bee-select :scroll-dom='scrollDom' :options='options' multiple v-model='value3' @change="onChanged($event, 'value3')"></bee-select>
  </p>
</template>
```
:::

### 禁用

::: demo
``` html
<template>
  <p class='inline'>
    <bee-select :scroll-dom='scrollDom' :options='options' disabled v-model='disabled1'></bee-select> <br/> <br/>
    <bee-select :scroll-dom='scrollDom' :options='options' multiple disabled v-model='disabled2'></bee-select>
  </p>
</template>
```
:::

### 属性值


|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|options|选项数组|array|—|-|
|optionKey|每一个选项要是显示的字段和取值的字段|object|—|-|
|placeholder|占位符|string|—|-|
|multiple|是否是多选|boolean|—|false|
|disabled|是否是禁用|boolean|-|false|
|scrollDom|跟随滚动的DOM节点|HTML DOM|-|document|


### 事件
|事件|说明|版本支持|
|---|---|---|
|change|选取后的回调|^0.7.7|


```js
// options 配置信息

[{
  label: '香蕉',
  value: 1
}]

// optionKey 配置信息

{
  label: 'data.name',
  value: 'data.id'
}
```
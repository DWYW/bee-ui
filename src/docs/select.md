<style>
.inline .bee-select {
  margin-right: 10px;
}
</style>
<script>
export default {
  data () {
    return {
      model: {
        base: [null, 1],
        multiple: [null, [1, 2]],
        disabled: [null, [1]]
      }
    }
  },
  computed: {
    options () {
      return [{
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
    onChanged (value) {
      console.log('you selected is:', value)
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
    <bee-select  :options='options' placeholder='请选择' v-model='model.base[0]' @change='onChanged' :search-length="15"></bee-select>
    <bee-select  :options='options' placeholder='请选择' v-model='model.base[1]' @change='onChanged'></bee-select>
  </p>
</template>
<script>
export default {
  data () {
    return {
      model: {
        base: [null, 1]
      }
    }
  },
  computed: {
    options () {
      return [{
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
    onChanged (value) {
      console.log('you selected is:', value)
    }
  }
}
</script>
```
:::

### 多选

::: demo
``` html
<template>
  <p class='inline'>
    <bee-select multiple style='width: 160px;' :options='options' placeholder='请选择' v-model='model.multiple[0]' @change='onChanged'></bee-select>
    <bee-select multiple style='width: 160px;' :options='options' placeholder='请选择' v-model='model.multiple[1]' @change='onChanged'></bee-select>
  </p>
</template>
<script>
export default {
  data () {
    return {
      model: {
        multiple: [null, [1, 2]]
      }
    }
  },
  computed: {
    options () {
      return [{
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
    onChanged (value) {
      console.log('you selected is:', value)
    }
  }
}
</script>
```
:::

### 禁用

::: demo
``` html
<template>
  <p class='inline'>
    <bee-select :options='options' disabled v-model='model.disabled[0]' placeholder='请选择'></bee-select> <br/> <br/>
    <bee-select :options='options' multiple disabled v-model='model.disabled[1]'></bee-select>
  </p>
</template>
```
:::

### 属性值


|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|options|选项数组|Array|—|—|*|
|optionKey|每一个选项要是显示的字段和取值的字段|Object|—|—|*|
|placeholder|占位符|String|—|—|*|
|multiple|是否是多选|Boolean|—|false|*|
|disabled|是否是禁用|Boolean|—|false|*|
|searchLength|单选模式下，选项超过设定值时，使用搜索功能|Number|—|10|*|

<br/>
<br/>

### 事件
|事件|说明|版本支持|
|---|---|---|
|change|选取后的回调|0.7.7|

<br/>


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
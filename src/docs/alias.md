<script>
export default {
  data () {
    return {
      fruit: '',
      fruits: ["香蕉", "苹果", "奇异果"],
      title: '',
      excelTitles: [{
        name: "姓名"
      }, {
        name: "年龄"
      }, {
        name: "手机号"
      }]
    }
  },
  methods: {
    onChange (data) {
      console.log('current value', data)
    }
  }
}
</script>

## alias 别名 (^1.3.0)

### 基本用法

::: demo 
``` html
<template>
  <bee-alias 
    v-model="fruit" 
    :options="fruits"
    placeholder="请选择"
    @change='onChange'
  ></bee-alias>
</template>

<script>
  export default {
  data () {
    return {
      fruit: '',
      fruits: ["香蕉", "苹果", "奇异果"]
    }
  },
  methods: {
    onChange (data) {
      console.log('current value', data)
    }
  }
}
</script>
```
:::

### optionKey

::: demo 
``` html
<template>
  <bee-alias 
    v-model="title" 
    :options="excelTitles"
    option-key='name'
    placeholder="请选择"
  ></bee-alias>
</template>

<script>
  export default {
  data () {
    return {
      title: '',
      excelTitles: [{
        name: "姓名"
      }, {
        name: "年龄"
      }, {
        name: "手机号"
      }]
    }
  }
}
</script>
```
:::

### 弹出层大小

::: demo 
``` html
<template>
  <bee-alias 
    v-model="fruit" 
    :options="fruits"
    max-width='200px'
    min-height='100px'
    placeholder="请选择"
  ></bee-alias>
</template>

<script>
  export default {
  data () {
    return {
      fruit: '',
      fruits: ["香蕉", "苹果", "奇异果"]
    }
  }
}
</script>
```
:::


### 属性值

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|value|当前值，可使用 v-model 双向绑定数据|String|—|—|*|
|options|选择项信息|Array|—|—|*|
|optionKey|每一个选项要是显示的字段|String|—|—|*|
|maxWidth|弹出层的最大宽度|String|—|300px|*|
|minHeight|弹出层的最小高度|String|—|60px|*|
|placeholder|占位符|String|—|—|*|

<br/>
<br/>

### 事件
|事件|说明|版本支持|
|---|---|---|
|change|选取后的回调|*|

<br/>
<br/>
<style>
.inline .bee-switch--wp{
  margin: 0 20px 20px 0;
}
</style>
<script>
export default {
  data () {
    return {
      switch1: false,
      switch2: true,
      switch3: false,
      switch4: true
    }
  },
  methods: {
    onChange (value) {
      console.log(value)
    }
  }
}
</script>
## switch 开关

### 基本用法

::: demo 
``` html
<template>
  <div class='inline'>
    <bee-switch v-model='switch1' @change='onChange'></bee-switch>
    <bee-switch v-model='switch2' @change='onChange' size='sm'></bee-switch>
    <bee-switch v-model='switch3' @change='onChange' size='lg'></bee-switch>
    <bee-switch v-model='switch4' @change='onChange' disabled></bee-switch>
  </div>
</template>

<script>
export default {
  data () {
    return {
      switch1: false,
      switch2: true,
      switch3: false,
      switch4: true
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
    <bee-switch open-color='green' close-color='red'></bee-switch>
  </div>
</template>
```
:::

### 属性值


|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|size|switch的大小|string|sm.lg|-|
|disabled|是否是禁用|boolean|-|false|
|openColor|打开状态的颜色|color|-|-|
|closeColor|关闭状态的颜色|color|-|-|


### 事件
|事件|说明|版本支持|
|---|---|---|
|change|选取后的回调|^0.7.7|


<script>
export default {
  data () {
    return {}
  },
  methods: {
    getStyles () {
      return {
        backgroundColor: `#${(Math.round(Math.random()*255) << 16 | Math.round(Math.random()*255) << 8 | Math.round(Math.random()*255)).toString(16)}`,
        height: '50px',
        width: '50%',
        float: 'left'
      }
    },
    onScroll (e) {
      console.log(e.target.scrollTop, e.target.scrollLeft)
    }
  }
}
</script>

### 基本用法

::: demo
``` html
<template>
  <div style='width: 100%; height: 200px;border: 1px solid #cccccc; margin-bottom: 20px;'>
    <bee-scroll @onScroll='onScroll'>
      <div style='width: 120%;overflow: hidden;'>
        <div v-for='i in 50' :key='i' :style='getStyles()'></div>
      </div>
    </bee-scroll>
  </div>

  <div style='width: 100%; height: 200px;border: 1px solid #cccccc; margin-bottom: 20px;'>
    <bee-scroll show-type='hover' @onScroll='onScroll'>
      <div style='width: 120%;overflow: hidden;'>
        <div v-for='i in 50' :key='i' :style='getStyles()'></div>
      </div>
    </bee-scroll>
  </div>

  <div style='width: 100%; height: 200px;border: 1px solid #cccccc; margin-bottom: 20px;'>
    <bee-scroll show-type='hover' @onScroll='onScroll'>
      <div style='width: 100%;overflow: hidden;'>
        这是一个不发生滚动的例子
      </div>
    </bee-scroll>
  </div>
</template>
```
:::



### 属性值

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|showType|滚动条出现的方式|string|aways,hover|aways|
|scrollDom.sync|滚动的 HTML DOM| dom|—|-|

### 事件

|方法|说明
|---|---|
|onScroll|发生滚动的回调事件|
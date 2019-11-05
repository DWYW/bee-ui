<script>
export default {
  data () {
    return {
      scrollElement: null
    }
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
      console.log('scrollTop:', e.target.scrollTop)
      console.log('scrollLeft:', e.target.scrollLeft)
    }
  }
}
</script>

### 基本用法

> 1.0.0，由 BeeScroll 更名为 BeeScrollbar 

<br/>

::: demo
``` html
<template>
  <div style='width: 100%; height: 200px;border: 1px solid #cccccc; margin-bottom: 20px;'>
    <bee-scrollbar @scroll='onScroll' :scrollElement.sync='scrollElement'>
      <div style='width: 120%;overflow: hidden;'>
        <div v-for='i in 50' :key='i' :style='getStyles()'></div>
      </div>
    </bee-scrollbar>
  </div>

  <div style='width: 100%; height: 200px;border: 1px solid #cccccc; margin-bottom: 20px;'>
    <bee-scrollbar show-type='hover' @onScroll='onScroll'>
      <div style='width: 120%;overflow: hidden;'>
        <div v-for='i in 50' :key='i' :style='getStyles()'></div>
      </div>
    </bee-scrollbar>
  </div>

  <div style='width: 100%; height: 200px;border: 1px solid #cccccc; margin-bottom: 20px;'>
    <bee-scrollbar show-type='hover' @onScroll='onScroll'>
      <div style='width: 100%;overflow: hidden;'>
        这是一个不发生滚动的例子
      </div>
    </bee-scrollbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scrollElement: null
    }
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
      console.log('scrollTop:', e.target.scrollTop)
      console.log('scrollLeft:', e.target.scrollLeft)
    }
  }
}
</script>
```
:::



### 属性值

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|showType|滚动条出现的方式|String|aways, hover|aways|*|
|scrollElement.sync|触发滚动的 Element(1.0.0之前为scrollElement)| Element|—|—|1.0.0|

<br/>
<br/>

### 事件

|方法|说明|版本支持|
|---|---|---|
|scroll|元素发生滚动时触发（1.0.0之前为onScroll）|*|
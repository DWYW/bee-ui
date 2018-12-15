<style lang='less'>
  .item-panel {
    height: 50px;
  }
</style>
<script>
export default {
  data () {
    return {
      activeIndex: 1
    }
  },
  methods: {
    tabChange(idx) {
      console.log(idx)
    }
  }
}
</script>
## tab 选项卡

### 基本用法

::: demo
``` html
<template>
  <bee-tab @change='tabChange'>
    <bee-tab-item label='文章'>
      <div class='item-panel'>
        这里是 文章 下面的内容
      </div>
    </bee-tab-item>

    <bee-tab-item label='图片'>
      <div class='item-panel'>
        这里是 图片 下面的内容
      </div>
    </bee-tab-item>
  </bee-tab>


  <bee-tab type='card' @change='tabChange' :active-index='1'>
    <bee-tab-item label='文章'>
      <div class='item-panel'>
        这里是 文章 下面的内容
      </div>
    </bee-tab-item>

    <bee-tab-item label='图片'>
      <div class='item-panel'>
        这里是 图片 下面的内容
      </div>
    </bee-tab-item>
  </bee-tab>
  <br/>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: 1
    }
  },
  methods: {
    tabChange(idx) {
      console.log(idx)
    }
  }
}
</script>
```
:::


### 属性值

#### BeeTab

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|type|选项卡的类型|string|card|-|
|activeIdex|激活项的索引值|number|[0, BeeTabItem.length]|0|

<br/>
<br/>

#### BeeTabItem

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|label|选项卡的显示的文字|string|-|-|

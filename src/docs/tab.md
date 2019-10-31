<script>
export default {
  data () {
    return {
      tab: 1
    }
  },
  methods: {
    tabChange(data) {
      console.log('current is:' + data)
    }
  }
}
</script>
## tab 选项卡

### 基本用法

::: demo
``` html
<template>
  <bee-tab @change='tabChange' v-model='tab'>
    <bee-tab-item label='文章' class='test'>
      <div>
        这里是 文章 下面的内容
      </div>
    </bee-tab-item>

    <bee-tab-item label='图片'>
      <div>
        这里是 图片 下面的内容
      </div>
    </bee-tab-item>

    <bee-tab-item label='其他'>
      <div>
        这里是 其他 下面的内容
      </div>
    </bee-tab-item>
  </bee-tab>


  <bee-tab type='card' v-model='tab'>
    <bee-tab-item label='文章'>
      <div>
        这里是 文章 下面的内容
      </div>
    </bee-tab-item>

    <bee-tab-item label='图片'>
      <div>
        这里是 图片 下面的内容
      </div>
    </bee-tab-item>

    <bee-tab-item label='其他'>
      <div>
        这里是 其他 下面的内容
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


#### BeeTab

### 属性值

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|type|选项卡的类型|string|card|—|*|
|value|显示的索引值，可使用 v-model 双向绑定数据。|Number|[0, BeeTabItem.length]|0|1.0.0|

<br/>
<br/>

### 事件
|事件|说明|版本支持|
|---|---|---|
|change|tab改变后的触发回调|*|

<br/>
<br/>

#### BeeTabItem

### 属性值

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|label|选项卡标题显示的文字|string|-|-|

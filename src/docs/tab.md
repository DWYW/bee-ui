<script>
export default {
  data () {
    return {
      tab: 1,
      cardTab: 0,
      headerTab: 0
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
</template>
<script>
export default {
  data () {
    return {
      tab: 1
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

### card类型

::: demo
``` html
<template>
  <bee-tab @change='tabChange' v-model='cardTab' type='card'>
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
</template>
<script>
export default {
  data () {
    return {
      cardTab: 0
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

### header类型

::: demo
``` html
<template>
  <bee-tab @change='tabChange' v-model='headerTab' type='header'>
    <bee-tab-item label='文章' class='test'></bee-tab-item>
    <bee-tab-item label='图片'></bee-tab-item>
    <bee-tab-item label='其他'></bee-tab-item>
  </bee-tab>
</template>
<script>
export default {
  data () {
    return {
      headerTab: 0
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
|type|选项卡的类型|string|card,header|—|card * <br> header ^1.1.0|
|value|显示的索引值，可使用 v-model 双向绑定数据。|Number|[0, BeeTabItem.length]|0|1.0.0|
|barPosition|高亮条的显示位置|String|[left, top]|top|^1.4.4|

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

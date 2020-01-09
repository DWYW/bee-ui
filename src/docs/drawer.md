<style>
.demo .bee-button {
  margin-right: 20px;
}
.demo-drawer-content {
  padding: 20px;
  box-sizing: border-box;
}
</style>
<script>
export default {
  data () {
    return {
      show: false,
      position: 'right',
      width: '',
      height: ''
    }
  },
  methods: {
    drawerShow (type) {
      switch (type) {
        case 'close': 
          this.show = false
          break
        case 'top': 
          this.position = 'top'
          this.width = ''
          this.height = '50%'
          this.show = true
          break
        case 'bottom': 
          this.position = 'bottom'
          this.width = ''
          this.height = '50%'
          this.show = true
          break
        case 'left': 
          this.position = 'left'
          this.width = '50%'
          this.height = ''
          this.show = true
          break
        default:
          this.position = 'right'
          this.width = '50%'
          this.height = ''
          this.show = true
      }
    },
    beforeOpen () {
      console.log('before open')
    },
    opened () {
      console.log('opened')
    },
    beforeClose () {
      console.log('before close')
    },
    closed () {
      console.log('closed')
    }
  }
}
</script>
## Drawer 抽屉 (^1.2.0)

### 基本用法

::: demo 
```html
<template>
  <bee-drawer 
    :position="position"
    :width="width"
    :height="height"
    @beforeOpen="beforeOpen"
    @opened="opened"
    @beforeClose="beforeClose"
    @closed="closed"
    v-model="show" 
  >
    <section class="demo-drawer-content">
      <p>{{position}}</p>
      <bee-button @click="drawerShow('close')">close</bee-button>
    </section>
  </bee-drawer>

  <div class="demo">
    <bee-button @click="drawerShow('left')">left</bee-button>
    <bee-button @click="drawerShow()">right</bee-button>
    <bee-button @click="drawerShow('top')">top</bee-button>
    <bee-button @click="drawerShow('bottom')">bottom</bee-button>
  </div>
</template>

<script>
  export default {
  data () {
    return {
      show: false,
      position: 'right',
      width: '',
      height: ''
    }
  },
  methods: {
    drawerShow (type) {
      switch (type) {
        case 'close': 
          this.show = false
          break
        case 'top': 
          this.position = 'top'
          this.width = ''
          this.height = '50%'
          this.show = true
          break
        case 'bottom': 
          this.position = 'bottom'
          this.width = ''
          this.height = '50%'
          this.show = true
          break
        case 'left': 
          this.position = 'left'
          this.width = '50%'
          this.height = ''
          this.show = true
          break
        default:
          this.position = 'right'
          this.width = '50%'
          this.height = ''
          this.show = true
      }
    },
    beforeOpen () {
      console.log('before open')
    },
    opened () {
      console.log('opened')
    },
    beforeClose () {
      console.log('before close')
    },
    closed () {
      console.log('closed')
    }
  }
}
</script>
```
:::

### 属性

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|position|位置|String|right,left,top,bottom|right|1.2.0|
|width|宽度值|String|*|—|1.2.0|
|height|高度值|String|*|—|1.2.0|
|value|是否显示，可使用 v-model 双向绑定数据。|Boolean|*|false|1.2.0|

<br/>
<br/>

### 事件

|事件|说明|版本支持|
|---|---|---|
|beforeOpen|显示之前|1.2.0|
|opened|显示之后|1.2.0|
|beforeClose|消失之前|1.2.0|
|closed|消失之后|1.2.0|


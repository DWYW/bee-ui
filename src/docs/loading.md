<style>
.inline .btn--wp {
  margin: 0 10px 10px 0;
}
.loading-wrapper {
  padding: 20px 0;
}
</style>
<script>
export default {
  data () {
    return {
      laoding: [],
      loading1: false
    }
  },
  methods: {
    addLoading1 (type) {
      const item = this.$_createLoading({
        type: type
      })

      item.show()

      window.setTimeout(() => {
        item.hide()
      }, 3000)
    },
    toggleLoading () {
      this.loading1 = true

      setTimeout(() => {
        this.loading1 = false
      }, 2000)
    }
  }
}
</script>

## loading 加载

### 基本用法

::: demo 
``` html
<template>
  <div class='inline loading-wrapper' ref='base'>
    <bee-button @click="addLoading1(0)">第一种</bee-button>
    <bee-button theme='success' @click="addLoading1(1)">第二种</bee-button>
    <bee-button theme='error' @click="addLoading1(2)">第三种</bee-button>
  </div>
</template>
<script>
export default {
  methods: {
    addLoading1 (type) {
      const item = this.$_createLoading({
        type: type
      })

      item.show()

      window.setTimeout(() => {
        item.hide()
      }, 3000)
    } 
  }
}
</script>
```
:::

### 通过指令添加

::: demo 
``` html
<template>
  <div class='inline loading-wrapper' ref='base' v-loading='loading1' data-type='1' data-text='loading'>
    <bee-button @click="toggleLoading">显示loading</bee-button>
  </div>
</template>
<script>
export default {
  methods: {
    data () {
      return {
        loading1: false
      }
    },
    toggleLoading () {
      this.loading1 = true

      setTimeout(() => {
        this.loading1 = false
      }, 2000)
    }
  }
}
</script>
```
:::


### options

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|parent|要添加的节点|-|—|body|
|type|类型|number|0,1,2|0|
|display|文字和loading之间的排列方式|string|block,inline|block|
|text|加载提示的文字|string|—|加载中|


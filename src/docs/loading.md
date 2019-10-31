<style>
.inline .bee-button {
  margin: 0 10px 10px 0;
}
.loadingper {
  padding: 20px 0;
}
</style>
<script>
export default {
  data () {
    return {
      instance: null,
      loading: false
    }
  },
  methods: {
    addLoading (type) {
      this.instance = this.$_createLoading({
        type: type
      }).show()

      window.setTimeout(() => {
        this.instance.hide()
        this.instance = null
      }, 4000)
    },
    toggleLoading () {
      this.loading = true

      window.setTimeout(() => {
        this.loading = false
      }, 4000)
    }
  }
}
</script>

## loading 加载

### 基本用法

::: demo 
``` html
<template>
  <div class='inline loadingper'>
    <bee-button @click="addLoading('main')">第一种</bee-button>
    <bee-button theme='success' @click="addLoading('pie')">第二种</bee-button>
    <bee-button theme='error' @click="addLoading('undulate')">第三种</bee-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      instance: null
    }
  },
  methods: {
    addLoading (type) {
      this.instance = this.$_createLoading({
        type: type
      }).show()

      window.setTimeout(() => {
        this.instance.hide()
        this.instance = null
      }, 4000)
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
  <div class='inline loadingper' v-loading='loading' data-type='pie' data-text='loading' data-block='false'>
    <bee-button @click="toggleLoading">显示loading</bee-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    toggleLoading () {
      this.loading = true

      window.setTimeout(() => {
        this.loading = false
      }, 4000)
    }
  }
}
</script>
```
:::


### options

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|parent|loading的父级节点|Element|—|body|*|
|text|加载提示的文字|String|—|加载中|*|
|type|类型|String|main,pie,undulate|main|1.0.0|
|block|文字和loading之间的排列方式|Boolean|—|true|1.0.0|


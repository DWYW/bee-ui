<style>
.inline .btn--wp {
  margin: 0 10px 10px 0;
}
</style>
<script>
export default {
  data () {
    return {
      messages: []
    }
  },
  methods: {
    notify1 (type) {
      let options = {
        message: '这是一段提示文字。',
        duration: 3
      }

      type ? options.type = type : null

      this.$_createNotify(options).show()
    },

    notify2 (type) {
      let options = {
        title: '非自动',
        message: '非自动关闭',
        duration: 0
      }

      type ? options.type = type : null

      this.$_createNotify(options).show()
    }
  }
}
</script>

## notification 通知

### 基本用法

::: demo 
``` html
<template>
  <div class='inline'>
    <bee-button @click="notify1()">默认</bee-button>
    <bee-button theme='primary' @click="notify1('warn')">warn</bee-button>
    <bee-button theme='success' @click="notify1('success')">success</bee-button>
    <bee-button theme='error' @click="notify1('error')">error</bee-button>
  </div>
</template>
<script>
export default {
  methods: {
    notify1 (type) {
      let options = {
        message: '这是一段提示文字。',
        duration: 3
      }

      type ? options.type = type : null

      this.$_createNotify(options).show()
    }
  }
}
</script>
```
:::

### 非自动关闭

::: demo 
``` html
<template>
  <div class='inline'>
    <bee-button @click="notify2()">默认</bee-button>
    <bee-button theme='primary' @click="notify2('warn')">warn</bee-button>
    <bee-button theme='success' @click="notify2('success')">success</bee-button>
    <bee-button theme='error' @click="notify2('error')">error</bee-button>
  </div>
</template>
<script>
export default {
  methods: {
    notify2 (type) {
      let options = {
        title: '非自动',
        message: '非自动关闭',
        duration: 0
      }

      type ? options.type = type : null

      this.$_createNotify(options).show()
    }
  }
}
</script>
```
:::



### options

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|type|类型|string|info,warn,success,error|info|
|duration|显示的时长|number|—|3|
|title|通知的标题|string|—|-|
|message|通知的信息|string|—|-|

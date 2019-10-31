<style>
.inline .bee-button {
  margin: 0 10px 10px 0;
}
</style>
<script>
export default {
  methods: {
    showMessage (text) {
      this.$_createMessage({
        message: text
      }).show()
    },
    createBaseAlert () {
      this.$_createAlert({
        title: '自定义标题',
        message: '是否喜欢吃水果？',
        cancelText: '不',
        confirmText: '是',
        onclose: () => {
          this.showMessage('已关闭')
        },
        oncancel: () => {
          this.showMessage('已取消')
        },
        onconfirm: () => {
          this.showMessage('已确认')
        }
      }).show()
    }
  }
}
</script>

## alert 对话

### 基本用法

::: demo 
``` html
<template>
  <div class='inline'>
    <bee-button @click="createBaseAlert">基本用法</bee-button>
  </div>
</template>
<script>
export default {
  methods: {
    showMessage (text) {
      this.$_createMessage({
        message: text
      }).show()
    },
    createBaseAlert () {
      this.$_createAlert({
        title: '自定义标题',
        message: '是否喜欢吃水果？',
        cancelText: '不',
        confirmText: '是',
        onclose: () => {
          this.showMessage('已关闭')
        },
        oncancel: () => {
          this.showMessage('已取消')
        },
        onconfirm: () => {
          this.showMessage('已确认')
        }
      }).show()
    }
  }
}
</script>
```
:::


### options

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|title|标题|String|—|提示|*|
|message|提示的文字信息|String|—|—|*|
|html|提示的HTML代码|String|—|—|*|
|title|标题|String|—|提示|*|
|center|内容是否居中|Boolean|—|false|1.0.0|
|closeVisible|是否显示关闭按钮|Boolean|—|true|1.0.0|
|cancelVisible|是否显示取消按钮|Boolean|—|true|1.0.0|
|cancelText|取消按钮显示的文字|String|—|取消|1.0.0|
|confirmVisible|是否显示确定按钮|Boolean|—|true|1.0.0|
|confirmText|确定按钮显示的文字|String|—|确定|1.0.0|
|onclose|关闭行为的回调|Function|—|—|1.0.0|
|oncancel|取消行为的回调|Function|—|—|1.0.0|
|onconfirm|确认行为的回调	|Function|—|—|1.0.0|



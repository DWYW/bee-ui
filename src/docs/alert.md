<style>
.inline .btn--wp {
  margin: 0 10px 10px 0;
}
</style>

<script>
export default {
  methods: {
    base (type) {
      let options = {
        message: '这是一段通知内容'
      }

      if (type >= 1) {
        options.title = '自定义标题'
      }
      
      if (type >= 2) {
        options.cancelBtnFun = () => {
          this.$_createMessage({
            message: '已取消'
          }).show()
        }
      }
      
      if (type >= 3) {
        options.confirmBtnFun = () => {
          this.$_createMessage({
            message: '已确定',
            type: 'success'
          }).show()
        }
      }
      
      if (type >= 4) {
        options.closeBtnFun = () => {
          this.$_createMessage({
            message: '已关闭',
            type: 'error'
          }).show()
        }
      }

      this.$_createAlert(options).show()
    },

    center (type) {
      let options = {
        title: '居中方式',
        message: '这是一段提示信息',
        align: type
      }

      this.$_createAlert(options).show()
    },

    useHtml () {
      this.$_createAlert({
        title: 'use html',
        html: `这是一段<span style='color: red; font-size: 18px;'>HTML</span>内容`
      }).show()
    },

    noClose () {
      this.$_createAlert({
        title: 'no close',
        closeBtnVisiable: false
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
    <bee-button @click="base(0)">默认</bee-button>
    <bee-button @click="base(1)">自定义标题</bee-button>
    <bee-button @click="base(2)">取消回调</bee-button>
    <bee-button @click="base(3)">确定回调</bee-button>
    <bee-button @click="base(4)">关闭回调</bee-button>
  </div>
</template>
<script>
export default {
  methods: {
    base (type) {
      let options = {
        message: '这是一段通知内容'
      }

      if (type >= 1) {
        options.title = '自定义标题'
      }
      
      if (type >= 2) {
        options.cancelBtnFun = () => {
          this.$_createMessage({
            message: '已取消'
          }).show()
        }
      }
      
      if (type >= 3) {
        options.confirmBtnFun = () => {
          this.$_createMessage({
            message: '已确定',
            type: 'success'
          }).show()
        }
      }
      
      if (type >= 4) {
        options.closeBtnFun = () => {
          this.$_createMessage({
            message: '已关闭',
            type: 'error'
          }).show()
        }
      }

      this.$_createAlert(options).show()
    }
  }
}
</script>
```
:::


### 居中方式

::: demo 
``` html
<template>
  <div class='inline'>
    <bee-button @click="center('horizontal')">水平居中</bee-button>
    <bee-button @click="center('vertial')">垂直居中</bee-button>
    <bee-button @click="center('center')">垂直水平居中</bee-button>
  </div>
</template>
<script>
export default {
  methods: {
    center (type) {
      let options = {
        title: '居中方式',
        message: '这是一段提示信息',
        align: type
      }

      this.$_createAlert(options).show()
    }
  }
}
</script>
```
:::


### 其他用法

::: demo 
``` html
<template>
  <div class='inline'>
    <bee-button @click="useHtml">使用HTML</bee-button>
    <bee-button @click="noClose">取消关闭按钮</bee-button>
  </div>
</template>
<script>
export default {
  methods: {
    useHtml () {
      this.$_createAlert({
        title: 'use html',
        html: `这是一段<span style='color: red; font-size: 18px;'>HTML</span>内容`
      }).show()
    },
    noClose () {
      this.$_createAlert({
        title: 'no close',
        closeBtnVisiable: false
      }).show()
    }
  }
}
</script>
```
:::

### options

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|title|标题|string|-|提示|
|message|提示的文字信息|string|—|-|
|html|提示的HTML代码|string|—|-|
|cancelBtnVisiable|是否显示取消按钮|boolean|-|true|
|cancelBtnText|取消按钮显示的文字|string|-|取消|
|cancelBtnFun|取消按钮绑定的事件函数|function|-|-|
|confirmBtnVisiable|是否显示确定按钮|boolean|-|true|
|confirmBtnText|确定按钮显示的文字|string|-|确定|
|confirmBtnFun|确定按钮绑定的事件函数|function|-|-|
|closeBtnVisiable|是否显示关闭按钮|boolean|-|true|
|closeBtnFun|关闭按钮绑定的事件函数|function|-|-|

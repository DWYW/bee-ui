<script>
export default {
  data () {
    return {
      show1: false,
      show2: false,
      show3: false
    }
  }
}
</script>
## Dialog

### 基本用法

::: demo 
```html
<template>
  <bee-button @click='show1=!show1'>open dialog</bee-button>
  <bee-dialog :show.sync='show1'>
    这里是一段测试内容
  </bee-dialog>
</template>
```
:::

### 设置 dialog 宽度

::: demo
```html
<template>
  <bee-button @click='show2=!show2'>宽度400px</bee-button>
  <bee-dialog :show.sync='show2' width='400px'>
   宽度400px
  </bee-dialog>
</template>
```
:::

### 阻止提交关闭事件

::: demo
```html
<template>
  <bee-button @click='show3=!show3'>阻止提交关闭事件</bee-button>
  <bee-dialog :show.sync='show3' :confirm-btn-fun='() => false'>
   阻止提交关闭事件
  </bee-dialog>
</template>
```
:::

### 属性值

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|show.sync|是否显示的阈值|boolean|-|-|
|width|dialog的宽度|string|*|500px|
|title|标题|string|-|提示|
|cancelBtnVisible|是否显示取消按钮|boolean|-|true|
|cancelBtnText|取消按钮显示的文字|string|-|取消|
|cancelBtnFun|取消按钮绑定的事件函数|function|-|-|
|confirmBtnVisible|是否显示确定按钮|boolean|-|true|
|confirmBtnText|确定按钮显示的文字|string|-|确定|
|confirmBtnFun|确定按钮绑定的事件函数|function|-|-|
|closeBtnVisible|是否显示关闭按钮|boolean|-|true|
|closeBtnFun|关闭按钮绑定的事件函数|function|-|-|

<br/>
<br/>

> 关于 close 的事件执行，closeBtnFun 和 cancelBtnFun 如果都设定了，则执行 closeBtnFun；如果设定了其中一个，则执行其中的一个。

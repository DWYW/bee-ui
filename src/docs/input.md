<style >
.demo  .bee-input {
  margin-right: 20px;
  margin-bottom: 10px;
}
</style>

<script>
export default {
  data() {
    return {
      model: {
        base: [null, null, null, null],
        icon: [null, null],
        autofoucs: null,
        reg: [null, null, null],
        event: [null, null, null]
      },
      leftIcon: {
        position: 'left',
        icon: 'search'
      },
      rightIcon: {
        position: 'right',
        icon: 'success'
      },
      mobileIcon: {
        position: 'left',
        icon: 'mobile'
      },
      eventIcon: {
        position: 'right',
        icon: 'success',
        listeners: {
          click: this.iconPrint
        }
      }
    }
  },
  methods: {
    AZReg (value) {
      return /^[a-zA-Z]+$/.test(value)
    },
    regStatic (value) {
      return 'bee-ui'
    },
    print (e) {
      console.log(e.type, e)
    },
    iconPrint(e) {
      console.log(`icon ${e.type}`, e)
    }
  }
}

</script>

## input 输入框

### 基本用法

::: demo
``` html
<template>
  <div class='demo'>
    <p>
      <bee-input v-model='model.base[0]' placeholder='请输入'></bee-input>
      <bee-input v-model='model.base[1]' theme='primary' placeholder='请输入'></bee-input>
      <bee-input v-model='model.base[2]' theme='success' placeholder='请输入'></bee-input>
      <bee-input v-model='model.base[3]' theme='error' placeholder='请输入'></bee-input>
    </p>
    <p v-for='(item, index) in model.base' :key='index'>您输入的是：{{item}}</p>
  <div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        base: [null, null, null, null]
      }
    }
  }
}
</script>
```
:::

### 自动获取焦点

::: demo

``` html
<template>
  <div class='demo'>
    <p>
      <bee-input v-model='model.autofoucs' placeholder='请输入' :autofocus='true'></bee-input>
    </p>
    <p> 您输入的是：{{model.autofoucs}}</p>
  <div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        autofoucs: null
      }
    }
  }
}

</script>
```
:::


### 添加icon

::: demo
``` html
<template>
  <div class='demo'>
    <p>
      <bee-input v-model='model.icon[0]' placeholder='请输入' :icon='leftIcon'></bee-input>
      <bee-input v-model='model.icon[1]' theme='success' placeholder='请输入' :icon='rightIcon'></bee-input>
    </p>
    <p v-for='(item, index) in model.icon' :key='index' >您输入的是：{{item}}</p>
  <div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        icon: [null, null]
      },
      leftIcon: {
        position: 'left',
        icon: 'search'
      },
      rightIcon: {
        position: 'right',
        icon: 'success'
      }
    }
  }
}
</script>
```
:::

### 禁用状态

::: demo

``` html
<template>
  <div class='demo'>
    <p>
      <bee-input placeholder='请输入' :icon="leftIcon" disabled></bee-input>
      <bee-input theme='primary' placeholder='请输入' disabled></bee-input>
      <bee-input theme='success' placeholder='请输入' :icon="rightIcon" disabled></bee-input>
      <bee-input theme='error' placeholder='请输入'disabled></bee-input>
    </p>
  <div>
</template>

<script>
export default {
  data() {
    return {
      leftIcon: {
        position: 'left',
        icon: 'search'
      },
      rightIcon: {
        position: 'right',
        icon: 'success'
      }
    }
  }
}
</script>
```
:::

### 只读状态

::: demo

``` html
<template>
  <div class='demo'>
    <p>
      <bee-input placeholder='请输入' :readonly='true' value='readOnly'></bee-input>
      <bee-input theme='primary' placeholder='请输入' :readonly='true' value='readOnly'></bee-input>
      <bee-input theme='success' placeholder='请输入' :readonly='true' value='readOnly'></bee-input>
      <bee-input theme='error' placeholder='请输入' :readonly='true' value='readOnly'></bee-input>
    </p>
  <div>
</template>
```
:::

### 最大输入长度

::: demo

``` html
<template>
  <div class='demo'>
    <p>
      <bee-input placeholder='请输入' maxlength=2></bee-input>
    </p>
  <div>
</template>
```
:::

### 过滤

::: demo

``` html
<template>
  <div class='demo'>
    <p>
      <bee-input v-model='model.reg[0]' 
        placeholder='请输入手机号' 
        :icon="mobileIcon" 
        reg='^(1|1[3-9]|1[3-9]\d{1,9})$'
      ></bee-input>

      <bee-input v-model='model.reg[1]' 
        placeholder='只能输人a-zA-Z' 
        :icon="leftIcon" 
        :reg=AZReg
      ></bee-input>

      <bee-input v-model='model.reg[2]' 
        placeholder='不管如如啥都是bee-ui' 
        :icon="leftIcon" 
        :reg=regStatic
      ></bee-input>
    </p>
    <p v-for='(item, index) in model.reg' :key='index'>您输入的是：{{item}}</p>
  <div>
  <div>
</template>

<script>
  export default {
  data() {
    return {
      model: {
        reg: [null, null, null]
      },
      leftIcon: {
        position: 'left',
        icon: 'search'
      },
      mobileIcon: {
        position: 'left',
        icon: 'mobile'
      }
    }
  },
  methods: {
    AZReg (value) {
      return /^[a-zA-Z]+$/.test(value)
    },
    regStatic (value) {
      return 'bee-ui'
    }
  }
}
</script>
```
:::

### 事件监听

::: demo

``` html
<template>
  <div class='demo'>
    <p>
      <bee-input 
        placeholder='打开console面板' 
        @change='print' 
        @click='print'
        v-model='model.event[0]'
      ></bee-input>
      <bee-input 
        placeholder='打开console面板' 
        @mouseenter='print' 
        @mouseleave='print' 
        v-model='model.event[1]'
      ></bee-input>
      <bee-input 
        placeholder='打开console面板' 
        :icon='eventIcon'
        v-model='model.event[2]'
      ></bee-input>
    </p>
  <div>
  <div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        event: [null, null, null]
      },
      eventIcon: {
        position: 'right',
        icon: 'success',
        listeners: {
          click: this.iconPrint
        }
      }
    }
  },
  methods: {
    print (e) {
      console.log(e.type, e)
    },
    iconPrint(e) {
      console.log(`icon ${e.type}`, e)
    }
  }
}

</script>
```
:::

### 属性值

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|autofocus|自动获取焦点（1.0.0之前为autoFocus）|Boolean|—|—|*|
|disabled|禁用状态|Boolean|—|—|*|
|maxlength|输入的最大长度|Number|—|—|*|
|icon|图标的配置信息|Object|—|—|*|
|placeholder|占位符|String|—|—|*|
|readonly|只读（1.0.0之前为readOnly）|Boolean|—|—|*|
|reg|value的格式化函数或正则表达式字符串|Function, String, RegExp|—|—|1.0.0 <br/> RegExp 1.0.5|
|theme|按钮的类型|String|default, primary, success, error|default|*|
|type|输入框的类型|String|*|text|*|

<br/>

> icon 的监听事件， 通过icon.listeners传入BeeIcon组件

<br/>

### 事件

1.0.0+没有说明的其它事件, 则通过 $listeners 传入到 input 元素中。
<br/>

|事件|说明|版本支持|
|---|---|---|
|enter|enter按键的回调函数|1.0.0|

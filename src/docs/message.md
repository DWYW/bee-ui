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
    message1 (type) {
      let options = {
        message: '这是一段提示文字。',
        duration: 3
      }

      type ? options.type = type : null

      this.$_createMessage(options).show()
    },
    message2 () {
      let item = this.$_createMessage({
        message: '不会自动移除的提示。',
        duration: 0
      })
      
      item.show()
      this.messages.push(item)
    },

    remove2 () {
      let item = this.messages.pop()
      item && item.close()
    },
    message3 () {
      this.$_createMessage({
        html: `<span style='color: red;'>这是一段 <span style='font-size: 20px;'> HTML </span>提示。</span>`
      }).show()
    },
    message4 (align) {
      let options = {
        message: '居中对其',
        align: align
      }

      this.$_createMessage(options).show()
    }
  }
}
</script>

## message

### 基本用法

::: demo 
``` html
<template>
  <div class='inline'>
    <bee-button @click="message1()">默认</bee-button>
    <bee-button theme='success' @click="message1('success')">success</bee-button>
    <bee-button theme='error' @click="message1('error')">error</bee-button>
  </div>
</template>
<script>
export default {
  methods: {
    message1 (type) {
      let options = {
        message: '这是一段提示文字。',
        duration: 3
      }

      type ? options.type = type : null

      this.$_createMessage(options).show()
    }
  }
}
</script>
```
:::

### 手动关闭

::: demo 
``` html
<template>
  <div class='inline'>
    <bee-button @click="message2()">显示</bee-button>
    <bee-button @click="remove2()">移除</bee-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      messages: []
    }
  },
  methods: {
    message2 () {
      let item = this.$_createMessage({
        message: '不会自动移除的提示。',
        duration: 0
      })
      
      item.show()

      this.messages.push(item)
    },

    remove2 () {
      let item = this.messages.pop()
      item.close()
    }
  }
}
</script>
```
:::

### 使用HTML

::: demo 
``` html
<template>
  <div class='inline'>
    <bee-button @click="message3()">使用HTML</bee-button>
  </div>
</template>
<script>
export default {
  methods: {
    message3 () {
      this.$_createMessage({
        html: `<span style='color: red;'>这是一段 <span style='font-size: 20px;'> HTML </span>提示。</span>`
      }).show()
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
    <bee-button @click="message4('left')">left</bee-button>
    <bee-button @click="message4('center')">center</bee-button>
  </div>
</template>
<script>
export default {
  methods: {
    message4 (align) {
      let options = {
        message: '居中对其',
        align: align
      }

      this.$_createMessage(options).show()
    }
  }
}
</script>
```
:::


### options

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|type|类型|string|warn,success,error|warn|
|duration|显示的时长|number|—|3|
|message|提示的文字信息|string|—|-|
|html|提示的HTML代码|string|—|-|
|align|提示文字的对其方式|left,center|—|left|

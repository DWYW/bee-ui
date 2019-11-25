<script>
export default {
  data () {
    return {
      base: {
        show: false,
        fruit: null
      },
      closeDisabled: false,
      cancelDisabled: false,
      confirmDisabled: false,
      footerDisabled: false,
      stopConfirmHide: false,
      loading: false
    }
  },
  computed: {
    options () {
      return  [{
        label: '香蕉',
        value: 1
      }, {
        label: '苹果',
        value: 2
      }, {
        label: '梨',
        value: 3
      }, {
        label: '奇异果',
        value: 4
      }]
    }
  },
  methods: {
    beforeEnter () {
      console.log('before enter')
      this.base.fruit = null
    },

    afterLeave () {
      console.log('after leave')
    },

    close () {
      console.log('close event')
    },
    cancel () {
      console.log('cancel event')
    },
    confirm () {
      console.log('confirm event')
      console.log('you selected:', this.base.fruit, this.options.find(item => item.value === this.base.fruit))
    },
    confirmSync (done) {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        done()
      }, 1000)
    }
  }
}
</script>
## Dialog

### 基本用法

::: demo 
```html
<template>
  <bee-button @click='base.show = true'>open dialog</bee-button>
  <bee-dialog 
    v-model='base.show'
    width='400px'
    title='自定义标题'
    cancelText='❌'
    confirmText='✔️'
    @beforeEnter='beforeEnter'
    @afterLeave='afterLeave' 
    @close='close' 
    @cancel='cancel'         
    @confirm='confirm'
  >
    <p>这里是一段测试内容</p>
    <div>
      <bee-select :options='options' v-model='base.fruit'></bee-select>
    </div>
  </bee-dialog>
</template>

<script>
export default {
  data () {
    return {
      base: {
        show: false,
        fruit: null
      }
    }
  },
  computed: {
    options () {
      return  [{
        label: '香蕉',
        value: 1
      }, {
        label: '苹果',
        value: 2
      }, {
        label: '梨',
        value: 3
      }, {
        label: '奇异果',
        value: 4
      }]
    }
  },
  methods: {
    beforeEnter () {
      console.log('before enter')
      this.base.fruit = null
    },

    afterLeave () {
      console.log('after leave')
    },

    close () {
      console.log('close event')
    },
    cancel () {
      console.log('cancel event')
    },
    confirm () {
      console.log('confirm event')
      console.log('you selected:', this.base.fruit, this.options.find(item => item.value === this.base.fruit))
    }
  }
}
</script>
```
:::

### 按钮的显示

::: demo
```html
<template>
  <bee-button @click='closeDisabled = true' style='margin-right: 10px;'>不显示关闭</bee-button>
  <bee-button @click='cancelDisabled = true' style='margin-right: 10px;'>不显示取消</bee-button>
  <bee-button @click='confirmDisabled = true' style='margin-right: 10px;'>不显示确认</bee-button>
  <bee-button @click='footerDisabled = true' style='margin-right: 10px;'>不显示确认和取消</bee-button>

  <bee-dialog v-model='closeDisabled' :close-visible='false'>不显示关闭</bee-dialog>
  <bee-dialog v-model='cancelDisabled' :cancel-visible='false'>不显示取消</bee-dialog>
  <bee-dialog v-model='confirmDisabled' :confirm-visible='false'>不显示确认</bee-dialog>
  <bee-dialog v-model='footerDisabled' :cancel-visible='false' :confirm-visible='false'>不显示确认和取消</bee-dialog>
</template>
```
:::

### 阻止提交关闭

::: demo
```html
<template>
  <bee-button @click='stopConfirmHide = true'>阻止提交关闭</bee-button>
  <bee-dialog 
    v-model='stopConfirmHide' 
    loading-text='处理中'
    loading-type='pie'
    :loading='loading'
    :sync='false' 
    @cancel='cancel' 
    @confirm='confirmSync' 
  >阻止提交关闭</bee-dialog>
</template>

<script>
export default {
  data () {
    return {
      stopConfirmHide: false,
      loading: false
    }
  },
  methods: {
    cancel () {
      console.log('cancel event')
    },
    confirmSync (done) {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        done()
      }, 1000)
    }
  }
}
</script>
```
:::

### 属性

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|value|dialog是否显示，可使用 v-model 双向绑定数据。|Boolean|—|—|1.0.0|
|width|dialog的宽度|String|—|500px|*|
|title|标题|String|—|提示|*|
|closeVisible|是否显示关闭按钮|Boolean|—|true|1.0.0|
|cancelVisible|是否显示取消按钮|Boolean|—|true|1.0.0|
|cancelText|取消按钮显示的文字|String|—|取消|1.0.0|
|confirmVisible|是否显示确定按钮|Boolean|—|true|1.0.0|
|confirmText|确定按钮显示的文字|String|—|确定|1.0.0|
|loading|是否添加loading效果|Boolean|—|false|1.0.0|
|loadingType|loading类型|String|[详细见loading](#/components/loading)|[详细见loading](#/components/loading)|1.0.0|
|loadingText|loading加载提示的文字|String|[详细见loading](#/components/loading)|[详细见loading](#/components/loading)|1.0.0|
|sync|confirm事件是否是同步事件|Boolean|—|true|1.0.0|
|stopPenetrate|是否阻止鼠标的穿透行为|Boolean|—|false|1.0.0|

<br/>
<br/>

### 事件

|事件|说明|版本支持|
|---|---|---|
|beforeEnter|出现之前的回调|1.0.0|
|afterLeave|消失之后的回调|1.0.0|
|close|关闭行为的回调|1.0.0|
|cancel|取消行为的回调|1.0.0|
|confirm|确认行为的回调|1.0.0|

<br/>

> 1.0.0之前，关于 close 的事件执行，<br/>
> closeBtnFun 和 cancelBtnFun 如果都设定了，则执行 closeBtnFun；如果设定了其中一个，则执行其中的一个。<br/><br/>
> 1.0.0开始，<br/>
> cancel事件执行完之后，如果存在close事件，则自动调用close事件。

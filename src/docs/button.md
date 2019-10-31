<style>
  .bee-button {
    margin-right: 10px;
  }
</style>

<script>
export default {
  methods: {
    print (e) {
      console.log(e.type)
    }
  }
}
</script>

## 按钮

### 基本用法

:::demo
```html
<bee-button class='button-test'>default</bee-button>
<bee-button theme='primary'>primary</bee-button>
<bee-button theme='success'>success</bee-button>
<bee-button theme='error'>error</bee-button>
```
:::

### 启用动画效果
:::demo
``` html
<bee-button :animation='true' @click='print'>default</bee-button>
<bee-button theme='primary' :animation='true' @mouseenter='print'>primary</bee-button>
<bee-button theme='success' :animation='true'>success</bee-button>
<bee-button theme='error' :animation='true'>error</bee-button>
```
:::

### 禁用状态
:::demo
``` html
<bee-button disabled>default</bee-button>
<bee-button theme='primary' disabled>primary</bee-button>
<bee-button theme='success' disabled>success</bee-button>
<bee-button theme='error' disabled>error</bee-button>
```
:::

### 大小
:::demo
``` html
<bee-button size='sm'>default</bee-button>
<bee-button>default</bee-button>
<bee-button size='lg'>default</bee-button>

<bee-button theme='primary' size='sm'>default</bee-button>
<bee-button theme='primary'>default</bee-button>
<bee-button theme='primary' size='lg'>default</bee-button>
```
:::

### 图标
:::demo
``` html
<bee-button icon='add'>添加</bee-button>
<bee-button icon='add' :animation="true">添加</bee-button>
<bee-button :icon="{
  icon: 'edit'
}" theme="primary">edit</bee-button>

<bee-button 
  :animation="true"
  :icon="{
    icon: 'edit'
  }" theme="primary"
>edit</bee-button>
```
:::

### 属性值

| 参数 | 说明 |	类型 |	可选值 |	默认值 | 版本支持|
|---|---|---|---|---|---|
| theme | 按钮的类型 |	String |	default, primary, success,  error |	default |*|
| size | 按钮的大小 |	String |	md, sm, lg |	md |*|
| animation | 是否启用动画效果 |	Boolean |	— |	false |*|
| disabled | 是否禁用 |	Boolean |	— |	false |*|
| icon | 添加的图标类型 |	String, Object |	— |	— |1.0.0|

<br/>
<br/>

### 事件

1.0.0+没有说明的其它事件, 则通过 $listeners 传入到根元素中。
<style>
  .btn--wp {
    margin-right: 10px;
  }
</style>

## 按钮

### 基本用法

:::demo
```html
<bee-button>default</bee-button>
<bee-button theme='primary'>primary</bee-button>
<bee-button theme='success'>success</bee-button>
<bee-button theme='error'>error</bee-button>
```
:::

### 启用动画效果
:::demo
``` html
<bee-button :animation='true'>default</bee-button>
<bee-button theme='primary' :animation='true'>primary</bee-button>
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

### 属性值

<!-- ``` html
<bee-button
  :theme=String
  :size=String
  :animation=Boolean
  :disabled='Boolean'
/>
``` -->

| 参数 | 说明 |	类型 |	可选值 |	默认值 |
|---|---|---|---|---|
| theme | 按钮的类型 |	string |	default,primary,success, error |	default |
| size | 按钮的大小 |	string |	sm,lg |	null |
| animation | 是否启用动画效果 |	boolean |	- |	false |
| disabled | 是否禁用 |	boolean |	- |	false |

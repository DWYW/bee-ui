<style>
  .inline .checkbox--wp {
    margin-right: 20px;
  }
</style>
## checkbox 多选

### 基本用法
::: demo 

``` html
<template>
  <div class='inline'>
    <bee-checkbox v-model='banana'>香蕉</bee-checkbox>
    <bee-checkbox v-model='apple'>苹果</bee-checkbox>
    <bee-checkbox disabled>奇异果</bee-checkbox>
  </div>
  <p>
    已选择：<span v-if='banana'>香蕉</span> <span v-if='banana && apple'>,</span><span v-if='apple'>苹果</span>
  </p>
</template>

<script>
export default {
  data () {
    return {
      banana: null,
      apple: null
    }
  }
}
</script>
```
:::

### 属性值

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|icons|选项的图标配置信息|array|-|['radio-unselected', 'radio-selected']|
|disabled|禁用状态|boolean|-|-|

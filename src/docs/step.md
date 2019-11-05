<script>
export default {
  data () {
    return {
      steps: [{
        label: "步骤1",
        desc: "这是一段说明文字"
      }, "步骤2", {
        desc: '这也是一段说明文字'
      }, "步骤4", "步骤5"]
    }
  }
}
</script>
## step 步骤条

### 基本用法

::: demo 
``` html
<template>
  <div class='inline'>
    <bee-step :labels='steps'></bee-step>
    <bee-step :labels='steps' :step='2'></bee-step>
  </div>
</template>

<script>
export default {
  data () {
    return {
      steps: [{
        label: "步骤1",
        desc: "这是一段说明文字"
      }, "步骤2", {
        desc: '这也是一段说明文字'
      }, "步骤4", "步骤5"]
    }
  }
}
</script>
```
:::

### 属性值

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|labels|数据源|array|—|—|*|
|step|当前步骤|number|—|1|*|

<br/>

labels配置项，1.0.0 开始支持 Object 类型。
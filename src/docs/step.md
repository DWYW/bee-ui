<script>
export default {
  data () {
    return {
      steps: ["步骤1", "步骤2", "步骤3", "步骤4", "步骤5"]
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      steps: ["步骤1", "步骤2", "步骤3", "步骤4", "步骤5"]
    }
  }
}
</script>
```
:::

### 属性值

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|labels|数据源|array|—|-|
|step|当前步骤|number|—|1|

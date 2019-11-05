<script>
export default {
  data () {
    return {
      pagination: {
        page: 1,
        total: 99,
        pageTotal: 10
      }
    }
  },
  methods: {
    onChange (page) {
      this.$set(this.pagination, 'page', page)
      console.log('current page is:' + page)
    }
  }
}
</script>
## pagination 分页

### 基本用法

::: demo

``` html
<template>
  <bee-pagination 
    :page='pagination.page' 
    :total='pagination.total' 
    :page-total='pagination.pageTotal'
    @change='onChange'
  ></bee-pagination>
  <br/>
  <bee-pagination 
    :page='1' 
    :total='2' 
    :page-total='1'
    @change='onChange'
  ></bee-pagination>
</template>
```
:::

### 属性值

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|page|当前页码|number|—|1|*|
|pageTotal|总页数|number|—|—|*|
|total|总条数|number|—|—|*|
|totalVisible|是否显示总条数|boolean|—|true|*|
|maxlength|连续显示的页码个数|number|—|5|*|

<br/>

### 事件

|方法|说明|版本支持|
|---|---|---|
|change|页码改变事件|*|
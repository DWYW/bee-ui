<style>
.bee-tooltip > span {
  border: 1px solid #cccccc;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
}
</style>

<script> 
export default {
  data () {
    return {
      position: 'top'
    }
  },
  methods: {
    setPosition (data) {
      this.position = data
    }
  }
}
</script>

## tooltip 文字提示

### 基本用法

::: demo 
``` html
<template>
  <div>
    <section style='margin-bottom: 20px; overflow: hidden;'>
      <div style='width: 20%; float: left;'><br/></div>

      <div style='width: 20%; float: left; text-align: center;'>
        <bee-tooltip :content="'这是一段提示文字\n位置：top start'" position='top start'>
          <span class='span' @mouseenter="setPosition('top start')">top start</span>
        </bee-tooltip>
      </div>
      
      <div style='width: 20%; float: left; text-align: center;'>
        <bee-tooltip :content="'这是一段提示文字\n位置：top'" position='top'>
          <span class='span' @mouseenter="setPosition('top')">top</span>
        </bee-tooltip>
      </div>

      <div style='width: 20%; float: left; text-align: center;'>
        <bee-tooltip :content="'这是一段提示文字\n位置：top end'" position='top end'>
          <span class='span' @mouseenter="setPosition('top end')">top end</span>
        </bee-tooltip>
      </div>
      <div style='width: 20%; float: left;'><br/></div>
    </section>

    <section style='margin-bottom: 20px; overflow: hidden;'>
      <div style='width: 20%; float: left;'>
        <bee-tooltip :content="'这是一段提示文字\n位置：left start'" position='left start'>
          <span class='span' @mouseenter="setPosition('left start')">left start</span>
        </bee-tooltip>
      </div>

      <div style='width: 20%;float: left;'><br/></div>
      <div style='width: 20%;float: left;'><br/></div>
      <div style='width: 20%;float: left;'><br/></div>

      <div style='width: 20%;float: left;'>
        <bee-tooltip :content="'这是一段提示文字\n位置：right start'" position='right start'>
          <span class='span' @mouseenter="setPosition('right start')">right start</span>
        </bee-tooltip>
      </div>
    </section>

    <section style='margin-bottom: 20px; overflow: hidden;'>
      <div style='width: 20%; float: left;'>
        <bee-tooltip :content="'这是一段提示文字\n位置：left'" position='left'>
          <span class='span' @mouseenter="setPosition('left')">left</span>
        </bee-tooltip>
      </div>

      <div style='width: 20%;float: left;'><br/></div>
      <div style='width: 20%;float: left;'><br/></div>
      <div style='width: 20%;float: left;'><br/></div>
      
      <div style='width: 20%;float: left;'>
        <bee-tooltip :content="'这是一段提示文字\n位置：right'" position='right'>
          <span class='span' @mouseenter="setPosition('right')">right</span>
        </bee-tooltip>
      </div>
    </section>

    <section style='margin-bottom: 20px; overflow: hidden;'>
      <div style='width: 20%; float: left;'>
        <bee-tooltip :content="'这是一段提示文字\n位置：left end'" position='left end'>
          <span class='span' @mouseenter="setPosition('left end')">left end</span>
        </bee-tooltip>
      </div>

      <div style='width: 20%;float: left;'><br/></div>
      <div style='width: 20%;float: left;'><br/></div>
      <div style='width: 20%;float: left;'><br/></div>

      <div style='width: 20%;float: left;'>
        <bee-tooltip :content="'这是一段提示文字\n位置：right end'" position='right end'>
          <span class='span' @mouseenter="setPosition('right end')">right end</span>
        </bee-tooltip>
      </div>
    </section>

    <section style='margin-bottom: 20px; overflow: hidden;'>
      <div style='width: 20%; float: left;'><br/></div>

      <div style='width: 20%; float: left; text-align: center;'>
        <bee-tooltip :content="'这是一段提示文字\n位置：bottom start'" position='bottom start'>
          <span class='span' @mouseenter="setPosition('bottom start')">bottom start</span>
        </bee-tooltip>
      </div>
      
      <div style='width: 20%; float: left; text-align: center;'>
        <bee-tooltip :content="'这是一段提示文字\n位置：bottom'" position='bottom'>
          <span class='span' @mouseenter="setPosition('bottom')">bottom</span>
        </bee-tooltip>
      </div>

      <div style='width: 20%; float: left; text-align: center;'>
        <bee-tooltip :content="'这是一段提示文字\n位置：bottom end'" position='bottom end'>
          <span class='span' @mouseenter="setPosition('bottom end')">bottom end</span>
        </bee-tooltip>
      </div>
      <div style='width: 20%; float: left;'><br/></div>
    </section>
  </div>
</template>
<script> 
export default {
  data () {
    return {
      position: 'top'
    }
  },
  methods: {
    setPosition (data) {
      this.position = data
    }
  }
}
</script>
```
:::

### 主题

::: demo 
``` html
<template>
  <div>
    <bee-tooltip :content="'这是一段提示文字\ntheme is dark.'" style='margin-right: 20px;'>
      <span class='span'>dark</span>
    </bee-tooltip>

    <bee-tooltip :content="'这是一段提示文字\ntheme is light.'" :position='position' theme='light'>
      <span class='span'>light</span>
    </bee-tooltip>
  </div>
</template>

```
:::


### 属性值

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|content|提示的文字信息,可使用\n换行|String|—|—|1.0.0及之后支持|
|position|位置|String|见上面|top|*|
|theme|主题|String|dark,light|dark|1.0.0|

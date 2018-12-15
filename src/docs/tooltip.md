<style>
.inline .bee-tool-tip--wp {
  margin: 0 10px 10px 0;
  border: 1px solid #cccccc;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>

## tooltip 文字提示

### 基本用法

::: demo 
``` html
<template>
  <div class='inline'>
    <bee-tool-tip content='这是一段提示文字' position='top-start'>
      <span class='span'>top start</span>
    </bee-tool-tip>

    <bee-tool-tip content='这是一段提示文字' position='top'>
      <span class='span'>top</span>
    </bee-tool-tip>

    <bee-tool-tip content='这是一段提示文字' position='top-end'>
      <span class='span'>top end</span>
    </bee-tool-tip>
  </div>

  <div class='inline'>
    <bee-tool-tip content='这是一段提示文字' position='bottom-start'>
      <span class='span'>bottom start</span>
    </bee-tool-tip>

    <bee-tool-tip content='这是一段提示文字' position='bottom'>
      <span class='span'>bottom</span>
    </bee-tool-tip>

    <bee-tool-tip content='这是一段提示文字' position='bottom-end'>
      <span class='span'>bottom end</span>
    </bee-tool-tip>
  </div>

  <div class='inline'>
    <bee-tool-tip content='这是一段提示文字' position='left-start'>
      <span class='span'>left-start</span>
    </bee-tool-tip>

    <bee-tool-tip content='这是一段提示文字' position='right-start'>
      <span class='span'>right-start</span>
    </bee-tool-tip>
  </div>

  <div class='inline'>
    <bee-tool-tip content='这是一段提示文字' position='left'>
      <span class='span'>left</span>
    </bee-tool-tip>

    <bee-tool-tip content='这是一段提示文字' position='right'>
      <span class='span'>right</span>
    </bee-tool-tip>
  </div>

  <div class='inline'>
    <bee-tool-tip content='这是一段提示文字' position='left-end'>
      <span class='span'>left-end</span>
    </bee-tool-tip>

    <bee-tool-tip content='这是一段提示文字' position='right-end'>
      <span class='span'>right-end</span>
    </bee-tool-tip>
  </div>
</template>

```
:::

### 属性值

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|content|提示的文字信息|string|—|-|
|position|位置类型|string|—|top|
|scrollDom|跟随滚动的DOM节点|HTML DOM|-|document|

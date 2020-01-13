<style>
.icon--item {
  display: inline-block;
  font-size: 22px;
  width: 85px;
  text-align: center;
  line-height: 32px;
  height: 90px;
  vertical-align: text-bottom;
}

.icon--item .icon--name {
  font-size: 14px;
  display: block;
  line-height: 20px;
  height: 40px;
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

## 图标

图标来源于 iconfont 。

:::demo

```html
<span class='icon--item'>
  <bee-icon icon="prev" @click='print'> </bee-icon>
  <span class='icon--name'>prev</span>
</span>

<span class='icon--item'>
  <bee-icon icon="next" @mouseenter='print'  @mouseleave='print'> </bee-icon>
  <span class='icon--name'>next</span>
</span>

<span class='icon--item'>
  <bee-icon icon="left"> </bee-icon>
  <span class='icon--name'>left</span>
</span>

<span class='icon--item'>
  <bee-icon icon="right"> </bee-icon>
  <span class='icon--name'>right</span>
</span>

<span class='icon--item'>
  <bee-icon icon="arr-left"> </bee-icon>
  <span class='icon--name'>arr-left</span>
</span>

<span class='icon--item'>
  <bee-icon icon="arr-right"> </bee-icon>
  <span class='icon--name'>arr-right</span>
</span>

<span class='icon--item'>
  <bee-icon icon="arr-down"> </bee-icon>
  <span class='icon--name'>arr-down</span>
</span>

<span class='icon--item'>
  <bee-icon icon="arr-up"> </bee-icon>
  <span class='icon--name'>arr-up</span>
</span>


<span class='icon--item'>
  <bee-icon icon="selected-part"> </bee-icon>
  <span class='icon--name'>selected-part</span>
</span>

<span class='icon--item'>
  <bee-icon icon="checkbox-unselected"> </bee-icon>
  <span class='icon--name'>checkbox-unselected</span>
</span>


<span class='icon--item'>
  <bee-icon icon="checkbox-selected"> </bee-icon>
  <span class='icon--name'>checkbox-selected</span>
</span>


<span class='icon--item'>
  <bee-icon icon="radio-unselected"> </bee-icon>
  <span class='icon--name'>radio-unselected</span>
</span>

<span class='icon--item'>
  <bee-icon icon="radio-selected"> </bee-icon>
  <span class='icon--name'>radio-selected</span>
</span>

<span class='icon--item'>
  <bee-icon icon="error"> </bee-icon>
  <span class='icon--name'>error</span>
</span>

<span class='icon--item'>
  <bee-icon icon="success"> </bee-icon>
  <span class='icon--name'>success</span>
</span>

<span class='icon--item'>
  <bee-icon icon="info"> </bee-icon>
  <span class='icon--name'>info</span>
</span>

<span class='icon--item'>
  <bee-icon icon="date"> </bee-icon>
  <span class='icon--name'>date</span>
</span>

<span class='icon--item'>
  <bee-icon icon="eye-show"> </bee-icon>
  <span class='icon--name'>eye-show</span>
</span>

<span class='icon--item'>
  <bee-icon icon="eye-close"> </bee-icon>
  <span class='icon--name'>eye-close</span>
</span>

<span class='icon--item'>
  <bee-icon icon="close"> </bee-icon>
  <span class='icon--name'>close</span>
</span>

<span class='icon--item'>
  <bee-icon icon="correct"> </bee-icon>
  <span class='icon--name'>correct</span>
</span>

<span class='icon--item'>
  <bee-icon icon="add"> </bee-icon>
  <span class='icon--name'>add</span>
</span>

<span class='icon--item'>
  <bee-icon icon="edit"> </bee-icon>
  <span class='icon--name'>edit</span>
</span>

<span class='icon--item'>
  <bee-icon icon="search"> </bee-icon>
  <span class='icon--name'>search</span>
</span>

<span class='icon--item'>
  <bee-icon icon="setting"> </bee-icon>
  <span class='icon--name'>setting</span>
</span>

<span class='icon--item'>
  <bee-icon icon="delete"> </bee-icon>
  <span class='icon--name'>delete</span>
</span>

<span class='icon--item'>
  <bee-icon icon="bell"> </bee-icon>
  <span class='icon--name'>bell</span>
</span>

<span class='icon--item'>
  <bee-icon icon="image"> </bee-icon>
  <span class='icon--name'>image</span>
</span>

<span class='icon--item'>
  <bee-icon icon="mobile"> </bee-icon>
  <span class='icon--name'>mobile</span>
</span>

<span class='icon--item'>
  <bee-icon icon="password"> </bee-icon>
  <span class='icon--name'>password</span>
</span>

<span class='icon--item'>
  <bee-icon icon="exit"> </bee-icon>
  <span class='icon--name'>exit</span>
</span>

<span class='icon--item'>
  <bee-icon icon="fill-help"> </bee-icon>
  <span class='icon--name'>fill-help</span>
</span>

<span class='icon--item'>
  <bee-icon icon="line-help"> </bee-icon>
  <span class='icon--name'>line-help</span>
</span>

```

:::


### 属性值

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|fontFamily|字体集|String|—|—|0.6.2|
|icon|要显示的图标|String|—|—|*|

<br/>
<br/>

### 事件
1.0.0+没有说明的其它事件, 则通过 $listeners 传入到根元素中。

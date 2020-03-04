<script>
export default {
  data () {
    return {
      friuts: [{
        label: '苹果',
        value: '001',
        children: [{
          label: "京觅",
          value: "001001"
        }, {
          label: "洛川苹果",
          value: "001002"
        }, {
          label: "农夫山泉",
          value: "001003"
        }, {
          label: "壹农壹果",
          value: "001004"
        }, {
          label: "绿满农（LVFULLO）",
          value: "001005"
        }, {
          label: "文果",
          value: "001006"
        }, {
          label: "西域美农",
          value: "001007"
        }, {
          label: "康乐欣",
          value: "001008"
        }, {
          label: "鲜次方",
          value: "001009"
        }, {
          label: "游鲜生",
          value: "001010"
        }, {
          label: "联承",
          value: "001011"
        }, {
          label: "山丘二十里",
          value: "001012",
          children: []
        }, {
          label: "果然馋（guoranchan）",
          value: "001013"
        }]
      }, {
        label: "橙子",
        value: "002",
        children: [{
          label: "农夫山泉",
          value: "002001"
        }, {
          label: "京觅",
          value: "002002"
        }, {
          label: "新奇士（Sunkist）",
          value: "002003"
        }, {
          label: "壹农壹果",
          value: "002004"
        }, {
          label: "黔阳（QIANYANG）",
          value: "002005"
        }, {
          label: "伦晚（lunwan）",
          value: "002006"
        }, {
          label: "康乐欣",
          value: "002007"
        }, {
          label: "常枫",
          value: "002008"
        }, {
          label: "绿鲜森（lvxiansen）",
          value: "002009"
        }, {
          label: "爽果乐",
          value: "002010"
        }, {
          label: "食九月",
          value: "002011"
        }]
      }],
      cities: [{
        label: "北京",
        value: "001",
        children: [{
          label: "东城区",
          value: "001001"
        }, {
          label: "西城区",
          value: "001002"
        }, {
          label: "朝阳区",
          value: "001003",
          disabled: true
        }, {
          label: "海淀区",
          value: "001004"
        }, {
          label: "丰台区",
          value: "001005"
        }]
      }, {
        label: "上海",
        value: "002",
        disabled: true
      }],
      cascader1: null,
      cascader2: ["002", "002007"],
      cascader3: null,
      cascader4: null,
      cascader5: null,
      cascader6: null
    }
  },
  methods: {
    labelFormat (value) {
      if (value.length === 0) {
        return "没有任何初始值"
      } else {
        return /^002/.test(value[0]) ? `橙子--${value[1]}`: ""
      }
    }
  }
}
</script>

## 级联选择 (1.4.0)

### 基本用法

:::demo
```html
<div>
  <bee-cascader
    style="float: right;"
    :data="friuts"
    placeholder="请选择"
    v-model='cascader1'
  ></bee-cascader>
  <p>当前选择：{{cascader1}}</p>
</div>
<script>
  export default {
  data () {
    return {
      friuts: [{
        label: '苹果',
        value: '001',
        children: [{
          label: "京觅",
          value: "001001"
        }, {
          label: "洛川苹果",
          value: "001002"
        }, {
          label: "农夫山泉",
          value: "001003"
        }, {
          label: "壹农壹果",
          value: "001004"
        }, {
          label: "绿满农（LVFULLO）",
          value: "001005"
        }, {
          label: "文果",
          value: "001006"
        }, {
          label: "西域美农",
          value: "001007"
        }, {
          label: "康乐欣",
          value: "001008"
        }, {
          label: "鲜次方",
          value: "001009"
        }, {
          label: "游鲜生",
          value: "001010"
        }, {
          label: "联承",
          value: "001011"
        }, {
          label: "山丘二十里",
          value: "001012"
        }, {
          label: "果然馋（guoranchan）",
          value: "001013"
        }]
      }, {
        label: "橙子",
        value: "002",
        children: [{
          label: "农夫山泉",
          value: "002001"
        }, {
          label: "京觅",
          value: "002002"
        }, {
          label: "新奇士（Sunkist）",
          value: "002003"
        }, {
          label: "壹农壹果",
          value: "002004"
        }, {
          label: "黔阳（QIANYANG）",
          value: "002005"
        }, {
          label: "伦晚（lunwan）",
          value: "002006"
        }, {
          label: "康乐欣",
          value: "002007"
        }, {
          label: "常枫",
          value: "002008"
        }, {
          label: "绿鲜森（lvxiansen）",
          value: "002009"
        }, {
          label: "爽果乐",
          value: "002010"
        }, {
          label: "食九月",
          value: "002011"
        }]
      }],
      cascader1: null
    }
  }
}
</script>
```
:::

### 默认值

:::demo
```html
<div>
  <bee-cascader
    :data="friuts"
    placeholder="请选择"
    v-model='cascader2'
  ></bee-cascader>
  <p>当前选择：{{cascader2}}</p>
</div>
<script>
  export default {
  data () {
    return {
      cascader2: ["002", "002007"]
    }
  }
}
</script>
```
:::

### 选择即变

:::demo
```html
<div>
  <bee-cascader
    :data="friuts"
    type="every"
    placeholder="请选择"
    v-model='cascader3'
  ></bee-cascader>
  <p>当前选择：{{cascader3}}</p>
</div>
<script>
  export default {
  data () {
    return {
      cascader3: null
    }
  }
}
</script>
```
:::

### 自定义显示

:::demo
```html
<div>
  <bee-cascader
    :data="friuts"
    :label-format="labelFormat"
    placeholder="请选择"
    v-model='cascader4'
  ></bee-cascader>
  <p>当前选择：{{cascader4}}</p>
</div>
<script>
  export default {
  data () {
    return {
      cascader4: null
    }
  },
  methods: {
    labelFormat (value) {
      if (value.length === 0) {
        return "没有任何初始值"
      } else {
        return /^002/.test(value[0]) ? `橙子--${value[1]}`: ""
      }
    }
  }
}
</script>
```
:::

### 禁用

:::demo
```html
<div>
  <bee-cascader
    :data="friuts"
    :disabled='true'
    placeholder="请选择"
    v-model='cascader5'
  ></bee-cascader>
  <p>当前选择：{{cascader5}}</p>
  <bee-cascader
    :data="cities"
    placeholder="请选择"
    v-model='cascader6'
  ></bee-cascader>
  <p>当前选择：{{cascader6}}</p>
</div>
<script>
  export default {
  data () {
    return {
      cities: [{
        label: "北京",
        value: "001",
        children: [{
          label: "东城区",
          value: "001001"
        }, {
          label: "西城区",
          value: "001002"
        }, {
          label: "朝阳区",
          value: "001003",
          disabled: true
        }, {
          label: "海淀区",
          value: "001004"
        }, {
          label: "丰台区",
          value: "001005"
        }]
      }, {
        label: "上海",
        value: "002",
        disabled: true
      }],
      cascader5: null,
      cascader6: null
    }
  }
}
</script>
```
:::


### 属性值

| 参数 | 说明 |	类型 |	可选值 |	默认值 | 版本支持|
|---|---|---|---|---|---|
|data|数据源|Array|—|—|1.4.0|
|optionKey|每一个选项要是显示的字段和取值的字段|Object|—|—|1.4.0|
|placeholder|占位符|String|—|—|1.4.0|
|disabled|是否是禁用|Boolean|—|false|1.4.0|
|joinText|选项间的连接符|String|—|—|1.4.0|
|type|类型标识|String|last,every|last|1.4.0|
|labelFormat|设置自定义显示|Function|—|—|1.4.0|
|value|已选择的值，可使用 v-model 双向绑定数据。|Array|—|—|1.4.0|

<br/>
<br/>

### 事件

|事件|说明|版本支持|
|---|---|---|
|change|选项改变后的事件|1.4.0|
|beforeOpen|选项打开之前的事件|1.4.0|
|closed|选项关闭之后的事件|1.4.0|

<br/>
<br/>
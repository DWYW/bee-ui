<script>
export default {
  data () {
    return {
      grades: JSON.parse('[{"name":"一年级","id":1, "children":[{"name":"1班","id":101},{"name":"2班","id":102,"disabled":true,"children":[{"name":"实验班","id":10201},{"name":"普通班","id":10202}]},{"name":"3班","id":103}]},{"name":"二年级","id":2, "children":[{"name":"1班","id":201, "selected": true},{"name":"2班","id":202}]},{"name":"三年级","id":3, "fold": false, "children":[{"name":"1班","id":301},{"name":"2班","id":302},{"name":"3班","id":303}]}]'),

      navs: JSON.parse('[{"label":"手机","value":"0","icon":"mobile","children":[{"label":"华为","value":"0-0"},{"label":"苹果","value":"0-1"}]},{"label":"电脑","value":"1","icon":"bell","children":[{"label":"华为","actived": true,"value":"1-0"},{"label":"苹果","value":"1-1"},{"label":"小米","value":"1-2"},{"label":"联想","value":"1-3"}]}]'),

      nav: '',

      asyncData: [{
        name: 'child0'
      }, {
        name: 'child1'
      }],
      asnycLoading: false
    }
  },
  methods: {
    onFold (status) {
      console.log('onfold', status)
    },
    onChecked (detail) {
      console.log('onchecked', detail)
    },
    onNavItemSelected (scope) {
      this.nav = scope.data.value
    },
    foldNavChildren (scope) {
      scope.vm.$set(scope.vm.node, 'fold', !scope.vm.childrenIsFold)
      console.log(scope.vm.node.fold)
    },
    asyncGetData (detail) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([{
            name: 'children' + detail.paths.concat([0]).join('-'),
            id: 1
          }, {
            name: 'children' + detail.paths.concat([1]).join('-'),
            id: 2
          }])
        }, 1000)
      })
    },
    asyncGetChecked (detail) {
      this.asnycLoading = true
      return new Promise((resolve) => {
        setTimeout(() => {
          this.asnycLoading = false
          resolve(detail.value)
        }, 500)
      })
    }
  }
}
</script>

## tree 树形组件 (1.6.0)

### 基本用法

::: demo
``` html
<template>
  <div>
    <bee-tree :tree="grades" @fold="onFold" @checked="onChecked"></bee-tree>
  </div>
</template>
<script>
export default {
  data () {
    return {
      grades: grades: JSON.parse('[{"name":"一年级","id":1, "children":[{"name":"1班","id":101},{"name":"2班","id":102,"disabled":true,"children":[{"name":"实验班","id":10201},{"name":"普通班","id":10202}]},{"name":"3班","id":103}]},{"name":"二年级","id":2, "children":[{"name":"1班","id":201, "selected": true},{"name":"2班","id":202}]},{"name":"三年级","id":3, "fold": false, "children":[{"name":"1班","id":301},{"name":"2班","id":302},{"name":"3班","id":303}]}]')
    }
  },
  methods: {
    onFold (status) {
      console.log('onfold', status)
    },
    onChecked (detail) {
      console.log('onchecked', detail)
    }
  }
}
</script>
```
:::

### 自定义

::: demo
``` html
<template>
  <div>
    <bee-tree class="navs-tree" :tree="navs" :fold-icon="{fold: 'unfold', unfold: 'fold'}" :fold-default="false">
      <template v-slot:default="scope">
        <div class="node-content" :class="{actived: nav.indexOf(scope.data.value) === 0}" @click="onNavItemSelected(scope)">
          <bee-icon class="node-icon"
            v-if="scope.data.children"
            :icon="scope.vm.foldIcon"
            @click.stop="foldNavChildren(scope)"
          ></bee-icon>
          <bee-icon class="node-icon" :icon='scope.data.icon'></bee-icon>
          <span>{{scope.data.label}} {{scope.data.value}}</span>
        </div>
      </template>
    </bee-tree>
  </div>
</template>
<script>
export default {
  data () {
    return {
      navs: JSON.parse('[{"label":"手机","value":"0","icon":"mobile","children":[{"label":"华为","value":"0-0"},{"label":"苹果","value":"0-1"}]},{"label":"电脑","value":"1","icon":"bell","children":[{"label":"华为","actived": true,"value":"1-0"},{"label":"苹果","value":"1-1"},{"label":"小米","value":"1-2"},{"label":"联想","value":"1-3"}]}]'),
      nav: ''
    }
  },
  methods: {
    onNavItemSelected (scope) {
      this.nav = scope.data.value
    },
    foldNavChildren (scope) {
      scope.vm.$set(scope.vm.node, 'fold', !scope.vm.childrenIsFold)
      console.log(scope.vm.node.fold)
    }
  }
}
</script>

<style>
.navs-tree .tree-node .node-icon {
  padding: 0 5px;
}

.navs-tree>.tree-node>.node-content {
  font-weight: bold;
  font-size: 16px;
}

.navs-tree .tree-node .node-content {
  cursor: pointer;
}

.navs-tree .node-tree >.tree-node {
  padding: 5px 0;
}

.navs-tree .tree-node .node-content.actived {
  color: #ff6701;
}
</style>
```
:::

### 异步加载

::: demo
``` html
<template>
  <div v-loading="asnycLoading">
    <bee-tree :tree="asyncData" :load-children="asyncGetData" :load-checked="asyncGetChecked"></bee-tree>
  </div>
</template>
<script>
export default {
  data () {
    return {
      asyncData: [{
        name: 'child0'
      }, {
        name: 'child1'
      }]
    }
  },
  methods: {
    asyncGetData (detail) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([{
            name: 'children' + detail.paths.concat([0]).join('-'),
            id: 1
          }, {
            name: 'children' + detail.paths.concat([1]).join('-'),
            id: 2
          }])
        }, 1000)
      })
    }
  }
}
</script>
```
:::


### 属性值

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|data|生成tree的数据|Array|—|—|1.6.0|
|primaryAttr|循环时主键取值的属性|String|—|id|1.6.0|
|nameAttr|节点内容取值的属性|String|—|name|1.6.0|
|foldIcon|节点的展开折叠对应的图标配置信息|Object|—|{<br/>fold: 'arr-right',<br/>unfold: 'arr-down'<br/>}|1.6.0|
|foldAttr|节点子项折叠取值的属性|String|—|fold|1.6.0|
|foldDisabled|节点子项是否禁用折叠，如果禁用则默认为展开|Boolean|—|false|1.6.0|
|foldDefault|对未设置折叠状态的节点，设置的默认值|Boolean|—|true|1.6.0|
|selectedAttr|节点选中状态取值的属性|String|—|selected|1.6.0|
|disabledAttr|节点禁用状态取值的属性|String|—|disabled|1.6.0|
|unrelated|节点之间是否是非关联的|Boolean|—|false|1.6.0|
|loadChildren|异步读取子节点的方法|Function=>Promise|—|—|1.6.0|

```
// foldIcon配置信息

{
  fold: BeeIcon.Props,
  unfold: BeeIcon.Props
}
```


### 事件
|事件|说明|版本支持|
|---|---|---|
|checked|子项被选后的事件回调|1.6.0|
|fold|子项折叠后的事件回调|1.6.0|


事件返回值
```ts
interfase CallbackDetail {
  value: any
  paths: array
  node: Object
  vm: Vue.Component
}
```




<script> 
export default {
  data () {
    return {
      grades: [{
        name: '一年级',
        value: 1,
        children: [{
          name: '1班',
          value: 101
        }, {
          name: '2班',
          value: 102,
          children: [{
            name: '实验班',
            value: 10201
          }, {
            name: '普通班',
            value: 10202
          }]
        }, {
          name: '3班',
          value: 103
        }]
      }, {
        name: '二年级',
        value: 2,
        children: [{
          name: '1班',
          value: 201
        }, {
          name: '2班',
          value: 202
        }]
      }, {
        name: '三年级',
        value: 3,
        children: [{
          name: '1班',
          value: 301
        }, {
          name: '2班',
          value: 302
        }, {
          name: '3班',
          value: 303
        }]
      }],

      navs: [{
        name: '手机',
        key: '0',
        icon: 'mobile',
        children: [{
          name: '华为',
          key: '0-0'
        }, {
          name: '苹果',
          key: '0-1'
        }]
      }, {
        name: '电脑',
        key: '1',
        icon: 'bell',
        children: [{
          name: '华为',
          key: '1-0',
        }, {
          name: '苹果',
          key: '1-1'
        }, {
          name: '小米',
          key: '1-2',
        }, {
          name: '联想',
          key: '1-3'
        }]
      }],
      nav: '0',
      asyncData: [{
        name: 'child1'
      }, {
        name: 'child2'
      }]
    }
  },
  methods: {
    changeNav (data) {
      this.nav = data.key
    },

    isActived (data) {
      const reg = new RegExp(`^${data.key}`)
      return reg.test(this.nav)
    },

    onChecked () {
      console.log('arguments', ...arguments)
      console.log('all Selcted', this.$refs.grades.getSelectedNode())
      console.log('all add half Selcted', this.$refs.grades.getSelectedNode(true))
    },

    defaultUnfold (key) {
      return /^\d+$/.test(key)
    },

    nodeDisabled (key) {
      return /^0-0$/.test(key)
    },

    asyncGetData (key, data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const matches = key.match(/\w+/g)
          
          if (matches.length < 3) {
            resolve([{
              name: 'children-1'
            }, {
              name: 'children-2'
            }])
          } else {
            if (Math.random() > 0.5) {
              resolve()
            } else {
              this.$_createMessage({
                type: 'error',
                message: '强制返回reject'
              }).show()
              reject()
            }
          }
        }, 1000)
      })
    }
  }
}
</script>

## tree 树形组件 (1.4.0)

### 基本用法

::: demo 
``` html
<template>
  <div>
    <bee-tree ref='grades'
      :data='grades' 
      :defaultUnfold='defaultUnfold'
      :nodeDisabled='nodeDisabled'
      fold-line='dashed'
      @checked='onChecked'
    ></bee-tree>
  </div>
</template>
<script> 
export default {
  data () {
    return {
      grades: [{
        name: '一年级',
        value: 1,
        children: [{
          name: '1班',
          value: 101
        }, {
          name: '2班',
          value: 102,
          children: [{
            name: '实验班',
            value: 10201
          }, {
            name: '普通班',
            value: 10202
          }]
        }, {
          name: '3班',
          value: 103
        }]
      }, {
        name: '二年级',
        value: 2,
        children: [{
          name: '1班',
          value: 201
        }, {
          name: '2班',
          value: 202
        }]
      }, {
        name: '三年级',
        value: 3,
        children: [{
          name: '1班',
          value: 301
        }, {
          name: '2班',
          value: 302
        }, {
          name: '3班',
          value: 303
        }]
      }]
    }
  },
  methods: {
    onChecked () {
      console.log('arguments', ...arguments)
      console.log('all Selcted', this.$refs.grades.getSelectedNode())
      console.log('all add half Selcted', this.$refs.grades.getSelectedNode(true))
    },

    defaultUnfold (key) {
      return /^\d+$/.test(key)
    },

    nodeDisabled (key) {
      return /^0-0$/.test(key)
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
    <bee-tree class='navs-tree'
      :data='navs'
      :fold-disabled='true'
    >
      <div :class="[{
        'actived': isActived(scope.data)
      }]" slot-scope='scope'
        @click='changeNav(scope.data)'
      >
        <bee-icon class="node-icon" :icon='scope.data.icon'></bee-icon>
        <span>{{scope.data.name}} {{scope.key}}</span>
      </div>
    </bee-tree>
  </div>
</template>
<script> 
export default {
  data () {
    return {
      navs: [{
        name: '手机',
        key: '0',
        icon: 'mobile',
        children: [{
          name: '华为',
          key: '0-0'
        }, {
          name: '苹果',
          key: '0-1'
        }]
      }, {
        name: '电脑',
        key: '1',
        icon: 'bell',
        children: [{
          name: '华为',
          key: '1-0',
        }, {
          name: '苹果',
          key: '1-1'
        }, {
          name: '小米',
          key: '1-2',
        }, {
          name: '联想',
          key: '1-3'
        }]
      }],
      nav: '0'
    }
  },
  methods: {
    changeNav (data) {
      this.nav = data.key
    },

    isActived (data) {
      const reg = new RegExp(`^${data.key}`)
      return reg.test(this.nav)
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

.navs-tree .tree-node .node-content .actived {
  color: #ff6701;
}
</style>
```
:::

### 异步加载

::: demo 
``` html
<template>
  <div>
    <bee-tree
      :data='asyncData'
      :load-data='asyncGetData'
    ></bee-tree>
  </div>
</template>
<script> 
export default {
  data () {
    return {
      asyncData: [{
        name: 'child1'
      }, {
        name: 'child2'
      }]
    }
  },
  methods: {
    asyncGetData (key, data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const matches = key.match(/\w+/g)
          
          if (matches.length < 3) {
            resolve([{
              name: 'children-1'
            }, {
              name: 'children-2'
            }])
          } else {
            if (Math.random() > 0.5) {
              resolve()
            } else {
              this.$_createMessage({
                type: 'error',
                message: '强制返回reject'
              }).show()
              reject()
            }
          }
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
|data|生成tree的数据|Array|—|—|1.4.0|
|nameKey|标题名称|String|—|name|1.4.0|
|selectedKey|节点是否被选中|String|—|selected|1.4.0|
|halfSelectedKey|节点是否被部分选中|String|—|halfSelected|1.4.0|
|foldIcon|节点的展开折叠对应的图标信息|Object|—|{fontFamily: undefined,icons: ['arr-down', 'arr-right']}|1.4.0|
|foldDisabled|节点的是否禁用可折叠|Boolean|—|false|1.4.0|
|foldLine|是否显示连接线|String|solid,dashed|—|1.4.0|
|defaultUnfoldAll|是否展开全部节点|Boolean|—|false|1.4.0|
|defaultUnfold|节点的默认折叠状态|Function=>Boolean|—|—|1.4.0|
|nodeDisabled|节点的禁用状态|Function=>Boolean|—|—|1.4.0|
|loadData|异步加载|Function=>Promise|—|—|1.4.0|


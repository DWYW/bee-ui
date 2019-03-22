<style lang='less'>

.primary {
  color: #ff6701;
  cursor: pointer;

  &:not(:last-child)::after {
    content: '|';
    color: #888888;
    padding-left: 5px;
  }
}

.bee-table--wp {
  margin-bottom: 20px;
}

.table-header-icon {
  font-size: 16px !important;
  margin-left: 4px;
}
</style>
<script>
export default {
  data () {
    return {
      actived: null,
      data: [{
        name: '张三',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '李四',
        age: 20,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '王五',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '小丽',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '女'
      }, {
        name: '小红',
        age: 21,
        grade: '一年级',
        subject: '临床医院',
        sex: '女'
      }, {
        name: '小明',
        age: 22,
        grade: '二年级',
        subject: '临床医院',
        sex: '男'
      }]
    }
  },
  methods: {
    view (data, index) {
      console.log(data, index)
      this.actived = index
    },
    delete (row, index) {
      console.log(row, index)
      this.actived = index
    },
    selectionChange (rows) {
      console.log(rows)
    },
    clearAllSelected () {
      this.$refs.selectionTable.clearSelections()
    },
    setSelected () {
      for (let i in arguments) {
        if (this.data[i]) {
          this.$refs.selectionTable.someToggle(this.data[i])
        }
      }
    }
  }
}
</script>
## table 表格

### 基本用法

::: demo
``` html
<template>
  <bee-table :data='data'>
    <bee-table-column width='100' label='姓名' prop='name' >
    </bee-table-column>
    <bee-table-column width='100' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='100' label='年级' prop='grades' placeholder='-'></bee-table-column>
    <bee-table-column width='100' label='专业' prop='subject'></bee-table-column>
    <bee-table-column width='160' label='操作'>
      <template slot-scope='scope'>
        <span class='primary' @click='view(scope.row, scope.$index)'>查看</span>
        <span class='primary' @click='delete(scope.row, scope.$index)'>删除</span>
      </template>
    </bee-table-column>
  </bee-table>
</template>
<script>
export default {
  data () {
    return {
      actived: null,
      data: [{
        name: '张三',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '李四',
        age: 20,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '王五',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '小丽',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '女'
      }, {
        name: '小红',
        age: 21,
        grade: '一年级',
        subject: '临床医院',
        sex: '女'
      }, {
        name: '小明',
        age: 22,
        grade: '二年级',
        subject: '临床医院',
        sex: '男'
      }]
    }
  },
  methods: {
    view (data, index) {
      console.log(data, index)
      this.actived = index
    },
    delete (row, index) {
      console.log(row, index)
      this.actived = index
    }
  }
}
</script>
```
:::


### 浮动表头

::: demo
``` html
<template>
  <bee-table :data='data' :height='200'>
    <bee-table-column width='100' label='姓名' prop='name'></bee-table-column>
    <bee-table-column width='100' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='100' label='年级' prop='grade'></bee-table-column>
    <bee-table-column width='100' label='专业' prop='subject'></bee-table-column>
    <bee-table-column width='160' label='操作'>
      <template slot-scope='scope'>
        <span class='primary'>查看</span>
        <span class='primary'>删除</span>
      </template>
    </bee-table-column>
  </bee-table>
</template>
<script>
export default {
  data () {
    return {
      actived: null,
      data: [{
        name: '张三',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '李四',
        age: 20,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '王五',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '小丽',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '女'
      }, {
        name: '小红',
        age: 21,
        grade: '一年级',
        subject: '临床医院',
        sex: '女'
      }, {
        name: '小明',
        age: 22,
        grade: '二年级',
        subject: '临床医院',
        sex: '男'
      }]
    }
  },
  methods: {
    view (data, index) {
      console.log(data, index)
      this.actived = index
    },
    delete (row, index) {
      console.log(row, index)
      this.actived = index
    }
  }
}
</script>
```
:::


### 浮动列

::: demo
``` html
<template>
  <bee-table :data='data'>
    <bee-table-column width='160' label='姓名' prop='name'></bee-table-column>
    <bee-table-column width='160' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='160' label='年级' prop='grade'></bee-table-column>
    <bee-table-column width='160' label='专业' prop='subject'></bee-table-column>
    <bee-table-column fixed='right' width='260' label='操作'>
      <template slot-scope='scope'>
        <span class='primary'>查看</span>
        <span class='primary'>删除</span>
      </template>
    </bee-table-column>
  </bee-table>
</template>
<script>
export default {
  data () {
    return {
      actived: null,
      data: [{
        name: '张三',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '李四',
        age: 20,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '王五',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '小丽',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '女'
      }, {
        name: '小红',
        age: 21,
        grade: '一年级',
        subject: '临床医院',
        sex: '女'
      }, {
        name: '小明',
        age: 22,
        grade: '二年级',
        subject: '临床医院',
        sex: '男'
      }]
    }
  },
  methods: {
    view (data, index) {
      console.log(data, index)
      this.actived = index
    },
    delete (row, index) {
      console.log(row, index)
      this.actived = index
    }
  }
}
</script>
```
:::


### 浮动表头和列

::: demo
``` html
<template>
  <bee-table :data='data' :height='200' @selectionChange='selectionChange' :active-index='actived'>
    <bee-table-column width='160' label='姓名' prop='name'></bee-table-column>
    <bee-table-column width='160' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='160' label='年级' prop='grade'></bee-table-column>
    <bee-table-column width='160' label='专业' prop='subject'></bee-table-column>
    <bee-table-column fixed='right' width='260' label='操作'>
      <template slot-scope='scope'>
        <span class='primary'  @click='view(scope.row, scope.$index)'>查看</span>
        <span class='primary'>删除</span>
      </template>
    </bee-table-column>
  </bee-table>
</template>
<script>
export default {
  data () {
    return {
      actived: null,
      data: [{
        name: '张三',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '李四',
        age: 20,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '王五',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '小丽',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '女'
      }, {
        name: '小红',
        age: 21,
        grade: '一年级',
        subject: '临床医院',
        sex: '女'
      }, {
        name: '小明',
        age: 22,
        grade: '二年级',
        subject: '临床医院',
        sex: '男'
      }]
    }
  },
  methods: {
    view (data, index) {
      console.log(data, index)
      this.actived = index
    },
    delete (row, index) {
      console.log(row, index)
      this.actived = index
    }
  }
}
</script>
```
:::



### 多选

::: demo
``` html
<template>
  <bee-table :data='data' :height='200' @selectionChange='selectionChange' ref='selectionTable'>
    <bee-table-column width='40' type='selection'></bee-table-column>
    <bee-table-column width='160' label='姓名' prop='name'></bee-table-column>
    <bee-table-column width='160' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='160' label='年级' prop='grade'></bee-table-column>
    <bee-table-column width='160' label='专业' prop='subject'></bee-table-column>
    <bee-table-column fixed='right' width='260' label='操作'>
      <template slot-scope='scope'>
        <span class='primary'  @click='view(scope.row, scope.$index)'>查看</span>
        <span class='primary'>删除</span>
      </template>
    </bee-table-column>
  </bee-table>

  <bee-button @click='clearAllSelected'>清空选择</bee-button>
  <bee-button @click='setSelected(0, 1)'>设置第1, 2个选中状态</bee-button>
</template>
<script>
export default {
  data () {
    return {
      actived: null,
      data: [{
        name: '张三',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '李四',
        age: 20,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '王五',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '小丽',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '女'
      }, {
        name: '小红',
        age: 21,
        grade: '一年级',
        subject: '临床医院',
        sex: '女'
      }, {
        name: '小明',
        age: 22,
        grade: '二年级',
        subject: '临床医院',
        sex: '男'
      }]
    }
  },
  methods: {
    view (data, index) {
      console.log(data, index)
      this.actived = index
    },
    delete (row, index) {
      console.log(row, index)
      this.actived = index
    },
    selectionChange (rows) {
      console.log(rows)
    },
    clearAllSelected () {
      this.$refs.selectionTable.clearSelections()
    },
    setSelected () {
      for (let i in arguments) {
        if (this.data[i]) {
          this.$refs.selectionTable.someToggle(this.data[i])
        }
      }
    }
  }
}
</script>
```
:::

### 自定义表头

::: demo
``` html
<template>
  <bee-table :data='data' :height='200'>
    <bee-table-column width='40'>
      <template slot='header' slot-scope='scope'>#</template>
      <template slot-scope='scope'>
        {{(scope.$index + 1) * 2}}
      </template>
    </bee-table-column>
    <bee-table-column width='160' label='姓名' prop='name'>
      <template slot='header' slot-scope='scope'>
        <bee-icon class='table-header-icon' icon='info'></bee-icon>
      </template>
    </bee-table-column>
    <bee-table-column width='160' prop='age'>
      <template slot='header' slot-scope='scope'>age</template>
    </bee-table-column>
    <bee-table-column width='160' label='年级' prop='grade'></bee-table-column>
    <bee-table-column width='160' label='专业' prop='subject'></bee-table-column>
    <bee-table-column fixed='right' width='260' label='操作'>
      <template slot-scope='scope'>
        <span class='primary'  @click='view(scope.row, scope.$index)'>查看</span>
        <span class='primary'>删除</span>
      </template>
    </bee-table-column>
  </bee-table>
</template>
<script>
export default {
  data () {
    return {
      actived: null,
      data: [{
        name: '张三',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '李四',
        age: 20,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '王五',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '男'
      }, {
        name: '小丽',
        age: 23,
        grade: '三年级',
        subject: '临床医院',
        sex: '女'
      }, {
        name: '小红',
        age: 21,
        grade: '一年级',
        subject: '临床医院',
        sex: '女'
      }, {
        name: '小明',
        age: 22,
        grade: '二年级',
        subject: '临床医院',
        sex: '男'
      }]
    }
  },
  methods: {
    view (data, index) {
      console.log(data, index)
      this.actived = index
    },
    delete (row, index) {
      console.log(row, index)
      this.actived = index
    }
  }
}
</script>
```
:::

### 空表格

::: demo
``` html
<template>
  <bee-table :data='[]' :height='200' >
    <bee-table-column width='160' label='姓名' prop='name'></bee-table-column>
    <bee-table-column width='160' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='160' label='年级' prop='grade'></bee-table-column>
    <bee-table-column width='160' label='专业' prop='subject'></bee-table-column>
    <bee-table-column fixed='right' width='260' label='操作'>
      <template slot-scope='scope'>
        <span class='primary'>查看</span>
        <span class='primary'>删除</span>
      </template>
    </bee-table-column>
  </bee-table>
</template>
```
:::


#### BeeTable

### 属性值

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|data|表格数据|array|—|-|
|height|表格的高度|number|—|-|
|maxHeight|表格的最大高度|number|—|-|
|placeholderc|占位符|string|—|-|
|activeIndex|激活项|number|—|-|
|resetScroll|重置滚动行为|boolean|—|true|
|scrollDom.sync|滚动的 HTML DOM| dom|—|-|

### 事件

|方法|说明
|---|---|
|selectionChange|选线变化|

<br/>
<br/>

#### BeeTableColumn

### 属性值

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|type|类型|string|general,selection|general|
|width|列宽|number|—|50|
|fixed|浮动类型|string|left,right|-|
|prop|列的取值字段|string|—|-|
|label|列标题|string|—|-|
|align|对齐方式|string|left,center,right|center|
|placeholderc|占位符|string|—|-|

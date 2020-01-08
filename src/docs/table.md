<style lang='less'>
.primary {
  cursor: pointer;
  
  &:not(:last-child)::after {
    content: '|';
    padding: 0 5px;
  }
}

.bee-button {
  margin-right: 20px;
}

td.red, th.red {
  background-color: red !important;;
  color: #ffffff !important;;
}

.custom-tr-odd td {
  color: #ff6701 !important;
  background-color: #fce9d3 !important;
}

td.cell-name, th.cell-name {
  color: #ff6701 !important;
  background-color: #fce9d3 !important;
}

</style>
<script>
export default {
  data () {
    return {
      students: [
        { name: '张三', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '李四',  age: 20,  grade: '三年级',  subject: '临床医学',  sex: '男' }, 
        { name: '王五', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '小丽', age: 23, grade: '三年级', subject: '临床医学', sex: '女' }, 
        { name: '小红', age: 21, grade: '一年级', subject: '临床医学', sex: '女' }, 
        { name: '小明', age: 0,  grade: '二年级',  subject: '临床医学',  sex: '男' }
      ],
      scores: [
        { name: '张三',  chinese: 10, math: 80,  english: 90 }, 
        { name: '李四', chinese: 86, math: 70,  english: 92 }, 
        { name: '王五', chinese: 96, math: 90,  english: 80 }, 
        { name: '小丽', chinese: 83, math: 89,  english: 92 }, 
        { name: '小红', chinese: 79, math: 99,  english: 100 }, 
        { name: '小明', chinese: 88, math: 80,  english: 95}
      ],
      selections: []
    }
  },
  computed: {
    rowClassName () {
      return (row, index) => {
        return index % 2 ? 'custom-tr-odd' : ''
      }
    }
  },
  methods: {
    alert (data, index) {
      this.$_createAlert({
        message: `当前为第${index + 1}个，\n数据为：${JSON.stringify(data)}`
      }).show()
    },
    
    selectionChange (rows) {
      console.log(rows)
    },

    clearAllSelected () {
      this.$refs.multipleSelection.onSelection({
        type: 'all',
        value: true
      })
    },
    setSelected () {
      for (let i in arguments) {
        if (this.students[i]) {
          this.$refs.multipleSelection.onSelection({
            type: 'item',
            value: this.students[i]
          })
        }
      }
    },
    cellClassName(data) {
      return data.columnIndex % 2 === 0 && data.rowIndex % 2 === 0 ? 'red' : ''
    }
  }
}
</script>

## table 表格

### 基本用法

::: demo
``` html
<template>
  <bee-table :data='students'>
    <bee-table-column label='姓名' prop='name'></bee-table-column>
    <bee-table-column width='100' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='100' label='年级' prop='grade' placeholder='-'></bee-table-column>
    <bee-table-column width='100' label='专业' prop='subject'></bee-table-column>
  </bee-table>
</template>
<script>
export default {
  data () {
    return {
      students: [
        { name: '张三', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '李四',  age: 20,  grade: '三年级',  subject: '临床医学',  sex: '男' }, 
        { name: '王五', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '小丽', age: 23, grade: '三年级', subject: '临床医学', sex: '女' }, 
        { name: '小红', age: 21, grade: '一年级', subject: '临床医学', sex: '女' }, 
        { name: '小明', age: 0,  grade: '二年级',  subject: '临床医学',  sex: '男' }
      ]
    }
  }
}
</script>
```
:::

### 自定义表格和表头

::: demo
``` html
<template>
  <bee-table :data='students'>
    <bee-table-column label='姓名' prop='name'>
      <template v-slot:header>
        <bee-icon icon='eye-show'></bee-icon>
      </template>
    </bee-table-column>
    <bee-table-column width='100' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='100' label='年级' prop='grade' placeholder='-'></bee-table-column>
    <bee-table-column width='100' label='专业' prop='subject'></bee-table-column>
    <bee-table-column width='160'>
      <template v-slot:header='scope'>
        <bee-icon icon='edit'></bee-icon>
      </template>
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
      students: [
        { name: '张三', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '李四',  age: 20,  grade: '三年级',  subject: '临床医学',  sex: '男' }, 
        { name: '王五', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '小丽', age: 23, grade: '三年级', subject: '临床医学', sex: '女' }, 
        { name: '小红', age: 21, grade: '一年级', subject: '临床医学', sex: '女' }, 
        { name: '小明', age: 0,  grade: '二年级',  subject: '临床医学',  sex: '男' }
      ]
    }
  }
}
</script>
```
:::

### 自定义列的样式

::: demo
``` html
<template>
  <bee-table :data='students'>
    <bee-table-column label='姓名' prop='name' class='cell-name'></bee-table-column>
    <bee-table-column width='100' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='100' label='年级' prop='grade' placeholder='-'></bee-table-column>
    <bee-table-column width='100' label='专业' prop='subject'></bee-table-column>
  </bee-table>
</template>
<script>
export default {
  data () {
    return {
      students: [
        { name: '张三', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '李四',  age: 20,  grade: '三年级',  subject: '临床医学',  sex: '男' }, 
        { name: '王五', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '小丽', age: 23, grade: '三年级', subject: '临床医学', sex: '女' }, 
        { name: '小红', age: 21, grade: '一年级', subject: '临床医学', sex: '女' }, 
        { name: '小明', age: 0,  grade: '二年级',  subject: '临床医学',  sex: '男' }
      ]
    }
  }
}
</script>
<style lang='less'>
  td.cell-name, th.cell-name {
    color: #ff6701 !important;
    background-color: #fce9d3 !important;
  }
</style>
```
:::

### 自定义行的样式

::: demo
``` html
<template>
  <bee-table :data='students' :row-class-name='rowClassName'>
    <bee-table-column label='姓名' prop='name'></bee-table-column>
    <bee-table-column width='100' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='100' label='年级' prop='grade' placeholder='-'></bee-table-column>
    <bee-table-column width='100' label='专业' prop='subject'></bee-table-column>
  </bee-table>
</template>
<script>
export default {
  data () {
    return {
      students: [
        { name: '张三', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '李四',  age: 20,  grade: '三年级',  subject: '临床医学',  sex: '男' }, 
        { name: '王五', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '小丽', age: 23, grade: '三年级', subject: '临床医学', sex: '女' }, 
        { name: '小红', age: 21, grade: '一年级', subject: '临床医学', sex: '女' }, 
        { name: '小明', age: 0,  grade: '二年级',  subject: '临床医学',  sex: '男' }
      ]
    }
  },
  computed: {
    rowClassName () {
      return (row, index) => {
        return index % 2 ? 'custom-tr-odd' : ''
      }
    }
  }
}
</script>

<style lang='less'>
  td.cell-name, th.cell-name {
    color: #ff6701 !important;
    background-color: #fce9d3 !important;
  }
</style>
```
:::

### 浮动表头

::: demo
``` html
<template>
  <div style='height: 200px;'> 
    <bee-table :data='students'>
      <bee-table-column width='100' label='姓名' prop='name'></bee-table-column>
      <bee-table-column width='100' label='年龄' prop='age'></bee-table-column>
      <bee-table-column width='100' label='年级' prop='grade'></bee-table-column>
      <bee-table-column width='100' label='专业' prop='subject'></bee-table-column>
      <bee-table-column width='160' label='操作'>
        <template slot-scope='scope'>
          <span class='primary' @click='alert(scope.row, scope.$index)'>查看</span>
        </template>
      </bee-table-column>
    </bee-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      students: [
        { name: '张三', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '李四',  age: 20,  grade: '三年级',  subject: '临床医学',  sex: '男' }, 
        { name: '王五', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '小丽', age: 23, grade: '三年级', subject: '临床医学', sex: '女' }, 
        { name: '小红', age: 21, grade: '一年级', subject: '临床医学', sex: '女' }, 
        { name: '小明', age: 0,  grade: '二年级',  subject: '临床医学',  sex: '男' }
      ]
    }
  },
  methods: {
    alert (data, index) {
      this.$_createAlert({
        message: `当前为第${index + 1}个，\n数据为：${JSON.stringify(data)}`
      }).show()
    }
  }
}
</script>
```
:::


### 显示统计

::: demo
``` html
<template>
  <bee-table :data='scores' :summary='true'>
    <bee-table-column width='160' label='姓名' prop='name'></bee-table-column>
    <bee-table-column width='100' label='语文' prop='chinese'></bee-table-column>
    <bee-table-column width='100' label='数学' prop='math'></bee-table-column>
    <bee-table-column width='100' label='英语' prop='english'></bee-table-column>
    <bee-table-column width='100' label='总分' placeholder='/'>
      <template v-slot:default='scope'>
        {{scope.row.chinese + scope.row.math + scope.row.english}}
      </template>
    </bee-table-column>
  </bee-table>
</template>

<script>
export default {
  data () {
    return {
      scores: [
        { name: '张三',  chinese: 10, math: 80,  english: 90 }, 
        { name: '李四', chinese: 86, math: 70,  english: 92 }, 
        { name: '王五', chinese: 96, math: 90,  english: 80 }, 
        { name: '小丽', chinese: 83, math: 89,  english: 92 }, 
        { name: '小红', chinese: 79, math: 99,  english: 100 }, 
        { name: '小明', chinese: 88, math: 80,  english: 95}
      ]
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
  <bee-table :data='[]'>
    <bee-table-column width='100' label='姓名' prop='name'></bee-table-column>
    <bee-table-column width='100' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='100' label='年级' prop='grade'></bee-table-column>
    <bee-table-column width='100' label='专业' prop='subject'></bee-table-column>
    <bee-table-column fixed='right' width='160' label='操作'>
      <template slot-scope='scope'>
        <span class='primary'>查看</span>
        <span class='primary'>删除</span>
      </template>
    </bee-table-column>
  </bee-table>
</template>
```
:::

### 浮动列

::: demo
``` html
<template>
  <bee-table :data='students'>
    <bee-table-column width='160' label='姓名' prop='name'></bee-table-column>
    <bee-table-column width='160' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='160' label='年级' prop='grade'></bee-table-column>
    <bee-table-column width='160' label='专业' prop='subject'></bee-table-column>
    <bee-table-column fixed='right' width='260' label='操作'>
      <template slot-scope='scope'>
        <span class='primary' @click='alert(scope.row, scope.$index)'>查看</span>
      </template>
    </bee-table-column>
  </bee-table>
</template>
<script>
export default {
  data () {
    return {
      students: [
        { name: '张三', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '李四',  age: 20,  grade: '三年级',  subject: '临床医学',  sex: '男' }, 
        { name: '王五', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '小丽', age: 23, grade: '三年级', subject: '临床医学', sex: '女' }, 
        { name: '小红', age: 21, grade: '一年级', subject: '临床医学', sex: '女' }, 
        { name: '小明', age: 0,  grade: '二年级',  subject: '临床医学',  sex: '男' }
      ]
    }
  },
  methods: {
    alert (data, index) {
      this.$_createAlert({
        message: `当前为第${index + 1}个，\n数据为：${JSON.stringify(data)}`
      }).show()
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
  <bee-table style='height: 200px;' :data='students'>
    <bee-table-column width='160' label='姓名' prop='name'></bee-table-column>
    <bee-table-column width='160' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='160' label='年级' prop='grade'></bee-table-column>
    <bee-table-column width='160' label='专业' prop='subject'></bee-table-column>
    <bee-table-column fixed='right' width='260' label='操作'>
      <template slot-scope='scope'>
        <span class='primary'  @click='alert(scope.row, scope.$index)'>查看</span>
      </template>
    </bee-table-column>
  </bee-table>
</template>
<script>
export default {
  data () {
    return {
      students: [
        { name: '张三', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '李四',  age: 20,  grade: '三年级',  subject: '临床医学',  sex: '男' }, 
        { name: '王五', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '小丽', age: 23, grade: '三年级', subject: '临床医学', sex: '女' }, 
        { name: '小红', age: 21, grade: '一年级', subject: '临床医学', sex: '女' }, 
        { name: '小明', age: 0,  grade: '二年级',  subject: '临床医学',  sex: '男' }
      ]
    }
  },
  methods: {
    alert (data, index) {
      this.$_createAlert({
        message: `当前为第${index + 1}个，\n数据为：${JSON.stringify(data)}`
      }).show()
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
  <bee-table :data='students' @selection='selectionChange' ref='multipleSelection'>
    <bee-table-column width='40' fixed='left' type='selection'></bee-table-column>
    <bee-table-column width='160' label='姓名' prop='name'></bee-table-column>
    <bee-table-column width='160' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='160' label='年级' prop='grade'></bee-table-column>
    <bee-table-column width='160' label='专业' prop='subject'></bee-table-column>
    <bee-table-column fixed='right' width='160' label='操作'>
      <template slot-scope='scope'>
        <span class='primary'  @click='alert(scope.row, scope.$index)'>查看</span>
      </template>
    </bee-table-column>
  </bee-table>

  <br/>

  <bee-button @click='clearAllSelected'>清空选择</bee-button>
  <bee-button @click='setSelected(0, 1)'>设置第1, 2个选中状态</bee-button>
</template>

<script>
export default {
  data () {
    return {
      students: [
        { name: '张三', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '李四',  age: 20,  grade: '三年级',  subject: '临床医学',  sex: '男' }, 
        { name: '王五', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '小丽', age: 23, grade: '三年级', subject: '临床医学', sex: '女' }, 
        { name: '小红', age: 21, grade: '一年级', subject: '临床医学', sex: '女' }, 
        { name: '小明', age: 0,  grade: '二年级',  subject: '临床医学',  sex: '男' }
      ]
    }
  },
  methods: {
    alert (data, index) {
      this.$_createAlert({
        message: `当前为第${index + 1}个，\n数据为：${JSON.stringify(data)}`
      }).show()
    },
    
    selectionChange (rows) {
      console.log(rows)
    },

    clearAllSelected () {
      this.$refs.multipleSelection.onSelection({
        type: 'all',
        value: true
      })
    },
    setSelected () {
      for (let i in arguments) {
        if (this.students[i]) {
          this.$refs.multipleSelection.onSelection({
            type: 'item',
            value: this.students[i]
          })
        }
      }
    }
  }
}
</script>
```
:::

### 自定义className

::: demo
``` html
<template>
  <bee-table :data='students' :cell-class-name='cellClassName'>
    <bee-table-column label='姓名' prop='name'></bee-table-column>
    <bee-table-column width='100' label='年龄' prop='age'></bee-table-column>
    <bee-table-column width='100' label='年级' prop='grade' placeholder='-'></bee-table-column>
    <bee-table-column width='100' label='专业' prop='subject'></bee-table-column>
  </bee-table>
</template>
<script>
export default {
  data () {
    return {
      students: [
        { name: '张三', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '李四',  age: 20,  grade: '三年级',  subject: '临床医学',  sex: '男' }, 
        { name: '王五', age: 23, grade: '三年级', subject: '临床医学', sex: '男' }, 
        { name: '小丽', age: 23, grade: '三年级', subject: '临床医学', sex: '女' }, 
        { name: '小红', age: 21, grade: '一年级', subject: '临床医学', sex: '女' }, 
        { name: '小明', age: 0,  grade: '二年级',  subject: '临床医学',  sex: '男' }
      ]
    }
  },
  methods: {
    /**
     * data.type 
     * data.rowIndex
     * data.columnIndex
     */
    cellClassName(data) {
      return data.columnIndex % 2 === 0 && data.rowIndex % 2 === 0 ? 'red' : ''
    }
  }
}
</script>
```
:::


#### BeeTable

### 属性值

|参数|说明|类型|可选值|默认值|版本支持|
|---|---|---|---|---|---|
|data|表格数据|Array|—|—|*|
|maxHeight|表格的最大高度|Number|—|—|*|
|placeholderc|占位符|String|—|—|*|
|resetScroll|重置滚动行为|Boolean|—|true|*|
|summary|是否显示合计|Boolean|—|false|*|
|summaryText|合计的默认文字| String|—|合计|*|
|summaryMethod|计算合计的方法|Function|—|见下方|*|
|rowClassName|自定义行className的方法|Function|—|—|1.0.0|
|cellClassName|自定义行className的方法|Function|—|—|1.1.0|

### 事件

|方法|说明|版本支持|
|---|---|---|
|selection|选项变化后的回调 <br/>1.0.0之前为 selectionChange|*|

<br/>
<br/>

#### BeeTableColumn

### 属性值

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|type|类型|String|general,selection|general|
|width|列宽|Number|—|50|
|fixed|浮动类型|String|left,right|-|
|prop|列的取值字段|String|—|-|
|label|列标题|String|—|-|
|align|对齐方式|String|left,center,right|center|
|placeholderc|占位符|String|—|-|


```js
// summaryMethod default

function (columns, data, text) {
  return columns.map((col, rowIdx) => {
    if (rowIdx === 0) {
      return text
    } else if (col.prop) {
      return data.reduce((acc, cur) => {
        const item = deepValue(col.prop, cur)
        Number(item) ? acc += Number(item) : null
        return acc
      }, 0)
    } else {
      return col.placeholder
    }
  })
}

```

## 初衷

主要是对这一段时间以来自己 Vue 的使用和理解做一个总结整理。此库借鉴了 element-ui, iview 等一些优秀的库的思想和实现方式。
最终实现的是符合自己业务的功能。


## npm 安装

推荐使用 npm 的方式进行开发， 因为 node 生态圈和 webpack 工具链提供了大量的资源。

``` bash
npm install bee-ui-vue --save
```

## 快速开始

### VUE CLI 3

直接使用 vue cli 快速搭建 vue 开发环境。

``` bash
vue create [app name]

cd [app name]
```

### 全局使用

``` js
// mian.js
import BeeUI from 'bee-ui-vue'

Vue.use(BeeUI)
```

### 按需引入

``` js
// mian.js
import {BeeInput[, ...]} from 'bee-ui-vue'

Vue.use(BeeInput)
```
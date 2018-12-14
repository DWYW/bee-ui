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
import BeeUI from 'bee-ui'

Vue.use(BeeUI)
```

### 按需引入

``` js
// mian.js
import {BeeInput[, ...]} from 'bee-ui'

Vue.use(BeeInput)
```

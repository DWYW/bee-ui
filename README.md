## 在线文档

[v0.8.1](https://dwyw.github.io/0.8.1/index.html)

[latest](https://dwyw.github.io/bee-ui/index.html)

[bee-ui-audio-vue](https://dwyw.github.io/bee-ui-audio/index.html)


## npm 安装


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
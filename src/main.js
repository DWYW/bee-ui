import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import Bee from '../lib'
import DemoBlock from './components/DemoBlock.vue'

Vue.config.productionTip = false

Vue.component('DemoBlock', DemoBlock)
Vue.use(Bee)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

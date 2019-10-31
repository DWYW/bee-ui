import Vue from 'vue'
import BeeUI from '../lib'
import App from './App.vue'
import DemoBlock from './components/DemoBlock.vue'
import router from './router/index.js'

Vue.config.productionTip = false

Vue.component('DemoBlock', DemoBlock)
Vue.use(BeeUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

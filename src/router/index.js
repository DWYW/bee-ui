import Vue from 'vue'
import Router from 'vue-router'
import ComponentsConfig from './components'
Vue.use(Router)

const getRoutes = function (config) {
  const routes = []

  config.forEach((group) => {
    group.children.forEach((item) => {
      if (/doc/.test(item.type)) {
        routes.push({
          path: item.path,
          component: () => import(`@/docs/${item.path}.md`)
        })
      }
    })
  })

  return routes
}

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  }, {
    path: '/components',
    name: 'components',
    component: () => import('@/views/Components.vue'),
    children: getRoutes(ComponentsConfig)
  }]
})

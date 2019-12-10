import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'scene',
      component: require('@/components/scene').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

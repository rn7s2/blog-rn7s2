import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import Axios from 'axios'
import HomeView from '@/views/HomeView'
import PageView from '@/views/PageView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: () => import('@/views/PostView')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

let routesLoaded = false
router.beforeEach(async (to, from, next) => {
  if (!routesLoaded) {
    routesLoaded = true
    await Axios.get('/api/pages/config').then(async response => {
      store.commit('setPages', response.data)
      await response.data.forEach(async element => {
        await router.addRoute({
          path: '/' + element.name,
          name: element.name,
          component: PageView
        })
      })
    })
    next({ ...to, replace: true })
  } else {
    next()
  }
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        icon: 'home',
        title: 'Home'
      },
      component: () => import(/* webpackChunkName: "home" */ '@/pages/home/Home')
    },
    {
      path: '/lista-gastos',
      name: 'lista-gastos',
      meta: {
        icon: 'list-ul',
        title: 'Lista Gastos'
      },
      component: () => import(/* webpackChunkName: "home" */ '@/pages/lista-gastos/ListaGastos')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Lista Gastos'
      },
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ '@/pages/login/Login')
    }
  ]
})

routes.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Expenses`

  if (!window.uid && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default routes

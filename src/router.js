import VueRouter from 'vue-router'
import routes from './routes'
import { store } from './store/store'

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresClientOrEmployee)) {
    if (!(store.getters.loggedInClient || store.getters.loggedInEmployee)) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresClient)) {
    if (!(store.getters.loggedInClient)) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresContractor)) {
    if (!(store.getters.loggedInContractor)) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!(store.getters.loggedInContractor || store.getters.loggedInClient)) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      if (store.getters.loggedInContractor || store.getters.loggedInClient) {
        next({
          name: 'admin',
        })
      } else {
        next({
          name: 'orders',
        })
      }
    } else {
      next()
    }
  }

  else {
    next() // make sure to always call next()!
  }
})

export default router
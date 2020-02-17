import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import App from './App.vue'
import Master from './components/layouts/Master'
// import Home from './components/pages/Home'
import {store} from './store/store'
import VueFlashMessage from 'vue-flash-message'

import { applyPolyfills, defineCustomElements } from 'obedovac-components/loader'
import 'bootstrap/dist/css/bootstrap-grid.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
require('vue-flash-message/dist/vue-flash-message.min.css');

// import $ from "jquery";

Vue.config.productionTip = false

// Tell Vue to ignore all components defined in the test-components
// package. The regex assumes all components names are prefixed
// 'obd'
Vue.config.ignoredElements = [/obd-\w*/];

// Bind the custom elements to the window object
applyPolyfills().then(() => {
  defineCustomElements(window);
});

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFlashMessage)

const router = new VueRouter({
  routes: routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.loggedIn) {
            next({
                name: 'login',
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({
                name: 'home',
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

new Vue({
  render: h => h(Master),
  router: router,
  store: store,
}).$mount('#app')
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import Master from './views/layouts/Master'
import { store } from './store/store'
import VueFlashMessage from 'vue-flash-message'
import Datepicker from 'vuejs-datepicker'
import vSelect from 'vue-select'

import { applyPolyfills, defineCustomElements } from 'obedovac-components/loader'
import 'bootstrap/dist/css/bootstrap-grid.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
require('vue-flash-message/dist/vue-flash-message.min.css')

Vue.config.productionTip = false

// Tell Vue to ignore all components defined in the test-components
// package. The regex assumes all components names are prefixed
// 'obd'
Vue.config.ignoredElements = [/obd-\w*/]

// Bind the custom elements to the window object
applyPolyfills().then(() => {
  defineCustomElements(window)
})

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFlashMessage)

Vue.component('datepicker', Datepicker)
Vue.component('v-select', vSelect)


Vue.mixin({
  methods: {
    notEmptyObject(object) {
      return Object.keys(object).length
    },
  }
})

new Vue({
  render: h => h(Master),
  router: router,
  store: store,
}).$mount('#app')
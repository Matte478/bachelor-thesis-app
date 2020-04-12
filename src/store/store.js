import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import auth from './modules/auth'
import orders from './modules/orders'
import employees from './modules/employees'
import typeOfEmployments from './modules/typeOfEmployments'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost/api'

export const store = new Vuex.Store({
  namespaced: true,
  modules: {
    auth,
    orders,
    employees,
    typeOfEmployments,
  },
  state: {
    meals: [],
  },

  getters: {
    getMeals(state) {
      return state.meals
    }
  },

  mutations: {
    fetchMeals(state, meals) {
      state.meals = meals
    }
  },

  actions: {
    fetchMeals(context) {
      axios.defaults.headers.common['Authorization'] = context.state.auth.tokenType + ' ' + context.state.auth.token

      return new Promise((resolve, reject) => {
        axios.get('/meals')
          .then(response => {
            context.commit('fetchMeals', response.data.data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
})
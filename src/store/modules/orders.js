import axios from 'axios'

export default {
  namespaced: true,
  state: {
    orders: []
  },

  getters: {
    getOrders(state) {
      return state.orders
    },
  },

  mutations: {
    fetchOrders(state, orders) {
      state.orders = orders
      // let currentWeek = time.getCurrentWeek()

      // currentWeek.forEach((day, index) => {
      //     let exists = false;
      //     state.orders.forEach((o) => {
      //         if (o.date == day) {
      //             exists = true;
      //         }
      //     })
      //     if(!exists) {
      //         state.orders.splice(index, 0, {
      //             'date': day,
      //             'meal_id': null
      //         });
      //     }
      // })
    }
  },

  actions: {
    fetchOrders(context, filter) {
      axios.defaults.headers.common['Authorization'] = context.rootState.auth.tokenType + ' ' + context.rootState.auth.token

      if (typeof filter == 'undefined')
        filter = ''

      return new Promise((resolve, reject) => {
        axios.get('/orders' + filter)

          .then(response => {
            context.commit('fetchOrders', response.data.data)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },

    fetchEmployeeOrders(context, filter) {
      axios.defaults.headers.common['Authorization'] = context.rootState.auth.tokenType + ' ' + context.rootState.auth.token

      if (typeof filter == 'undefined')
        filter = ''

      return new Promise((resolve, reject) => {
        axios.get('/orders/employee' + filter)

          .then(response => {
            context.commit('fetchOrders', response.data.data)
            resolve()
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },

    submitOrder(context, orders) {
      axios.defaults.headers.common['Authorization'] = context.rootState.auth.tokenType + ' ' + context.rootState.auth.token

      return new Promise((resolve, reject) => {
        axios.post('/orders', {
          orders: orders
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    }
  }
}
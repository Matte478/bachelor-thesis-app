import axios from 'axios'

export default {
  namespaced: true,
  state: {
    employees: []
  },

  getters: {
    getEmployees(state) {
      return state.employees
    },
  },

  mutations: {
    fetchEmployees(state, employees) {
      state.employees = employees
    }
  },

  actions: {
    fetchEmployees(context) {
      axios.defaults.headers.common['Authorization'] = context.rootState.auth.tokenType + ' ' + context.rootState.auth.token

      return new Promise((resolve, reject) => {
        axios.get('/employees')
          .then(response => {
            context.commit('fetchEmployees', response.data.data)
            resolve()
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },

    submitEmployee(context, employee) {
      axios.defaults.headers.common['Authorization'] = context.rootState.auth.tokenType + ' ' + context.rootState.auth.token

      return new Promise((resolve, reject) => {
        axios.post('/register-client-employee', employee)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },

    // deleteTypeOfEmployment(context, typeId) {
    //   axios.defaults.headers.common['Authorization'] = context.rootState.auth.tokenType + ' ' + context.rootState.auth.token

    //   return new Promise((resolve, reject) => {
    //     axios.delete('/type-of-employments/' + typeId)
    //       .then(response => {
    //         resolve(response)
    //       })
    //       .catch(error => {
    //         console.log(error)
    //         reject(error)
    //       })
    //   })
    // }
  }
}
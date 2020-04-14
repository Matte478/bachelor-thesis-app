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
    fetchEmployees(context, employeeId) {
      axios.defaults.headers.common['Authorization'] = context.rootState.auth.tokenType + ' ' + context.rootState.auth.token

      employeeId = typeof employeeId == 'undefined' ? '' : '/' + employeeId

      return new Promise((resolve, reject) => {
        axios.get('employees' + employeeId)
          .then(response => {
            context.commit('fetchEmployees', response.data.data)
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error.response.data.errors)
          })
      })
    },

    submitEmployee(context, employee) {
      axios.defaults.headers.common['Authorization'] = context.rootState.auth.tokenType + ' ' + context.rootState.auth.token

      return new Promise((resolve, reject) => {
        axios.post('/employees', employee)
          .then(response => {
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error.response.data.errors)
          })
      })
    },

    editEmployee(context, employee) {
      axios.defaults.headers.common['Authorization'] = context.rootState.auth.tokenType + ' ' + context.rootState.auth.token

      return new Promise((resolve, reject) => {
        axios.put('/employees/' + employee.id, employee)
          .then(response => {
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error.response.data.errors)
          })
      })
    },

    deleteEmployee(context, employeeId) {
      axios.defaults.headers.common['Authorization'] = context.rootState.auth.tokenType + ' ' + context.rootState.auth.token

      return new Promise((resolve, reject) => {
        axios.delete('/employees/' + employeeId)
          .then(response => {
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error.response.data.errors)
          })
      })
    },
  }
}
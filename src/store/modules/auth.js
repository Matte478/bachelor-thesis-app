import axios from 'axios'

export default {
  state: {
    token: localStorage.getItem('token') || null,
    tokenType: localStorage.getItem('token_type') || null,
    userRoles: localStorage.getItem('user_roles') || [],
  },

  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    userRoles(state) {
      return state.userRoles
    },
    loggedInClient(state) {
      return state.userRoles.includes('Client')
    },
    loggedInEmployee(state) {
      return state.userRoles.includes('Employee')
    },
    loggedInContractor(state) {
      return state.userRoles.includes('Contractor')
    },
  },

  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    retrieveTokenType(state, tokenType) {
      state.tokenType = tokenType
    },
    retrieveUserRoles(state, userRoles) {
      state.userRoles = userRoles
    },
    destroyToken(state) {
      state.token = null
    },
    destroyTokenType(state) {
      state.tokenType = null
    },
  },

  actions: {
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/login', credentials)
          .then(response => {
            const token = response.data.success.token
            const tokenType = response.data.success.token_type
            const userRoles = response.data.success.roles

            localStorage.setItem('token', token)
            context.commit('retrieveToken', token)

            localStorage.setItem('token_type', tokenType)
            context.commit('retrieveTokenType', tokenType)

            localStorage.setItem('user_roles', userRoles)
            context.commit('retrieveUserRoles', userRoles)

            resolve(response)
          })
          .catch(error => {
            reject(error.response.data.errors)
          })
      })
    },
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + ' ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              localStorage.removeItem('token')
              context.commit('destroyToken')
              localStorage.removeItem('token_type')
              context.commit('destroyTokenType')

              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('token')
              context.commit('destroyToken')
              localStorage.removeItem('token_type')
              context.commit('destroyTokenType')
              reject(error)
            })
        })
      }
    },
    registerContractor(context, form) {
      return new Promise((resolve, reject) => {
        axios.post('/registerContractor', form)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response.data.errors)
          })
      })
    },
    registerClient(context, form) {
      return new Promise((resolve, reject) => {
        axios.post('/registerClient', form)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error.response.data.errors)
          })
      })
    }
  }
}
import axios from 'axios'

export default {
  state: {
    token: localStorage.getItem('token') || null,
    tokenType: localStorage.getItem('token_type') || null,
    userType: localStorage.getItem('user_type') || null,
  },

  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    userType(state) {
      return state.userType
    },
  },

  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    retrieveTokenType(state, tokenType) {
      state.tokenType = tokenType
    },
    retrieveUserType(state, userType) {
      state.userType = userType
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
        axios.post('/login', {
          email: credentials.email,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.success.token
            const tokenType = response.data.success.token_type
            const userType = response.data.success.user.type

            localStorage.setItem('token', token)
            context.commit('retrieveToken', token)

            localStorage.setItem('token_type', tokenType)
            context.commit('retrieveTokenType', tokenType)

            localStorage.setItem('user_type', userType)
            context.commit('retrieveUserType', userType)

            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
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
    registerContractor(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/registerContractor', {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
          restaurant: data.restaurant,
          city: data.city,
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    registerClient(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/registerClient', {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
          company: data.company,
          city: data.city,
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
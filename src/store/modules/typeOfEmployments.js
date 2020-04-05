import axios from 'axios'

export default {
  namespaced: true,
  state: {
    typeOfEmployments: []
  },

  getters: {
    getTypeOfEmployments(state) {
      return state.typeOfEmployments
    },
  },

  mutations: {
    fetchTypeOfEmployments(state, typeOfEmployments) {
      state.typeOfEmployments = typeOfEmployments
    }
  },

  actions: {
    fetchTypeOfEmployments(context, typeId) {
      axios.defaults.headers.common['Authorization'] = context.rootState.auth.tokenType + ' ' + context.rootState.auth.token

      if (typeof typeId == 'undefined')
        typeId = ''

      return new Promise((resolve, reject) => {
        axios.get('/type-of-employments/' + typeId)
          .then(response => {
            context.commit('fetchTypeOfEmployments', response.data.data)
            resolve()
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },


    submitTypeOfEmployment(context, type) {
      axios.defaults.headers.common['Authorization'] = context.rootState.auth.tokenType + ' ' + context.rootState.auth.token

      return new Promise((resolve, reject) => {
        axios.post('/type-of-employments', {
          name: type.name,
          contribution: type.contribution
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },

    editTypeOfEmployment(context, type) {
      axios.defaults.headers.common['Authorization'] = context.rootState.auth.tokenType + ' ' + context.rootState.auth.token

      return new Promise((resolve, reject) => {
        axios.post('/type-of-employments/' + type.id, {
          name: type.name,
          contribution: type.contribution
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },

    deleteTypeOfEmployment(context, typeId) {
      axios.defaults.headers.common['Authorization'] = context.rootState.auth.tokenType + ' ' + context.rootState.auth.token

      return new Promise((resolve, reject) => {
        axios.delete('/type-of-employments/' + typeId)
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
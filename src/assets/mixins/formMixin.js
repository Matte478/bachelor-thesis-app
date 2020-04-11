export default {
  data() {
    return {
      errors: {},
    }
  },
  computed: {

  },
  methods: {
    removeError() {
      delete this.errors[event.target.name]
    },

    hasError(input) {
      return this.errors.hasOwnProperty(input)
    },
    
    firstError(input) {
      return this.errors[input][0]
    }
  }
}
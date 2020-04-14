<template>
  <section class="d-flex justify-content-center align-items-center section section--full">
    <div class="container">
      <div class="row">
        <div class="col">
          <obd-card
            card-title="Prihlásenie"
            card-subtitle="Prihlásenie do účtu"
            class="login"
          >
            <form
              class="form"
              action="#"
              @submit.prevent="login"
            >
              <div
                v-if="hasError('credentials')"
                class="error-message"
                v-cloak
              > {{ firstError('credentials') }} </div>
              <div class="form-group">
                <label for="email">E-Mail</label>
                <div class="input-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="input"
                    :class="{'error': hasError('email')}"
                    v-model="form.email"
                    @input="removeError"
                  >
                  <div
                    v-if="hasError('email')"
                    class="error-message"
                    v-cloak
                  > {{ firstError('email') }} </div>
                </div>
              </div>

              <div class="form-group">
                <label for="password">Heslo</label>
                <div class="input-group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="input"
                    :class="{'error': hasError('password')}"
                    v-model="form.password"
                    @input="removeError"
                  >
                  <div
                    v-if="hasError('password')"
                    class="error-message"
                    v-cloak
                  > {{ firstError('password') }} </div>
                </div>
              </div>

              <div class="form-group">
                <obd-button
                  type="submit"
                  block
                >Prihlásenie</obd-button>
              </div>
            </form>
          </obd-card>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import formMixin from '../../assets/mixins/formMixin'

export default {
  name: 'login',
  mixins: [formMixin],

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },

  computed: {
    page() {
      let page = 'admin'
      switch (this.$store.getters.userRoles[0]) {
        case 'Employee':
          page = 'orders'
          break
        case 'Client':
          page = 'client-contractor'
          break
        case 'Contractor':
          page = 'restaurant-dashboard'
          break
      }

      return page;
    },
  },

  methods: {
    login() {
      this.$store
        .dispatch('retrieveToken', this.form)
        .then(() => {
          this.$router.push({ name: this.page })
          this.flashSuccess('Boli ste úspešne prihlásený.', {
            timeout: 3000,
          })
        })
        .catch(errors => {
          this.errors = errors
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
}
</style>
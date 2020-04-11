<template>
  <section class="d-flex justify-content-center align-items-center section section--full">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col-sm-5">
          <obd-card
            card-title="Prihlásenie"
            card-subtitle="Prihlásenie do účtu"
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
  methods: {
    login() {
      this.$store
        .dispatch('retrieveToken', this.form)
        .then(() => {
          this.$router.push({ name: 'admin' })
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

<style lang="scss">

</style>
<template>
  <section class="d-flex justify-content-center align-items-center section section--full">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col-sm-10">
          <obd-card
            card-title="Registrácia spoločnosti"
            card-subtitle="Registrujte vašu spoločnosť"
          >
            <form
              class="form"
              action="#"
              @submit.prevent="registerClient"
            >
              <div class="row justify-content-around">
                <div class="col-sm-6">
                  <div class="form-group">
                    <p class="desc">Informácie o Vás</p>
                  </div>
                  <div class="form-group">
                    <label for="name">Meno a priezvisko</label>
                    <div class="input-group">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="input"
                        :class="{'error': hasError('name')}"
                        v-model="form.name"
                        @input="removeError"
                      >
                      <div
                        v-if="hasError('name')"
                        class="error-message"
                        v-cloak
                      > {{ firstError('name') }} </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="email">E-Mail</label>
                    <div class="input-group">
                      <input
                        type="text"
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
                    <label for="password">Potvrdenie hesla</label>
                    <div class="input-group">
                      <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        class="input"
                        :class="{'error': hasError('password')}"
                        v-model="form.password_confirmation"
                      >
                    </div>
                  </div>
                </div>

                <div class="col-sm-6">
                  <div class="form-group">
                    <p class="desc">Informácie o Vašej spoločnosti</p>
                  </div>
                  <div class="form-group">
                    <label for="name">Názov spoločnosti</label>
                    <div class="input-group">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        class="input"
                        :class="{'error': hasError('company')}"
                        v-model="form.company"
                        @input="removeError"
                      >
                      <div
                        v-if="hasError('company')"
                        class="error-message"
                        v-cloak
                      > {{ firstError('company') }} </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="name">Mesto</label>
                    <div class="input-group">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        class="input"
                        :class="{'error': hasError('city')}"
                        v-model="form.city"
                        @input="removeError"
                      >
                      <div
                        v-if="hasError('city')"
                        class="error-message"
                        v-cloak
                      > {{ firstError('city') }} </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <obd-button
                  type="submit"
                  block
                > Registrácia </obd-button>
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
  name: 'registerClient',
  mixins: [formMixin],
  
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        company: '',
        city: '',
      },
    }
  },
  methods: {
    registerClient() {
      this.$store
        .dispatch('registerClient', this.form)
        .then(() => {
          this.$router.push({ name: 'login' })
          this.flashSuccess(
            'Boli ste úspešne zaregistrovaný, môžete sa prihlásiť.',
            {
              timeout: 3000,
            },
          )
        })
        .catch(errors => {
          this.errors = errors
        })
    },
  },
}
</script>
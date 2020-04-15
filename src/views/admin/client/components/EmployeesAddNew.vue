<template>
  <obd-modal
    :active="active"
    @closed="closePopup"
    class="pop-up"
    modal-title="Pridať nového zamestnanca"
  >
    <form
      class="form"
      action="#"
      @submit.prevent="addEmployee"
    >
      <div class="form-group">
        <label for="meal">Meno a priezvisko</label>
        <div class="input-group">
          <input
            type="text"
            name="name"
            id="name"
            class="input"
            :class="{'error': hasError('name')}"
            v-model="newEmployee.name"
            @input="removeError"
          />
          <div
            v-if="hasError('name')"
            class="error-message"
          > {{ firstError('name') }} </div>
        </div>
      </div>
      <div class="form-group">
        <label for="meal">Email</label>
        <div class="input-group">
          <input
            type="text"
            name="email"
            id="email"
            class="input"
            :class="{'error': hasError('email')}"
            v-model="newEmployee.email"
            @input="removeError"
          />
          <div
            v-if="hasError('email')"
            class="error-message"
          > {{ firstError('email') }} </div>
        </div>
      </div>
      <div class="form-group">
        <label for="meal">Heslo</label>
        <div class="input-group">
          <input
            type="password"
            name="password"
            id="password"
            class="input"
            :class="{'error': hasError('password')}"
            v-model="newEmployee.password"
            @input="removeError"
          />
          <div
            v-if="hasError('password')"
            class="error-message"
          > {{ firstError('password') }} </div>
        </div>
      </div>
      <div class="form-group">
        <label for="meal">Potvrdenie hesla</label>
        <div class="input-group">
          <input
            type="password"
            name="password_confirmation"
            id="password-confirmation"
            class="input"
            :class="{'error': hasError('password')}"
            v-model="newEmployee.password_confirmation"
          />
        </div>
      </div>
      <div class="form-group">
        <label>Pracovný pomer</label>
        <div class="input-group">
          <v-select
            class="select"
            v-model="newEmployee['type-of-employment_id']"
            label="name"
            :reduce="type => type.id"
            :options="typeOfEmployments"
            placeholder="Pracovný pomer"
          />
        </div>
      </div>

      <div class="form-group">
        <obd-button
          type="submit"
          block
        >Pridať zamestnanca</obd-button>
      </div>
    </form>
  </obd-modal>
</template>

<script>
import formMixin from '../../../../assets/mixins/formMixin'

export default {
  name: 'EmployeesAddNew',
  props: ['active'],
  mixins: [formMixin],

  data() {
    return {
      newEmployee: {},
      typeOfEmployments: [],
    }
  },

  created() {
    this.loadTypeOfEmployments()
  },

  methods: {
    loadTypeOfEmployments() {
      this.$store
        .dispatch('typeOfEmployments/fetchTypeOfEmployments')
        .then(() => {
          this.typeOfEmployments = this.$store.getters[
            'typeOfEmployments/getTypeOfEmployments'
          ]
        })
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať druhy pracovných pomerov.',
          )
        })
    },

    addEmployee() {
      this.$store
        .dispatch('employees/submitEmployee', this.newEmployee)
        .then(response => {
          this.flashSuccess('Nový zamestnanec bol úspešne pridaný.', {
            timeout: 3000,
          })
          this.$emit('added-employee', response)
          this.newEmployee = {}
        })
        .catch(errors => {
          this.errors = errors
        })
    },

    closePopup() {
      this.$emit('closed')
    },
  },
}
</script>

<style lang="scss" scoped>
.select {
  height: 35px;
  width: 100%;
}
</style>
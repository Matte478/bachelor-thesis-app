<template>
  <obd-modal
    v-if="notEmptyObject(employee)"
    :active="active"
    @closed="closePopup"
    class="pop-up"
    modal-title="Upraviť existujúceho zamestnanca"
    max-width="500px"
  >
    <form
      class="form"
      action="#"
      @submit.prevent="editEmployee"
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
            v-model="employee.name"
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
            type="email"
            name="email"
            id="email"
            class="input"
            :class="{'error': hasError('email')}"
            v-model="employee.email"
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
            v-model="employee.password"
            @input="removeError"
          />
          <div
            v-if="hasError('password')"
            class="error-message"
            :class="{'error': hasError('password')}"
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
            v-model="employee.password_confirmation"
          />
        </div>
      </div>
      <div class="form-group">
        <label>Pracovný pomer</label>
        <div class="input-group">
          <v-select
            class="select"
            v-model="employee['type-of-employment_id']"
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
        > Upraviť zamestnanca </obd-button>
      </div>
    </form>
  </obd-modal>
</template>

<script>
import formMixin from '../../../../assets/mixins/formMixin'

export default {
  name: 'EmployeesEdit',
  props: ['active', 'employeeId'],
  mixins: [formMixin],

  data() {
    return {
      employee: {},
      typeOfEmployments: [],
    }
  },

  watch: {
    active() {
      if (!this.active) return
      this.loadEmployee()
    },
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
            {
              timeout: 3000,
            },
          )
        })
    },

    loadEmployee() {
      this.$store
        .dispatch('employees/fetchEmployees', this.employeeId)
        .then(() => {
          this.employee = this.$store.getters['employees/getEmployees']
        })
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať druhy pracovných pomerov.',
            {
              timeout: 3000,
            },
          )
        })
    },

    editEmployee() {
      this.$store
        .dispatch('employees/editEmployee', this.employee)
        .then(() => {
          this.flashSuccess('Zamestnanec bol úspešne upravený.', {
            timeout: 3000,
          })
          this.$emit('edited-employee')
        })
        .catch(errors => {
          this.errors = errors
        })
    },

    closePopup() {
      this.employee = {}
      this.errors = {}
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
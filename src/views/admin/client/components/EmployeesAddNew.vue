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
            v-model="newEmployee.name"
          />
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
            v-model="newEmployee.email"
          />
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
            v-model="newEmployee.password"
          />
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
        >Pridať pracovný pomer</obd-button>
      </div>
    </form>
  </obd-modal>
</template>

<script>
export default {
  props: ['active'],

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
        .then(() => {
          this.flashSuccess('Nový pracovný pomer bol úspešne pridaný.', {
            timeout: 3000,
          })
          this.$emit('added-employee')
        })
        .catch(e => {
          console.log('error v komponente', e)
          this.flashError(
            'Niečo sa pokazilo, nebolo možné pridať nový pracovný pomer.',
          )
          this.$emit('error')
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
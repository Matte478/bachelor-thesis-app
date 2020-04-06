<template>
  <section class="section">
    <obd-modal
      :active="newEmployeePopup"
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
              style="height: 35px; width: 100%"
              placeholder="Všetci klienti"
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

    <obd-card card-title="Zamestnanci">
      <div slot="controls">
        <obd-button @click="togglePopup">Pridať zamestnanca</obd-button>
      </div>
      <!-- {{ typeOfEmployments }} <br> -->

      <obd-table
        :data="JSON.stringify(employees)"
        :columns="JSON.stringify(columns)"
        :actions="JSON.stringify(tableActions)"
        @action="action"
      />

      <!-- {{ employees }} -->
    </obd-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      initialized: false,
      selected: '',
      selectedType: '',

      newEmployee: {},
      newEmployeePopup: false,

      employees: [],
      typeOfEmployments: [],
      columns: [
        {
          key: 'id',
          text: 'ID',
        },
        {
          key: 'name',
          text: 'Meno',
        },
        {
          key: 'email',
          text: 'Email',
        },
        {
          key: 'type-of-employment',
          text: 'Druh pracovného pomeru',
        },
      ],
      tableActions: [
        {
          text: '',
          action: 'edit',
          icon: 'fas fa-edit',
          color: '#2d4059',
        },
        {
          text: '',
          action: 'delete',
          icon: 'fas fa-trash-alt',
          color: '#ea5455',
        },
      ],
    }
  },

  created() {
    this.loadEmployees()
    this.loadTypeOfEmployments()
  },

  methods: {
    action(e) {
      switch (e.detail.action) {
        case 'edit':
          // this.openEditPopup(e.detail.id)
          console.log('edit', e.detail)
          break
        case 'delete':
          // this.deleteType(e.detail.id)
          console.log('delete', e.detail)
          break
      }
    },

    getProperty: function(name) {
      return this[name]
    },

    togglePopup() {
      this.newEmployeePopup = !this.newEmployeePopup
      document.body.classList.toggle('overlay')
    },
    closePopup() {
      this.newEmployeePopup = false
    },

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

    loadEmployees() {
      this.$store
        .dispatch('employees/fetchEmployees')
        .then(() => {
          this.employees = this.$store.getters['employees/getEmployees']
          this.formatEmployees()
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
          let type = this.typeOfEmployments.find(
            x => x.id === this.newEmployee['type-of-employment_id'],
          ).name
          this.newEmployee['type-of-employment'] = type
          this.employees.push(this.newEmployee)
          this.newEmployee = {}
          this.flashSuccess('Nový pracovný pomer bol úspešne pridaný.', {
            timeout: 3000,
          })
        })
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné pridať nový pracovný pomer.',
          )
        })

      this.togglePopup()
    },

    formatEmployees() {
      this.employees = this.employees.map(function(e) {
        e['id'] = e['user_id']
        delete e['user_id']
        return e
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.pop-up {
  max-width: 500px;
}
</style>
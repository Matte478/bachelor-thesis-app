<template>
  <section class="section">
    <employees-add-new
      :active="newEmployeePopup"
      @closed="closePopup"
      @added-employee="addedEmployee"
    />

    <employees-edit
      :active="editEmployeePopup"
      :employeeId="editableId"
      @closed="closeEditPopup"
      @edited-employee="editedEmployee"
      @error="closePopup"
    />

    <obd-card
      card-title="Zamestnanci"
      v-if="initialized"
    >
      <div slot="controls">
        <obd-button @click="togglePopup">Pridať zamestnanca</obd-button>
      </div>

      <employees-table
        :employees="employees"
        @edit="openEditPopup"
        @delete="deleteEmployee"
      />
    </obd-card>
  </section>
</template>

<script>
import EmployeesTable from './components/EmployeesTable'
import EmployeesAddNew from './components/EmployeesAddNew'
import EmployeesEdit from './components/EmployeesEdit'

export default {
  components: {
    EmployeesTable,
    EmployeesAddNew,
    EmployeesEdit,
  },

  data() {
    return {
      initialized: false,
      employees: [],

      newEmployeePopup: false,

      editEmployeePopup: false,
      editableId: '',
    }
  },

  created() {
    this.loadEmployees()
  },

  methods: {
    openEditPopup(id) {
      this.editableId = id
      this.editEmployeePopup = true
    },

    getProperty: function(name) {
      return this[name]
    },

    togglePopup() {
      this.newEmployeePopup = !this.newEmployeePopup
    },
    closePopup() {
      this.newEmployeePopup = false
    },
    closeEditPopup() {
      this.editEmployeePopup = false
    },

    addedEmployee(employee) {
      this.employees.push(employee)
      this.formatEmployees()
      this.closePopup()
    },

    editedEmployee() {
      this.loadEmployees()
      this.closeEditPopup()
    },

    deleteEmployee(id) {
      let response = confirm('Naozaj chcete vymazať daného zamestnanca?')
      if (response) {
        this.$store
          .dispatch('employees/deleteEmployee', id)
          .then(() => {
            let employees = this.employees.filter(employee => employee.id != id)
            this.employees = employees

            this.flashSuccess('Zamestnanec bol vymazaný.', {
              timeout: 3000,
            })
          })
          .catch(e => {
            this.flashError(
              'Niečo sa pokazilo, nebolo možné vymazať pracovný pomer.',
            )
          })
      }
    },

    loadEmployees() {
      this.$store
        .dispatch('employees/fetchEmployees')
        .then(() => {
          this.employees = this.$store.getters['employees/getEmployees']
          this.formatEmployees()
          this.initialized = true
        })
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať druhy pracovných pomerov.',
          )
        })
    },

    formatEmployees() {
      this.employees = this.employees.map(function(employee) {
        if (
          typeof employee['type-of-employment'] == 'undefined' ||
          !employee['type-of-employment']
        )
          employee['type-of-employment'] = '-'

        employee['id'] = employee['user_id']
        delete employee['user_id']

        return employee
      })
    },
  },
}
</script>
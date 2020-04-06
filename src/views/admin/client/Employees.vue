<template>
  <section class="section">
    <employees-add-new
      :active="newEmployeePopup"
      @closed="closePopup"
      @added-employee="addedEmployee"
      @error="closePopup"
    />

    <obd-card
      card-title="Zamestnanci"
      v-if="initialized"
    >
      <div slot="controls">
        <obd-button @click="togglePopup">Pridať zamestnanca</obd-button>
      </div>

      <obd-table
        :data="JSON.stringify(employees)"
        :columns="JSON.stringify(columns)"
        :actions="JSON.stringify(tableActions)"
        @action="action"
      />
    </obd-card>
  </section>
</template>

<script>
import EmployeesAddNew from './components/EmployeesAddNew'

export default {
  components: {
    EmployeesAddNew,
  },

  data() {
    return {
      initialized: false,
      newEmployeePopup: false,

      employees: [],
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
    },
    closePopup() {
      this.newEmployeePopup = false
    },

    addedEmployee() {
      this.loadEmployees()
      this.closePopup()
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
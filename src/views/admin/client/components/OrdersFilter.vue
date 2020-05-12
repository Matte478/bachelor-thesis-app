<template>
  <obd-modal
    class="pop-up pop-up--filter"
    :active="active"
    @closed="closeFilter"
    modal-title="Filter objednávok"
    max-width="500px"
  >
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="select">
            <v-select
              multiple
              v-model="selectedEmployees"
              :options="employees"
              style="height: 35px"
              placeholder="Všetci zamestnanci"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="calendar">
            <datepicker
              calendar-class="calendar__picker"
              input-class="calendar__input"
              format="dd.MM.yyyy"
              placeholder="Dátum od"
              :value="dateFrom"
              @input="dateFrom = fixDate($event)"
            />
          </div>
          <span class="delimer" />
          <div class="calendar">
            <datepicker
              calendar-class="calendar__picker"
              input-class="calendar__input"
              format="dd.MM.yyyy"
              placeholder="Dátum do"
              :value="dateTo"
              @input="dateTo = fixDate($event)"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          zobrazenie:
          <input
            type="radio"
            name="view"
            value="days"
            class="view-input"
            id="view-days"
            v-model="view"
          >
          <label
            for="view-days"
            class="view-label"
            :class="{ active: view == 'days' }"
          > denné </label>
          /
          <input
            type="radio"
            name="view"
            value="months"
            class="view-input"
            id="view-months"
            v-model="view"
          >
          <label
            for="view-months"
            class="view-label"
            :class="{ active: view == 'months' }"
          > mesačné </label>
        </div>
      </div>
    </div>
  </obd-modal>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  props: ['active'],

  data() {
    return {
      employees: [],

      filterPopup: false,
      dateFrom: '',
      dateTo: '',
      selectedEmployees: [],
      view: 'days',
    }
  },

  computed: {
    filter() {
      let selectedEmployees = ''
      if (this.selectedEmployees.length) {
        selectedEmployees = this.selectedEmployees.toString()
      }

      return `/${this.view}?filter[date_from]=${this.dateFrom}&filter[date_to]=${this.dateTo}&filter[employee]=${selectedEmployees}`
    },
    filterVariables() {
      return this.view, this.dateFrom, this.dateTo, this.selectedEmployees
    },
    dateFormat() {
      return this.view == 'months' ? 'MMMM YYYY' : 'DD.MM.YYYY'
    },
  },

  watch: {
    dateFrom() {
      this.$emit('changed-filter', this.filter, this.view)
    },
    filterVariables() {
      this.$emit('changed-filter', this.filter, this.view)
    },
  },

  created() {
    this.loadEmployees()
  },

  methods: {
    closeFilter() {
      this.$emit('closed')
    },

    loadEmployees() {
      this.$store
        .dispatch('employees/fetchEmployees')
        .then(response => {
          let employees = response
          employees.forEach(employee => {
            this.employees.push(employee.name)
          })
        })
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať zoznam zamestnancov.',
            {
              timeout: 3000,
            },
          )
        })
    },

    fixDate(event) {
      return moment(event).format('YYYY-MM-DD')
    },
  },
}
</script>
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
              v-model="selectedClients"
              :options="clients"
              style="height: 35px"
              label="Start Time"
              placeholder="Všetci klienti"
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
import timeMixin from '../../../../assets/mixins/timeMixin'

export default {
  props: ['active'],
  mixins: [timeMixin],

  data() {
    return {
      clients: [],

      filterPopup: false,
      dateFrom: '',
      dateTo: '',
      selectedClients: [],
      view: 'days',
    }
  },

  computed: {
    filter() {
      let selectedClients = ''
      if (this.selectedClients.length) {
        selectedClients = this.selectedClients.toString()
      }

      return `/${this.view}?filter[date_from]=${this.dateFrom}&filter[date_to]=${this.dateTo}&filter[company]=${selectedClients}`
    },
    filterVariables() {
      return this.view, this.dateFrom, this.dateTo, this.selectedClients
    },
    dateFormat() {
      return this.view == 'months' ? 'MMMM YYYY' : 'DD.MM.YYYY'
    },
  },

  watch: {
    filterVariables() {
      this.$emit('changed-filter', this.filter, this.view)
    },
  },

  created() {
    this.loadClients()
    this.dateFrom = this.getMonthStart()
    this.dateTo = this.getMonthEnd()
  },

  methods: {
    closeFilter() {
      this.$emit('closed')
    },

    loadClients() {
      axios.defaults.headers.common['Authorization'] =
        this.$store.state.auth.tokenType + ' ' + this.$store.state.auth.token
      axios
        .get('/agreements?filter[confirmed]=true')
        .then(response => {
          let agreements = response.data.data
          agreements.forEach(agreement => {
            this.clients.push(agreement.company.company)
          })
        })
        .catch(error => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať zoznam klientov.',
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
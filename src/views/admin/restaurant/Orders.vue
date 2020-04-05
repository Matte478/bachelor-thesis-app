<template>
  <section class="section">
    <obd-modal
      class="pop-up"
      :active="orderDetailPopup"
      @closed="closeDetail"
      modal-title="Detail objednávky"
      :modal-subtitle="modalSubtitle"
      v-if="orderDetail.meals"
    >
      <div slot="controls">
        <h3 class="pop-up__price">Cena objednávky: <span>{{ orderDetail.price }}€</span></h3>
      </div>

      <obd-table
        class="pop-up__table"
        :data="JSON.stringify(formatMealsForDetail(orderDetail.meals))"
        :columns="JSON.stringify(columnsDetail)"
      />
    </obd-modal>

    <obd-modal
      class="pop-up pop-up--filter"
      :active="filterPopup"
      @closed="closeFilter"
      modal-title="Filter objednávok"
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
              :class="{active: view == 'days'}"
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
              :class="{active: view == 'months'}"
            > mesačné </label>
          </div>
        </div>
      </div>
    </obd-modal>
    <obd-card
      card-title="Objednávky"
      v-if="initialized"
    >
      <div slot="controls">
        <obd-button @click="openFilter">Filter</obd-button>
      </div>

      <div>
        <div
          class="day-box"
          v-for="(order, date) in orders"
          :key="date"
        >
          <h2 class="day-box__date">{{formatDate(date, dateFormat)}}</h2>
          <obd-table
            class="day-box__table"
            :data="JSON.stringify(formatCompanyOrders(order, date))"
            :columns="JSON.stringify(columns)"
            :actions="JSON.stringify(tableActions)"
            @action="action"
          />
        </div>
      </div>
    </obd-card>
  </section>
</template>

<script>
import moment from 'moment'
import timeMixin from '../../../assets/mixins/timeMixin'
import axios from 'axios'

export default {
  mixins: [timeMixin],

  data() {
    return {
      filterPopup: false,
      dateFrom: '',
      dateTo: '',
      clients: [],
      selectedClients: [],
      view: 'days',
      initialized: false,

      orderDetail: [],
      orderDetailPopup: false,
      modalSubtitle: '',

      columns: [
        {
          key: 'company',
          text: 'Klient',
        },
        {
          key: 'price',
          text: 'Cena objednávky',
        },
      ],
      tableActions: [
        {
          text: 'Detail',
          action: 'detail',
          color: '#2d4059',
        },
      ],
      columnsDetail: [
        {
          key: 'meal',
          text: 'Jedlo',
        },
        {
          key: 'count',
          text: 'Množstvo',
        },
        {
          key: 'price',
          text: 'Cena za ks',
        },
      ],
    }
  },
  computed: {
    orders() {
      return this.$store.getters['orders/getOrders']
    },
    filter() {
      let selectedClients = ''
      if (this.selectedClients.length) {
        selectedClients = this.selectedClients.toString()
      }

      return (
        '/' +
        this.view +
        '?filter[date_from]=' +
        this.dateFrom +
        '&filter[date_to]=' +
        this.dateTo +
        '&filter[company]=' +
        selectedClients
      )
    },
    filterVariables() {
      return this.view, this.dateFrom, this.dateTo, this.selectedClients
    },
    dateFormat() {
      return this.view == 'months' ? 'MMMM YYYY' : 'DD.MM.YYYY'
    },
  },
  created() {
    this.$store
      .dispatch('orders/fetchOrders', this.filter)
      .then(() => {
        this.initialized = true
      })
      .catch(e => {
        this.flashError(
          'Niečo sa pokazilo, nebolo možné načítať objednávky.<br>Skúste obnoviť stránku.',
        )
      })

    this.loadClients()
  },
  watch: {
    filterVariables() {
      this.$store.dispatch('orders/fetchOrders', this.filter)
    },
  },
  methods: {
    openFilter() {
      this.filterPopup = true
    },
    closeFilter() {
      this.filterPopup = false
    },
    fixDate(event) {
      return moment(event).format('YYYY-MM-DD')
    },
    formatCompanyOrders(orders, date) {
      let parsedobj = JSON.parse(JSON.stringify(orders))
      let formated = []

      Object.keys(parsedobj).map(key => {
        formated.push({
          id: date + '#' + key,
          company: key,
          price: parsedobj[key].price + '€',
        })
      })

      return formated
    },
    formatMealsForDetail(meals) {
      let formated = []

      Object.keys(meals).map(key => {
        formated.push({
          id: meals[key].meal_id,
          meal: meals[key].meal,
          count: meals[key].count,
          price: meals[key].price + '€',
        })
      })

      return formated
    },
    openDetail(id) {
      let parsed = id.split('#')
      this.orderDetail = this.orders[parsed[0]][parsed[1]]
      this.modalSubtitle = this.formatDate(parsed[0]) + ' | ' + parsed[1]
      this.orderDetailPopup = true
    },
    closeDetail() {
      this.orderDetailPopup = false
    },
    action(e) {
      switch (e.detail.action) {
        case 'detail':
          this.openDetail(e.detail.id)
          break
      }
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
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss">
.section {
  padding-top: 20px;
}

.day-box {
  margin-bottom: 2.5em;
  &__date {
    margin-bottom: 0.3em;
    color: $color-primary-1;
  }
}

.pop-up {
  position: fixed;
  display: block;
  z-index: 150;
  width: 90%;
  max-width: 1000px;
  left: 50%;
  top: calc(50vh - 62px);
  transform: translate(-50%, -50%);
  visibility: visible;

  &__price {
    color: $color-primary-1;
  }

  &--filter {
    max-width: 500px;
    text-align: center;

    .select {
      display: inline-block;
      margin-bottom: 1em;
      min-width: 250px;

      .vs__clear,
      .vs__open-indicator {
        fill: $color-primary-3;
      }
      .vs__dropdown-toggle {
        height: 100%;
      }
      .vs__dropdown-option--highlight {
        background-color: $color-primary-3;
        color: $color-white;
      }
      .vs__selected {
        background-color: $color-primary-3;
        color: $color-white;
        border: none;
        .vs__deselect {
          svg path {
            fill: $color-white;
          }
        }
      }
    }
    .calendar {
      display: inline-block;
      margin: 0 0.3em;
      margin-bottom: 1em;

      &:last-of-type {
        margin-right: 0;
      }
      &:first-of-type {
        margin-left: 0;
      }
      &__picker {
        right: 0;
      }

      &__input {
        height: 35px;
        @include font-size(14);
        background-color: $color-primary-3;
        color: $color-white;
        border: none;
        text-align: center;
        cursor: pointer;

        &:focus {
          outline: none;
        }

        &::placeholder {
          color: $color-white;
          text-align: center;
        }
      }
      .vdp-datepicker__calendar {
        .cell:not(.blank):not(.disabled).day:hover {
          border: 1px solid $color-primary-3;
        }
        .cell.selected,
        .cell.selected:hover {
          background: $color-primary-3;
          color: $color-white;
        }
      }
    }
    .delimer {
      display: inline-block;
      width: 12px;
      height: 3px;
      background-color: $color-primary-3;
    }
    .view-input {
      display: none;
    }
    .view-label {
      cursor: pointer;
      &.active {
        font-weight: bold;
        color: $color-primary-3;
      }
    }
  }
}
</style>
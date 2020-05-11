<template>
  <section class="section">
    <orders-detail
      :active="orderDetailPopup"
      :subtitle="modalSubtitle"
      :company="companyDetail"
      :date="dateDetail"
      :order="orderDetail"
      @closed="closeDetail"
    />

    <orders-filter
      :active="filterPopup"
      @closed="closeFilter"
      @changed-filter="changedFilter"
    />

    <obd-card
      card-title="Objednávky"
      v-if="initialized"
    >
      <div slot="controls">
        <obd-button @click="openFilter">Filter</obd-button>
      </div>

      <div v-if="notEmptyObject(orders)">
        <div
          class="day-box"
          v-for="(order, date) in orders"
          :key="date"
        >
          <orders-table
            :orders="order"
            :date="date"
            :formated-date="formatDate(date, dateFormat)"
            @detail="openDetail"
          />
        </div>
      </div>
      <h3 v-else> Nemáte žiadne objednávky </h3>
    </obd-card>
  </section>
</template>

<script>
import moment from 'moment'
import timeMixin from '../../../assets/mixins/timeMixin'
import axios from 'axios'

import OrdersFilter from './components/OrdersFilter'
import OrdersDetail from './components/OrdersDetail'
import OrdersTable from './components/OrdersTable'

export default {
  mixins: [timeMixin],

  components: {
    OrdersFilter,
    OrdersDetail,
    OrdersTable,
  },

  data() {
    return {
      initialized: false,

      filterPopup: false,
      view: 'days',

      companyDetail: '',
      dateDetail: '',
      orderDetail: [],
      orderDetailPopup: false,
      modalSubtitle: '',
    }
  },
  computed: {
    orders() {
      return this.$store.getters['orders/getOrders']
    },

    dateFormat() {
      return this.view == 'months' ? 'MMMM YYYY' : 'DD.MM.YYYY'
    },
  },

  created() {
    this.loadOrders()
  },

  methods: {
    loadOrders(filter) {
      if (typeof filter == 'undefined') filter = ''

      this.$store
        .dispatch('orders/fetchOrders', filter)
        .then(() => {
          this.initialized = true
        })
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať objednávky.<br>Skúste obnoviť stránku.',
          )
        })
    },

    openFilter() {
      this.filterPopup = true
    },
    closeFilter() {
      this.filterPopup = false
    },
    changedFilter(filter, view) {
      this.loadOrders(filter)
      this.view = view
    },

    openDetail(id) {
      let parsed = id.split('#')
      this.orderDetail = this.orders[parsed[0]][parsed[1]]
      this.companyDetail = parsed[1]
      this.dateDetail = parsed[0]
      this.orderDetailPopup = true
    },

    closeDetail() {
      this.orderDetailPopup = false
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>
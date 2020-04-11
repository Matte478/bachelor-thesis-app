<template>
  <section class="section">
    <orders-detail
      :active="orderDetailPopup"
      :subtitle="modalSubtitle"
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

      <div
        class="day-box"
        v-for="(order, date) in orders"
        :key="date"
      >
        <orders-table
          :orders="order"
          :date="date"
          :formated-date="formatDate(date, dateFormat)"
          :view="view"
          @detail="openDetail"
        />
      </div>

    </obd-card>
  </section>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import timeMixin from '../../../assets/mixins/timeMixin'
import OrdersTable from './components/OrdersTable'
import OrdersFilter from './components/OrdersFilter'
import OrdersDetail from './components/OrdersDetail'

export default {
  mixins: [timeMixin],
  components: {
    OrdersTable,
    OrdersFilter,
    OrdersDetail,
  },

  data() {
    return {
      filterPopup: false,
      initialized: false,
      view: 'days',
      filter: '',
      orders: [],

      orderDetailPopup: false,
      modalSubtitle: '',
      orderDetail: [],
    }
  },

  computed: {
    dateFormat() {
      return this.view == 'months' ? 'MMMM YYYY' : 'DD.MM.YYYY'
    },
  },

  created() {
    this.loadOrders()
  },

  methods: {
    openDetail(id) {
      let parsed = id.split('#')
      console.log(this.orders[parsed[0]][parsed[1]])
      this.orderDetail = this.orders[parsed[0]][parsed[1]]
      this.modalSubtitle = this.formatDate(parsed[0]) + ' | ' + parsed[1]
      this.orderDetailPopup = true
    },
    closeDetail() {
      this.orderDetailPopup = false
    },

    openFilter() {
      this.filterPopup = true
    },
    closeFilter() {
      this.filterPopup = false
    },

    changedFilter(filter, view) {
      this.filter = filter
      this.view = view
      this.loadOrders()
    },

    loadOrders() {
      this.$store
        .dispatch('orders/fetchOrders', this.filter)
        .then(response => {
          this.orders = response.data.data
          this.initialized = true
        })
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať objednávky.<br>Skúste obnoviť stránku.',
          )
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.day-box {
  margin-bottom: 2.5em;
  &__date {
    margin-bottom: 0.3em;
    color: $color-primary-1;
  }
}
</style>
<template>
  <section class="section">

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

      <!-- TODO: month view -->
      <div
        class="day-box"
        v-for="(order, date) in orders"
        :key="date"
      >
        <orders-table
          :orders="order"
          :date="formatDate(date, dateFormat)"
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

export default {
  mixins: [timeMixin],
  components: {
    OrdersTable,
    OrdersFilter,
  },

  data() {
    return {
      filterPopup: false,
      initialized: false,
      view: 'days',
      filter: '',
      orders: [],
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
        .then(() => {
          this.orders = this.$store.getters['orders/getOrders']
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
</style>
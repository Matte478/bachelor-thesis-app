<template>
  <section class="section section--dashboard">
    <orders-detail
      :active="orderDetailPopup"
      :subtitle="modalSubtitle"
      :order="orderDetail"
      @closed="closeDetail"
    />

    <obd-card
      card-title="Dashboard"
      v-if="initialized"
    >
      <h1 class="title">Dnešné objednávky</h1>
      <div v-if="notEmptyObject(orders)">

        <orders-table
          :date="getToday()"
          :orders="orders"
          @detail="openDetail"
        />

      </div>
      <h3 v-else>Na dnes nemáte žiadne objednávky</h3>

    </obd-card>
  </section>
</template>

<script>
import timeMixin from '../../../assets/mixins/timeMixin'
import OrdersTable from './components/OrdersTable'
import OrdersDetail from './components/OrdersDetail'

export default {
  mame: 'dashboard',
  mixins: [timeMixin],

  components: {
    OrdersTable,
    OrdersDetail,
  },

  data() {
    return {
      initialized: false,
      orders: [],

      orderDetailPopup: false,
      modalSubtitle: '',
      orderDetail: [],
    }
  },

  created() {
    let filter = '?filter[date]=' + this.getToday()
    this.$store
      .dispatch('orders/fetchOrders', filter)
      .then(() => {
        let orders = this.$store.getters['orders/getOrders']
        if(this.notEmptyObject(orders))
          this.orders = orders[this.getToday()]
        this.initialized = true
      })
      .catch(e => {
        this.flashError(
          'Niečo sa pokazilo, nebolo možné načítať objednávky.<br>Skúste obnoviť stránku.',
        )
      })
  },

  methods: {
    closeDetail() {
      this.orderDetailPopup = false
    },
    openDetail(id) {
      let parsed = id.split('#')
      this.orderDetail = this.orders[parsed[1]]
      this.modalSubtitle = this.formatDate(parsed[0]) + ' | ' + parsed[1]
      this.orderDetailPopup = true
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 0.7em;
}
</style>
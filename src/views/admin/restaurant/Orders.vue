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

      <div>
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
    loadOrders() {
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
    },

    openFilter() {
      this.filterPopup = true
    },
    closeFilter() {
      this.filterPopup = false
    },
    changedFilter(filter, view) {
      this.loadOrders()
      this.view = view
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
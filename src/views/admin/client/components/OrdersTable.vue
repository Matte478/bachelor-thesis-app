<template>
  <div>
    <h2 class="day-box__date">{{ formatedDate }}</h2>
    <obd-table
      class="day-box__table"
      layout="fixed"
      :data="JSON.stringify(formatedOrders)"
      :columns="JSON.stringify(columns)"
      :actions="JSON.stringify(actions)"
      @action="action"
    />
  </div>
</template>

<script>
export default {
  props: ['orders', 'date', 'formated-date', 'view'],

  data() {
    return {}
  },

  computed: {
    columns() {
      let columns = [
        {
          key: 'name',
          text: 'Zamestnanec',
        },
        {
          key: 'discount_price',
          text: 'Cena s dotáciou',
          suffix: '€',
        },
        {
          key: 'price',
          text: 'Plná cena',
          suffix: '€',
        },
      ]
      if (this.view == 'days') {
        columns.splice(1, 0, {
          key: 'meal',
          text: 'Jedlo',
        })
      }
      return columns
    },

    actions() {
      let actions = '';

      if(this.view == 'months')
        actions = [
        {
          text: 'Detail',
          action: 'detail',
          color: '#2d4059',
        },
      ]

      return actions
    },

    formatedOrders() {
      if (this.view == 'days') return this.orders

      let formated = []

      Object.keys(this.orders).map(key => {
        formated.push({
          id: this.date + '#' + key,
          name: key,
          price: this.orders[key].price,
          discount_price: this.orders[key].discount_price,
        })
      })

      return formated
    },
  },

  methods: {
    action(e) {
      this.$emit(e.detail.action, e.detail.id)
    }
  },
}
</script>
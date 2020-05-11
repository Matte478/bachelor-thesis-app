<template>
  <div>
    <h2 class="day-box__date">{{ formatedDate }}</h2>
    <obd-table
      class="day-box__table"
      layout="fixed"
      :data="JSON.stringify(formatCompanyOrders(orders, date))"
      :columns="JSON.stringify(columns)"
      :actions="JSON.stringify(tableActions)"
      @action="action"
    />
  </div>
</template>

<script>
export default {
  props: ['orders', 'date', 'formated-date'],

  data() {
    return {
      columns: [
        {
          key: 'company',
          text: 'Klient',
        },
        {
          key: 'price',
          text: 'Cena objednávky',
        },
        {
          key: 'status',
          text: 'Stav objednávky',
        },
      ],
      tableActions: [
        {
          text: 'Detail',
          action: 'detail',
          color: '#2d4059',
        },
      ],
    }
  },

  methods: {
    formatCompanyOrders(orders, date) {
      let parsedobj = JSON.parse(JSON.stringify(orders))
      let formated = []

      Object.keys(parsedobj).map(key => {
        formated.push({
          id: date + '#' + key,
          company: key,
          price: parsedobj[key].price + '€',
          status: parsedobj[key].status,
        })
      })

      return formated
    },
    action(e) {
      this.$emit(e.detail.action, e.detail.id)
    },
  },
}
</script>
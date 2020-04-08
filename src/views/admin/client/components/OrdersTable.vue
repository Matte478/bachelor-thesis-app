<template>
  <div>
    <h2 class="day-box__date">{{ date }}</h2>
    <obd-table
      class="day-box__table"
      :data="JSON.stringify(orders)"
      :columns="JSON.stringify(columns)"
      layout="fixed"
    />
  </div>
</template>

<script>
export default {
  props: ['orders', 'date'],

  data() {
    return {
      columns: [
        {
          key: 'name',
          text: 'Zamestnanec',
        },
        {
          key: 'meal',
          text: 'Jedlo',
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
      ],
    }
  },
}
</script>
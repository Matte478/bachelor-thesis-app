<template>
  <obd-modal
    class="pop-up"
    :active="active"
    @closed="closeDetail"
    modal-title="Detail objednávky"
    :modal-subtitle="subtitle"
    v-if="order.meals"
    max-width="1000px"
  >
    <div slot="controls">
      <h3 class="pop-up__price">Cena objednávky: <span>{{ order.price }}€</span></h3>
    </div>

    <obd-table
      class="pop-up__table"
      :data="JSON.stringify(formatMealsForDetail(order.meals))"
      :columns="JSON.stringify(columns)"
    />
  </obd-modal>
</template>

<script>
export default {
  props: ['active', 'subtitle', 'order'],

  data() {
    return {
      columns: [
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

  methods: {
    closeDetail() {
      this.$emit('closed')
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
  },
}
</script>
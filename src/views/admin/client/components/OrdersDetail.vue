<template>
  <obd-modal
    class="pop-up"
    max-width="1000px"
    v-if="order.meals"
    :active="active"
    modal-title="Detail objednávky"
    :modal-subtitle="subtitle"
    @closed="closeDetail"
  >
    <div
      slot="controls"
      class="order-info"
    >
      <h3 class="pop-up__price">Cena objednávky: <span>{{ order.price }}€</span></h3>
      <h3 class="pop-up__price">Cena s dotáciou: <span>{{ order.discount_price }}€</span></h3>
    </div>

    <obd-table
      class="pop-up__table"
      :data="JSON.stringify(formatedMeals)"
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
          key: 'discount_price',
          text: 'Cena s dotáciou za ks',
        },
        {
          key: 'price',
          text: 'Plná cena za ks',
        },
      ],
    }
  },

  computed: {
    formatedMeals() {
      let formated = []

      Object.keys(this.order.meals).map(key => {
        formated.push({
          id: this.order.meals[key].meal_id,
          meal: this.order.meals[key].meal,
          count: this.order.meals[key].count,
          price: this.order.meals[key].price + '€',
          discount_price: this.order.meals[key].discount_price + '€',
        })
      })

      return formated
    },
  },

  methods: {
    closeDetail() {
      this.$emit('closed')
    },
  },
}
</script>

<style lang="scss" scoped>
.order-info {
  text-align: right;
}
</style>
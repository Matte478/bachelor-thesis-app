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
      <h3 class="pop-up__status">Stav objednávky:</h3>
      <div class="select">
        <v-select
          v-model="order.status"
          :clearable="false"
          :disabled="disabledStatus"
          :options="status"
          style="height: 35px"
          label="Start Time"
          placeholder="Stav objednávky"
          @input="updateStatus"
        />
      </div>
    </div>
    <obd-table
      class="pop-up__table"
      :data="JSON.stringify(formatMealsForDetail(order.meals))"
      :columns="JSON.stringify(columns)"
    />
  </obd-modal>
</template>

<script>
import axios from 'axios'
import timeMixin from '../../../../assets/mixins/timeMixin'

export default {
  props: ['active', 'order', 'company', 'date'],
  mixins: [timeMixin],
  
  data() {
    return {
      status: ['čaká na prípravu', 'pripravuje sa', 'na rozvoze', 'doručené'],
      disabledStatus: true,
      
      subtitle: '',

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

  watch: {
    company() {
      this.subtitle = this.formatDate(this.date) + ' | ' + this.company
    },
    date() {
      this.disabledStatus = this.date != this.getToday()
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

    updateStatus() {
      axios.defaults.headers.common['Authorization'] =
        this.$store.state.auth.tokenType + ' ' + this.$store.state.auth.token

      axios
        .put('/orders/' + this.company + '/' + this.date, {
          status: this.order.status,
        })
        .then(() => {
          this.flashSuccess('Stav objednávky bol upravený.', {
            timeout: 3000,
          })
        })
        .catch(error => {
          console.log(error.response)
          this.flashError('Nebolo možné upraviť stav objednávky.', {
            timeout: 3000,
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.pop-up {
  &__status {
    display: inline-block;
    margin-right: 0.3em;
    color: $color-primary-1;
  }
  .select {
    display: inline-block;
    min-width: 160px;
  }
}
</style>
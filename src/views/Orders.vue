<template>
  <section class="section">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <obd-card
            v-if="weekOrders.length > 4"
            card-title="Objednaj si obedy na tento týždeň"
            :card-subtitle="getWeekRange('DD.MM.YYYY')"
            v-cloak
          >
            <div
              slot="controls"
              v-if="!errorMessage"
            >
              <obd-scroll
                v-for="(day, index) in weekDays"
                :key="index"
                :target="weekDaysEn[index].toLowerCase()"
                v-html="day"
              />
            </div>
            <form
              action="#"
              @submit.prevent="submitOrder"
              v-if="!errorMessage"
            >
              <div
                v-for="(date, indexDay) in getCurrentWeek"
                :key="indexDay"
                class="order"
              >
                <h3
                  class="order__title"
                  :id="weekDaysEn[indexDay].toLowerCase()"
                >
                  {{weekDays[indexDay]}} | {{formatDate(date)}}
                </h3>
                <hr class="order__divider">
                <div
                  v-for="(meal, indexMeal) in meals"
                  :key="indexMeal"
                  class="order__item"
                  :style="{opacity: (isPassedDate(date) ? 0.6 : 1)}"
                >
                  <input
                    type="radio"
                    :name="weekDaysEn[indexDay].toLowerCase() + '-meal'"
                    :id="weekDaysEn[indexDay].toLowerCase() + '-' + indexMeal"
                    :value="meal.id"
                    v-model="weekOrders[indexDay].meal_id"
                    :key="meal.id"
                    :disabled="isPassedDate(date)"
                  >
                  <label :for="weekDaysEn[indexDay].toLowerCase() + '-' + indexMeal">
                    {{meal.meal}} <br />
                    Vaša cena: {{ weekOrders[indexDay].discount_price || meal.discount_price }}€ | Plná cena: {{meal.price}}€
                  </label>
                </div>
              </div>
              <obd-button
                block
                id="submitBtn"
              > Uložiť </obd-button>
            </form>
            <h3 v-else>{{ errorMessage }}</h3>
          </obd-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import timeMixin from '../assets/mixins/timeMixin'

export default {
  mixins: [timeMixin],

  data() {
    return {
      weekOrders: [],
      errorMessage: '',
    }
  },

  computed: {
    meals() {
      return this.$store.getters.getMeals
    },
  },

  created() {
    this.loadOrders()
  },

  methods: {
    loadOrders() {
      this.$store.dispatch('fetchMeals').catch(e => {
        if (e.response.status == 401)
          this.errorMessage = 'Nemáte žiadneho dodávateľa jedál'
        else
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať obsah stránky.<br>Skúste obnoviť stránku.',
            {
              timeout: 3000,
            },
          )
      })

      let filter =
        '?filter[date_from]=' +
        this.getWeekStart() +
        '&filter[date_to]=' +
        this.getWeekEnd()
      this.$store
        .dispatch('orders/fetchEmployeeOrders', filter)
        .then(() => {
          this.weekOrders = this.$store.getters['orders/getOrders']
          this.formatWeekOrders()
        })
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať objednávky.<br>Skúste obnoviť stránku.',
            {
              timeout: 3000,
            },
          )
        })
    },

    // this method add empty order to weekOrder,
    // because order form needs order item for every day
    formatWeekOrders() {
      this.getCurrentWeek.forEach((day, index) => {
        let exists = false
        this.weekOrders.forEach(o => {
          if (o.date == day) {
            exists = true
          }
        })
        if (!exists) {
          this.weekOrders.splice(index, 0, {
            date: day,
            meal_id: null,
          })
        }
      })
    },
    submitOrder(e) {
      this.$store
        .dispatch('orders/submitOrder', this.weekOrders)
        .then(response => {
          this.loadOrders()
          this.flashSuccess('Obedy boli uložené.', {
            timeout: 3000,
          })
        })
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať objednávky.<br>Skúste obnoviť stránku.',
            {
              timeout: 3000,
            },
          )
        })
    },
  },
}
</script>

<style lang="scss" scoped>
obd-scroll {
  margin-left: 0.3em;
  margin-bottom: 0.3em;
}

.order {
  margin-bottom: 2em;
  @include font-size(15);

  &__title {
    @include font-size(20);
  }
  &__divider {
    margin: 0.5em 0;
  }
  &__item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1em;
    label {
      line-height: 1.3;
      padding-left: 0.5em;
    }
  }
}
</style>
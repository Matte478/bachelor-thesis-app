<template>
    <section class="section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <obd-card
                        v-if="order.length"
                        card-title="Objednaj si obedy na tento týždeň"
                        :card-subtitle="getWeekRange('DD.MM.YYYY')"
                    >
                        <div slot="controls">
                            <obd-scroll
                                v-for="(day, index) in weekDays"
                                :key="index"
                                :target="weekDaysEn[index].toLowerCase()"
                                v-html="day"
                            />
                        </div>
                        <form action="#" @submit.prevent="submitOrder">
                            <div
                                v-for="(date, indexDay) in getCurrentWeek"
                                :key="indexDay"
                                class="order"
                            >
                                <h3 class="order__title" :id="weekDaysEn[indexDay].toLowerCase()">
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
                                        v-model="order[indexDay].meal_id"
                                        :key="meal.id"
                                        :disabled="isPassedDate(date)"
                                    >
                                    <label
                                        :for="weekDaysEn[indexDay].toLowerCase() + '-' + indexMeal"
                                    >
                                        {{meal.meal}} <br />
                                        {{meal.price}}€
                                    </label>
                                </div> 
                            </div>
                            <obd-button block id="submitBtn">Uložiť</obd-button>
                        </form>
                    </obd-card>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import timeMixin from '../assets/mixins/timeMixin';
import axios from 'axios';

export default {
    mixins: [timeMixin],
    // data() {
    //     return {
    //         localOrder: [],
    //     }
    // },
    computed: {
        meals() {
            return this.$store.getters.getMeals;
        },
        order: {
            set(order) {
                this.$store.commit('orders/fetchOrders', {order});
            },
            get() {
                return this.$store.getters['orders/getOrders'];
            }
        }
    },

    created() {
        this.$store.dispatch('fetchMeals')
        .catch((e) => {
            this.flashError('Niečo sa pokazilo, nebolo možné načítať obsah stránky.<br>Skúste obnoviť stránku.');
        });

        // this.addDateToOrder();

        let filter = '?filter[date_from]=' + this.getWeekStart() + '&filter[date_to]=' + this.getWeekEnd();
        this.$store.dispatch('orders/fetchOrders', filter)
        .catch((e) => {
            this.flashError('Niečo sa pokazilo, nebolo možné načítať objedná.<br>Skúste obnoviť stránku.');
        });
    },
    methods: {
        // addDateToOrder() {
        //     this.order.forEach((o, index) => {
        //         if(o.date == null)
        //             o.date = this.getCurrentWeek[index]
        //     })
        // },
        
        submitOrder(e) {
            this.$store.dispatch('orders/submitOrder')
            .then(response => {
                this.flashSuccess('Obedy boli uložené.', {
                    timeout: 3000,
                });
            })
            .catch((e) => {
                console.log(e);
                this.flashError('Niečo sa pokazilo, nebolo možné načítať objedná.<br>Skúste obnoviť stránku.');
            });
        }
    }
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
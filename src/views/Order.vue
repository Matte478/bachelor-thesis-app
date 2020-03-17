<template>
    <section class="section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <obd-card
                        card-title="Objednaj si obedy na tento týždeň"
                        :card-subtitle="getWeekRange('DD.MM.YYYY')"
                    >
                        <form action="#" @submit.prevent="submitOrder">
                            <div 
                                v-for="(date, indexDay) in getCurrentWeek"
                                :key="indexDay"
                                class="order" 
                            >
                                <h3 class="order__title">{{weekDays[indexDay]}} ({{date}})</h3>
                                <hr class="order__divider">
                                <div
                                    v-for="(meal, indexMeal) in meals"
                                    :key="indexMeal"
                                    class="order__item"
                                >
                                    <input
                                        type="radio" 
                                        :name="weekDaysEn[indexDay].toLowerCase() + '-meal'"
                                        :id="weekDaysEn[indexDay].toLowerCase() + '-' + indexMeal" 
                                        :value="meal.id"
                                        v-model="order[indexDay].meal"
                                        :key="meal.id"
                                    >
                                    <label :for="weekDaysEn[indexDay].toLowerCase() + '-' + indexMeal">
                                        {{meal.meal}} <br />
                                        {{meal.price}}€
                                    </label>
                                </div> 
                            </div>
                            <obd-button block>Uložiť</obd-button>
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
    data() {
        return {
            order: [
                {'meal': null, 'date': null},
                {'meal': null, 'date': null},
                {'meal': null, 'date': null},
                {'meal': null, 'date': null},
                {'meal': null, 'date': null},
                {'meal': null, 'date': null},
                {'meal': null, 'date': null},
            ],
        }
    },
    computed: {
        meals() {
            return this.$store.getters.getMeals;
        }
    },
    created() {
        this.$store.dispatch('fetchMeals')
        .catch((e) => {
            this.flashError('Niečo sa pokazilo, nebolo možné načítať obsah stránky.<br>Skúste obnoviť stránku.');
        });
        
        this.addDateToOrder();
    },
    methods: {
        addDateToOrder() {
            this.order.forEach((o, index) => {
                if(o.date == null)
                    o.date = this.getCurrentWeek[index]
            })
        },
        submitOrder(e) {
            //TODO
        }
    }
}
</script>

<style lang="scss" scoped>
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
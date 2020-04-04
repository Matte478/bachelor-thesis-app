<template>
    <section class="section section--dashboard">
        <obd-card card-title="Dashboard" v-if="initialized">
            <h1>Dnešné objednávky</h1>
            <div>
                <div
                    v-for="(todayOrders, company) in orders"
                    :key="company"
                >
                    <h2>{{ company }}</h2>
                    <div
                        v-for="(dayOrder, day) in todayOrders"
                        :key="day"
                    >
                        <p
                            v-for="(order, o) in dayOrder"
                            :key="o"
                        >
                            <b>{{ order.count }}x</b>: {{ order.meal }}
                        </p>   
                    </div>
                </div>
            </div>
        </obd-card>
    </section>    
</template>

<script>
import timeMixin from '../../../assets/mixins/timeMixin';

export default {
    mixins: [timeMixin],

    data() {
        return {
            initialized: false,
        }
    },

    computed: {
        orders() {
            return this.$store.getters['orders/getOrders'];
        }
    },

    created() {
        // let filter = '?filter[date]=' + this.getToday();
        let filter = '?filter[date]=2020-04-03';
        this.$store.dispatch('orders/fetchOrders', filter)
        .then(() => {
            this.initialized = true;
            // this.weekOrders = this.$store.getters['orders/getOrders'];
            // this.formatWeekOrders();
        })
        .catch((e) => {
            this.flashError('Niečo sa pokazilo, nebolo možné načítať objednávky.<br>Skúste obnoviť stránku.');
        });
    }
}
</script>

<style lang="scss" scoped>

</style>
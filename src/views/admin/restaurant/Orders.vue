<template>
    <section class="section section--dashboard">
        <obd-modal
            class="pop-up"
            :active="orderDetailPopup"
            @closed="closeDetail"
            modal-title="Detail objednávky"
            :modal-subtitle="modalSubtitle"
            v-if="orderDetail.meals"
        >
            <div slot="controls">
                <h3 class="pop-up__price">Cena objednávky: <span>{{ orderDetail.price }}€</span></h3>
            </div>

            <obd-table
                class="pop-up__table"
                :data="JSON.stringify(formatMealsForDetail(orderDetail.meals))"
                :columns="JSON.stringify(columnsDetail)"
            />

            <!-- {{formatMealsForDetail(orderDetail.meals)}}
            <pre>
            {{ orderDetail }}
            </pre>  -->
        </obd-modal>
        <obd-card card-title="Objednávky">
            <div slot="controls" class="filter">
                zobrazenie
                <input type="radio" name="view" value="day" id="view-day">
                <label for="view-day">denne</label>

                <input type="radio" name="view" value="month" id="view-month">
                <label for="view-month">mesacne</label>
                <div class="select">
                    <v-select
                        multiple
                        v-model="company"
                        :options="companies"
                        style="height: 35px"
                        label="Start Time"
                        placeholder="Všetci klienti"
                    />
                </div>
                <div class="calendar">
                    <datepicker
                        calendar-class="calendar__picker"
                        input-class="calendar__input"
                        format="dd.MM.yyyy"
                        placeholder="Dátum od"
                        :value="dateFrom"
                        @input="dateFrom = fixDate($event)"
                        tint-color="#188c33"
                    />
                </div>
                <span class="delimer" />
                <div class="calendar">
                    <datepicker
                        calendar-class="calendar__picker"
                        input-class="calendar__input"
                        format="dd.MM.yyyy"
                        placeholder="Dátum do"
                        :value="dateTo"
                        @input="dateTo = fixDate($event)"
                    />
                </div>
            </div>

            <div>
                <div
                    class="day-box"
                    v-for="(order, date) in orders"
                    :key="date"
                >
                    <h2 class="day-box__date">{{formatDate(date)}}</h2>
                    <obd-table
                        class="day-box__table"
                        :data="JSON.stringify(formatCompanyOrders(order, date))"
                        :columns="JSON.stringify(columns)"
                        :actions="JSON.stringify(tableActions)"
                        @action="action"
                    />
                </div> 
            </div>
        </obd-card>
    </section>    
</template>

<script>
import moment from 'moment';
import timeMixin from '../../../assets/mixins/timeMixin';
 
export default {
    mixins: [timeMixin],

    data() {
        return {
            dateFrom: '',
            dateTo: '',
            company: [],

            orderDetail: [],
            orderDetailPopup: false,
            modalSubtitle: '',

            columns: [
                {
                    "key": "company",
                    "text": "Klient"
                },
                {
                    "key": "price",
                    "text": "Cena objednávky"
                },
            ],
            tableActions: [
                {
                    "text": "Detail",
                    "action": "detail",
                    "color": "#2d4059"
                },
            ],
            columnsDetail: [
                {
                    "key": "meal",
                    "text": "Jedlo"
                },
                {
                    "key": "count",
                    "text": "Množstvo"
                },
                {
                    "key": "price",
                    "text": "Cena za ks"
                },
            ],
        }
    },
    computed: {
        orders() {
            return this.$store.getters['orders/getOrders'];
        },
        filter() {
            return '?filter[date_from]=' + this.dateFrom + '&filter[date_to]=' + this.dateTo;
        },
        companies() {
            // TODO: fetch from API
            return [
                'company 1', 'company 2', 'company 3'
            ]
        },
    },
    created() {
        this.$store.dispatch('orders/fetchOrders', this.filter)

        .catch((e) => {
            this.flashError('Niečo sa pokazilo, nebolo možné načítať objednávky.<br>Skúste obnoviť stránku.');
        });
    },
    watch: {
        dateFrom: function () {
            this.$store.dispatch('orders/fetchOrders', this.filter)
        },
        dateTo: function (val) {
            this.$store.dispatch('orders/fetchOrders', this.filter)
        }
    },
    methods: {
        fixDate(event){
            return moment(event).format('YYYY-MM-DD');
        },
        formatCompanyOrders(orders, date) {
            let parsedobj = JSON.parse(JSON.stringify(orders));
            let formated = [];

            Object.keys(parsedobj).map((key) => {
                formated.push({
                    'id': date + '#' + key,
                    'company': key,
                    'price': parsedobj[key].price + '€'
                })
            })
            
            return formated;
        },
        formatMealsForDetail(meals) {
            let formated = [];

            Object.keys(meals).map((key) => {
                formated.push({
                    'id': meals[key].meal_id,
                    'meal': meals[key].meal,
                    'count': meals[key].count,
                    'price': meals[key].price + '€'
                })
            })

            return formated;
        },
        openDetail(id) {
            let parsed = id.split("#");
            this.orderDetail = this.orders[parsed[0]][parsed[1]];
            this.modalSubtitle = this.formatDate(parsed[0]) + ' / ' + parsed[1];
            this.orderDetailPopup = true;
        },
        closeDetail() {
            this.orderDetailPopup = false;
        },
        action(e) {
            switch(e.detail.action) {
                case 'detail': 
                    this.openDetail(e.detail.id);
                    break;
            }
        },
    }
}
</script>

<style lang="scss">
.section {
    padding-top: 20px;
}
.filter {
    display: flex;
    justify-content: center;
    align-items: center;
}
.select {
    width: 250px;

    .vs__clear,
    .vs__open-indicator {
        fill: $color-primary-3;
    }
    .vs__dropdown-toggle {
        height: 100%;
    }
    .vs__dropdown-option--highlight {
        background-color: $color-primary-3;
        color: $color-white;
    }
    .vs__selected {
        background-color: $color-primary-3;
        color: $color-white;
        border: none;
        .vs__deselect {
            svg path {
                fill: $color-white;
            }
        }
    }
}
.calendar {
    margin: 0 0.3em;

    &:last-of-type {
        margin-right: 0;
    }
    &__picker {
        right: 0;
    }

    &__input {
        height: 35px;
        @include font-size(14);
        background-color: $color-primary-3;
        color: $color-white;
        border: none;
        text-align: center;
        cursor: pointer;

        &:focus {
            outline: none;
        }

        &::placeholder {
            color: $color-white;
            text-align: center;
        }
    }
    .vdp-datepicker__calendar {
        .cell:not(.blank):not(.disabled).day:hover {
            border: 1px solid $color-primary-3;
        }
        .cell.selected,
        .cell.selected:hover {
           background: $color-primary-3; 
           color: $color-white;
        }
    }
}
.delimer {
    display: inline-block;
    width: 12px;
    height: 3px;
    background-color: $color-primary-3;
}

.day-box {
    margin-bottom: 2.5em;
    &__date {
        margin-bottom: 0.3em;
        color: $color-primary-1;
    }
}

.pop-up {
    position: fixed;
    display: block;
    z-index: 150;
    width: 90%;
    max-width: 1000px;
    left: 50%;
    top: calc(50vh - 62px);
    transform: translate(-50%, -50%);
    visibility: visible;

    &__price {
        color: $color-primary-1;
    }
}
</style>
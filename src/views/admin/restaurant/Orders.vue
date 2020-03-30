<template>
<section class="section section--dashboard">
        <obd-card card-title="Objednávky">
            <div slot="controls" class="filter">
                <div class="select">
                    <v-select
                        multiple
                        v-model="company"
                        :options="companies"
                        style="height: 35px"
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
            od: {{ dateFrom }} do: {{ dateTo }} <br />
            <pre>
                {{ orders }}
            </pre>
        </obd-card>
    </section>    
</template>

<script>
import moment from 'moment';
 
export default {
    data() {
        return {
            dateFrom: '',
            dateTo: '',
            company: [],
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
        }
    },
    created() {
        this.$store.dispatch('orders/fetchOrders', this.filter)

        .catch((e) => {
            this.flashError('Niečo sa pokazilo, nebolo možné načítať objedná.<br>Skúste obnoviť stránku.');
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
</style>
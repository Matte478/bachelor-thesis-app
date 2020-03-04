<template>
    <section class="section">
        <div class="row">
            <div class="col-12">
                <obd-card card-title="Zatiaľ nemáte žiadneho dodávateľa jedál" card-subtitle="Môžete si vybrať jedného z vášho mesta">
                    <obd-table
                        v-if="restaurants"
                        :data="restaurantsStr"
                        :columns="JSON.stringify(columns)"
                        :actions="JSON.stringify(tableActions)"
                        @action="action"
                    />
                </obd-card>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            restaurants: '',
            tableActions: [
                {
                    "text": "edit",
                    "action": "edit",
                    "icon": "fas fa-air-freshener"
                },
                {
                    "text": "delete",
                    "action": "delete"
                }
            ],
            columns: [
                {
                    "key": "restaurant",
                    "text": "Reštaurácia"
                },
                {
                    "key": "city",
                    "text": "Mesto"
                },
            ]
        }
    },
    computed: {
        restaurantsStr() {
            return JSON.stringify(this.restaurants)
        }
    },
    created() {
        this.loadRestaurands();
    },
    methods: {
        loadRestaurands() {
           axios.defaults.headers.common['Authorization'] = this.$store.state.tokenType + ' ' + this.$store.state.token;

            axios.get('/restaurants')
            .then(response => {
                this.restaurants = response.data.data;
            })
            .catch(error => {
                console.log(error);
                this.flashError('Niečo sa pokazilo, nebolo možné načítať obsah stránky.<br>Skúste obnoviť stránku.');
            })
        },
        action(e) {
            console.log(e.detail.event);
        }
    } 
}
</script>

<style lang="scss" scoped>
h1 {
    margin-bottom: 0.4em; 
}
</style>
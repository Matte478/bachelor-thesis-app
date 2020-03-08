<template>
    <obd-card card-title="Zatiaľ nemáte žiadneho dodávateľa jedál" card-subtitle="Môžete si vybrať jedného z vášho mesta">
        <obd-table
            v-if="restaurants"
            :data="restaurantsStr"
            :columns="JSON.stringify(columns)"
            :actions="JSON.stringify(tableActions)"
            @action="action"
        />
    </obd-card>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            restaurants: '',
            tableActions: [
                {
                    "text": "Vybrať",
                    "action": "selectContractor",
                },
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
        action(e) {
            switch(e.detail.action) {
                case 'selectContractor':
                    this.createAgreement(e.detail.id)
                    break;
                case 'delete':
                    this.deleteMeal(e.detail.id);
                    break;
            }
        },

        createAgreement(restaurantId) {
            axios.defaults.headers.common['Authorization'] = this.$store.state.tokenType + ' ' + this.$store.state.token;

            axios.post('/agreements', {
                'restaurant_id': restaurantId,
            })
            .then(response => {
                this.restaurants = response.data.data;
                console.log(response);
            })
            .catch(error => {
                this.flashError(error.response.data.error);
            })
        },

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
    } 
}
</script>
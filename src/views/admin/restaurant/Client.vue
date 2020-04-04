<template>
    <section class="section section--admin">
        <obd-card card-title="Klienti" v-if="initialized">
            <h2>Čakajúce na schválenie</h2>
            <obd-table
                v-if="unconfirmedClients.length"
                :data="JSON.stringify(unconfirmedClients)"
                :columns="JSON.stringify(columns)"
                :actions="JSON.stringify(tableActions)"
                @action="action"
            />
            <h3 v-else>Nemáte žiadne nové žiadosti</h3>

            <h2>Schválené spolupráce</h2>
            <obd-table
                v-if="confirmedClients.length"
                :data="confirmedClientsStr"
                :columns="JSON.stringify(columns)"  
            />
            <h3 v-else>Zatiaľ nemáte žiadnych klientov</h3>
        </obd-card>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            initialized: false,
            confirmedClients: [],
            unconfirmedClients: [],
            columns: [
                {
                    "key": "company",
                    "text": "Klient"
                },
                {
                    "key": "city",
                    "text": "Mesto"
                },
            ],
            tableActions: [
                {
                    "text": "Schváliť",
                    "action": "confirm",
                    "color": "#f07b3f"
                },
            ],
        }
    },
    computed: {
        confirmedClientsStr() {
            return JSON.stringify(this.confirmedClients)
        }
    },
    created() {
        this.loadContractor();
    },
    methods: {
        loadContractor() {
            axios.defaults.headers.common['Authorization'] = this.$store.state.auth.tokenType + ' ' + this.$store.state.auth.token;

            axios.get('/agreements')
            .then(response => {
                let formated = this.formatClients(response.data.data);
                this.confirmedClients = formated.confirmed;
                this.unconfirmedClients = formated.unconfirmed;
                this.initialized = true;
            })
            .catch(error => {
                console.log(error);
            })
        },

        formatClients(clients) {
            let confirmed = [];
            let unconfirmed = [];

            clients.forEach((client) => {
                let tmp = {
                    id: client.id,
                    company: client.company.company,
                    city: client.company.city,
                }
                if(client.confirmed) {
                    confirmed.push(tmp);
                } else {
                    unconfirmed.push(tmp);
                }
            })

            return {
                confirmed: confirmed,
                unconfirmed: unconfirmed
            }
        },

        action(e) {
            switch(e.detail.action) {
                case 'confirm':
                    this.confirmAgreement(e.detail.id)
                    break;
            }
        },

        confirmAgreement(id) {
            let response = confirm('Naozaj chcete schváliť danú žiadosť?');

            if(response) {
                axios.defaults.headers.common['Authorization'] = this.$store.state.auth.tokenType + ' ' + this.$store.state.auth.token;

                axios.post('/agreements/' + id + '/confirm')
                .then(response => {
                    this.restaurants = response.data.data;
                    this.flashSuccess('Klient bol schválený.', {
                        timeout: 3000,
                    });
                    this.loadContractor();
                })
                .catch(error => {
                    this.flashError(error.response.data.error);
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
obd-card {
    h2 {
        margin-bottom: 0.5em;
    }
    h3 {
        margin: 1em 0 3em;
    }
}
obd-table {
    margin-bottom: 3em;
}
</style>
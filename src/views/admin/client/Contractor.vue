<template>
    <section class="section section--admin">
        <div class="row">
            <div class="col-12">
                <create-agreement
                    v-if="initialized && !hasContractor"
                    @created-agreement="loadContractor"
                />
                <obd-card
                    v-else-if="initialized"
                    card-title="Váš dodávateľ"
                >
                    <h3 v-if="!confirmed">Dodávateľ ešte nepotvrdil vašu spoluprácu.</h3>
                    <p>Názov reštaurácie: {{contractor.restaurant}}</p>
                    <p>Mesto: {{contractor.city}}</p>
                    <p>A ďalšie informácie ...</p>
                </obd-card>
            </div>
        </div>
    </section>
</template>

<script>
import CreateAgreement from './components/CreateAgreement';
import axios from 'axios';

export default {
    components: {
        CreateAgreement
    },
    data() {
        return {
            initialized: false,
            hasContractor: false,
            confirmed: false,
            contractor: '',
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
                this.confirmed = response.data.data.confirmed;
                this.contractor = response.data.data.restaurant;
                this.hasContractor = true;
                this.initialized = true;
            })
            .catch(error => {
                this.hasContractor = false;
                this.initialized = true;
                // console.log(error);
            })
        }
    } 
}
</script>
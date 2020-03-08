<template>
    <section class="section section--admin">
        <div class="row">
            <div class="col-12">
                <create-agreement
                    v-if="!hasContractor"
                    @created-agreement="loadContractor"
                />
                <div v-else>
                    <obd-card card-title="Váš dodávateľ">
                        <h3 v-if="!confirmed">Dodávateľ ešte nepotvrdil vašu spoluprácu.</h3>
                        <p>Názov reštaurácie: {{contractor.restaurant}}</p>
                        <p>Mesto: {{contractor.city}}</p>
                        <p>A ďalšie informácie ...</p>
                    </obd-card>
                </div>
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
            axios.defaults.headers.common['Authorization'] = this.$store.state.tokenType + ' ' + this.$store.state.token;

            axios.get('/agreements')
            .then(response => {
                this.confirmed = response.data.data.confirmed;
                this.contractor = response.data.data.restaurant;
                this.hasContractor = true;
            })
            .catch(error => {
                console.log(error);
            })
        }
    } 
}
</script>
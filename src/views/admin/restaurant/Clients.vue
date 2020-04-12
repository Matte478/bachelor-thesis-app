<template>
  <section class="section">
    <obd-card
      card-title="Klienti"
      v-if="initialized"
    >

      <clients-unconfirmed
        class="unconfirmed"
        :clients="unconfirmedClients"
        @confirm="confirmAgreement"
      />

      <clients-confirmed :clients="confirmedClients" />
    </obd-card>
  </section>
</template>

<script>
import axios from 'axios'
import ClientsConfirmed from './components/ClientsConfirmed'
import ClientsUnconfirmed from './components/ClientsUnconfirmed'

export default {
  components: {
    ClientsConfirmed,
    ClientsUnconfirmed,
  },

  data() {
    return {
      initialized: false,
      confirmedClients: [],
      unconfirmedClients: [],
      columns: [
        {
          key: 'company',
          text: 'Klient',
        },
        {
          key: 'city',
          text: 'Mesto',
        },
      ],
      tableActions: [
        {
          text: 'Schváliť',
          action: 'confirm',
          color: '#f07b3f',
        },
      ],
    }
  },

  created() {
    this.loadContractor()
  },
  methods: {
    loadContractor() {
      axios.defaults.headers.common['Authorization'] =
        this.$store.state.auth.tokenType + ' ' + this.$store.state.auth.token

      axios
        .get('/agreements')
        .then(response => {
          let formated = this.formatClients(response.data.data)
          this.confirmedClients = formated.confirmed
          this.unconfirmedClients = formated.unconfirmed
          this.initialized = true
        })
        .catch(error => {
          console.log(error)
        })
    },

    formatClients(clients) {
      let confirmed = []
      let unconfirmed = []

      clients.forEach(client => {
        let tmp = {
          id: client.id,
          company: client.company.company,
          city: client.company.city,
        }
        if (client.confirmed) {
          confirmed.push(tmp)
        } else {
          unconfirmed.push(tmp)
        }
      })

      return {
        confirmed: confirmed,
        unconfirmed: unconfirmed,
      }
    },

    confirmAgreement(id) {
      let response = confirm('Naozaj chcete schváliť danú žiadosť?')

      if (response) {
        axios.defaults.headers.common['Authorization'] =
          this.$store.state.auth.tokenType + ' ' + this.$store.state.auth.token

        axios
          .post('/agreements/' + id + '/confirm')
          .then(response => {
            this.restaurants = response.data.data
            this.flashSuccess('Klient bol schválený.', {
              timeout: 3000,
            })
            this.loadContractor()
          })
          .catch(error => {
            this.flashError(error.response.data.error)
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
obd-card {
  .unconfirmed {
    margin-bottom: 2em;
  }
}
</style>
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
        @unconfirm="unconfirmAgreement"
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
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať dodávateľa.',
            {
              timeout: 3000,
            },
          )
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

    unconfirmAgreement(id) {
      let response = confirm('Naozaj chcete zamietnúť danú žiadosť?')

      if (response) {
        axios
          .post('/agreements/' + id + '/unconfirm')
          .then(response => {
            this.flashSuccess('Klient bol zamietnutý.', {
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
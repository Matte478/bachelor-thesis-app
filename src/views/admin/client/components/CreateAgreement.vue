<template>
  <obd-card
    card-title="Zatiaľ nemáte žiadneho dodávateľa jedál"
    card-subtitle="Môžete si vybrať jedného z vášho mesta"
  >
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
import axios from 'axios'

export default {
  data() {
    return {
      restaurants: '',
      tableActions: [
        {
          text: 'Vybrať',
          action: 'selectContractor',
          color: '#f07b3f',
        },
      ],
      columns: [
        {
          key: 'restaurant',
          text: 'Reštaurácia',
        },
        {
          key: 'city',
          text: 'Mesto',
        },
      ],
    }
  },
  computed: {
    restaurantsStr() {
      return JSON.stringify(this.restaurants)
    },
  },
  created() {
    this.loadRestaurands()
  },
  methods: {
    action(e) {
      switch (e.detail.action) {
        case 'selectContractor':
          this.createAgreement(e.detail.id)
          break
      }
    },

    createAgreement(restaurantId) {
      let response = confirm('Naozaj chcete vybrať daného dodávateľa?')

      if (response) {
        axios.defaults.headers.common['Authorization'] =
          this.$store.state.auth.tokenType + ' ' + this.$store.state.auth.token

        axios
          .post('/agreements', {
            restaurant_id: restaurantId,
          })
          .then(response => {
            this.restaurants = response.data.data
            this.flashSuccess(
              'Dodávateľ bol zvolený. Teraz musíte počkať na schválenie.',
              {
                timeout: 3000,
              },
            )
            this.$emit('created-agreement')
          })
          .catch(error => {
            this.flashError(error.response.data.error)
          })
      }
    },

    loadRestaurands() {
      axios.defaults.headers.common['Authorization'] =
        this.$store.state.auth.tokenType + ' ' + this.$store.state.auth.token

      axios
        .get('/restaurants')
        .then(response => {
          this.restaurants = response.data.data
        })
        .catch(error => {
          console.log(error)
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať obsah stránky.<br>Skúste obnoviť stránku.',
          )
        })
    },
  },
}
</script>
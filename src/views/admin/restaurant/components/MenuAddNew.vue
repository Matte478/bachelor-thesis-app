<template>
  <obd-modal
    :active="active"
    @closed="closePopup"
    class="pop-up"
    modal-title="Pridať jedlo"
    modal-subtitle="Pridajte nové jedlo do ponuky"
  >
    <form
      class="form"
      action="#"
      @submit.prevent="addMeal"
    >
      <div class="form-group">
        <label for="meal">Názov jedla</label>
        <div class="input-group">
          <input
            type="text"
            name="meal"
            id="meal"
            class="input"
            v-model="newMeal.meal"
          >
        </div>
      </div>

      <div class="form-group">
        <label for="price">Cena v €</label>
        <div class="input-group">
          <input
            type="number"
            step="0.01"
            name="price"
            id="price"
            class="input"
            v-model="newMeal.price"
          >
        </div>
      </div>

      <div class="form-group">
        <obd-button
          type="submit"
          block
        >Pridať jedlo</obd-button>
      </div>
    </form>
  </obd-modal>
</template>

<script>
import axios from 'axios'

export default {
  props: ['active'],

  data() {
    return {
      newMeal: {},
    }
  },

  methods: {
    addMeal() {
      axios.defaults.headers.common['Authorization'] =
        this.$store.state.auth.tokenType + ' ' + this.$store.state.auth.token

      axios
        .post('/meals', {
          meal: this.newMeal.meal,
          price: this.newMeal.price,
        })
        .then(response => {
          this.flashSuccess('Jedlo bolo úspešne pridané.', {
            timeout: 3000,
          })
          this.$emit('added-meal', response.data.data)
        })
        .catch(error => {
          console.log(error)
          this.flashError('Niečo sa pokazilo, skúste to znova.', {
            timeout: 3000,
          })
          this.$emit('error')
        })
    },

    closePopup() {
      this.$emit('closed')
    },
  },
}
</script>
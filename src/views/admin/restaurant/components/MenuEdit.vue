<template>
  <obd-modal
    :active="active"
    @closed="closePopup"
    class="pop-up"
    modal-title="Upraviť jedlo"
    modal-subtitle="Upravte jedlo z ponuky"
  >
    <form
      class="form"
      action="#"
      @submit.prevent="editMeal(editableMeal.id)"
    >
      <div class="form-group">
        <label for="meal">Názov jedla</label>
        <div class="input-group">
          <input
            type="text"
            name="meal"
            id="meal"
            class="input"
            v-model="editableMeal.meal"
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
            v-model="editableMeal.price"
          >
        </div>
      </div>

      <div class="form-group">
        <obd-button
          type="submit"
          block
        >Upraviť jedlo</obd-button>
      </div>
    </form>
  </obd-modal>
</template>

<script>
import axios from 'axios'

export default {
  props: ['active', 'mealId'],

  data() {
    return {
      editableMeal: {},
    }
  },

  watch: {
    mealId() {
      this.loadMeal()
    },
  },

  methods: {
    closePopup() {
      this.$emit('closed')
    },

    loadMeal() {
      axios.defaults.headers.common['Authorization'] =
        this.$store.state.auth.tokenType + ' ' + this.$store.state.auth.token

      axios
        .get('/meals/' + this.mealId)
        .then(response => {
          this.editableMeal = response.data.data
        })
        .catch(error => {
          console.log(error)
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať obsah stránky.<br>Skúste obnoviť stránku.',
          )
        })
    },

    editMeal(mealId) {
      axios.defaults.headers.common['Authorization'] =
        this.$store.state.auth.tokenType + ' ' + this.$store.state.auth.token

      axios
        .post('/meals/' + mealId, this.editableMeal)
        .then(() => {
          this.$store.dispatch('fetchMeals').catch(e => {
            this.flashError(
              'Niečo sa pokazilo, nebolo možné načítať obsah stránky.<br>Skúste obnoviť stránku.',
            )
          })

          this.flashSuccess('Jedlo bolo úspešne upravené.', {
            timeout: 3000,
          })
          this.$emit('edited-meal')
        })
        .catch(error => {
          console.log(error)
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať obsah stránky.<br>Skúste obnoviť stránku.',
            {
              timeout: 3000,
            },
          )
          this.$emit('error')
        })
    },
  },
}
</script>
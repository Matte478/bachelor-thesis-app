<template>
  <obd-modal
    v-if="notEmptyObject(editableMeal)"
    :active="active"
    @closed="closePopup"
    class="pop-up"
    modal-title="Upraviť jedlo"
    modal-subtitle="Upravte jedlo z ponuky"
    max-width="500px"
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
            :class="{'error': hasError('meal')}"
            v-model="editableMeal.meal"
            @input="removeError"
          >
          <div
            v-if="hasError('meal')"
            class="error-message"
          > {{ firstError('meal') }} </div>
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
            :class="{'error': hasError('price')}"
            v-model="editableMeal.price"
            @input="removeError"
          >
          <div
            v-if="hasError('price')"
            class="error-message"
          > {{ firstError('price') }} </div>
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
import formMixin from '../../../../assets/mixins/formMixin'

export default {
  name: 'MenuEdit',
  props: ['active', 'mealId'],
  mixins: [formMixin],

  data() {
    return {
      editableMeal: {},
    }
  },

  watch: {
    active() {
      this.errors = {}
      this.loadMeal()
    },
  },

  methods: {
    closePopup() {
      this.$emit('closed')
      this.editableMeal = {}
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
        .put('/meals/' + mealId, this.editableMeal)
        .then(() => {
          this.$store.dispatch('fetchMeals')
          this.flashSuccess('Jedlo bolo úspešne upravené.', {
            timeout: 3000,
          })
          this.$emit('edited-meal')
        })
        .catch(error => {
          this.errors = error.response.data.errors
        })
    },
  },
}
</script>
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
            :class="{'error': hasError('meal')}"
            v-model="newMeal.meal"
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
            v-model="newMeal.price"
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
        > Pridať jedlo </obd-button>
      </div>
    </form>
  </obd-modal>
</template>

<script>
import axios from 'axios'
import formMixin from '../../../../assets/mixins/formMixin'

export default {
  name: 'MenuAddNew',
  props: ['active'],
  mixins: [formMixin],

  data() {
    return {
      newMeal: {},
    }
  },

  watch: {
    active() {
      this.errors = {}
    }
  },

  methods: {
    addMeal() {
      axios.defaults.headers.common['Authorization'] =
        this.$store.state.auth.tokenType + ' ' + this.$store.state.auth.token

      axios
        .post('/meals', this.newMeal)
        .then(response => {
          this.flashSuccess('Jedlo bolo úspešne pridané.', {
            timeout: 3000,
          })
          this.newMeal = {},
          this.$emit('added-meal', response.data.data)
        })
        .catch(error => {
          this.errors = error.response.data.errors
        })
    },

    closePopup() {
      this.$emit('closed')
    },
  },
}
</script>
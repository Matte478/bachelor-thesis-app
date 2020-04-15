<template>
  <obd-modal
    :active="active"
    @closed="closePopup"
    class="pop-up"
    modal-title="Pridať pracovný pomer"
    modal-subtitle="Pridajte nový druh pracovného pomeru a jeho príspevok"
    max-width="500px"
  >
    <form
      class="form"
      action="#"
      @submit.prevent="addType"
    >
      <div class="form-group">
        <label for="meal">Názov pracovného pomeru</label>
        <div class="input-group">
          <input
            type="text"
            name="name"
            id="name"
            class="input"
            :class="{'error': hasError('name')}"
            v-model="newType.name"
            @input="removeError"
          />
          <div
            v-if="hasError('name')"
            class="error-message"
          > {{ firstError('name') }} </div>
        </div>
      </div>

      <div class="form-group">
        <label for="price">Príspevok v €</label>
        <div class="input-group">
          <input
            type="number"
            step="0.01"
            name="contribution"
            id="contribution"
            class="input"
            :class="{'error': hasError('contribution')}"
            v-model="newType.contribution"
            @input="removeError"
          />
          <div
            v-if="hasError('contribution')"
            class="error-message"
          > {{ firstError('contribution') }} </div>
        </div>
      </div>
      <div class="form-group">
        <obd-button
          type="submit"
          block
        >Pridať pracovný pomer</obd-button>
      </div>
    </form>
  </obd-modal>
</template>

<script>
import formMixin from '../../../../assets/mixins/formMixin'

export default {
  name: 'TypeOfEmployeementsAddNew',
  props: ['active'],
  mixins: [formMixin],

  data() {
    return {
      newType: {},
    }
  },

  methods: {
    closePopup() {
      this.$emit('closed')
    },

    addType() {
      this.$store
        .dispatch('typeOfEmployments/submitTypeOfEmployment', this.newType)
        .then(response => {
          this.newType = {}
          this.flashSuccess('Nový pracovný pomer bol úspešne pridaný.', {
            timeout: 3000,
          })
          this.$emit('added-new-type', response)
        })
        .catch(errors => {
          this.errors = errors
        })
    },
  },
}
</script>
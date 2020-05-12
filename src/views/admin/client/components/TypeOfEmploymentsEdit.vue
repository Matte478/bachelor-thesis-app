<template>
  <obd-modal
    v-if="notEmptyObject(editableType)"
    :active="active"
    @closed="closePopup"
    class="pop-up"
    modal-title="Upraviť pracovný pomer"
    modal-subtitle="Upravte existujúci pracovný pomer"
    max-width="500px"
  >
    <form
      class="form"
      action="#"
      @submit.prevent="editType"
    >
      <div class="form-group">
        <label for="meal">Názov jedla</label>
        <div class="input-group">
          <input
            type="text"
            name="name"
            id="name"
            class="input"
            :class="{'error': hasError('name')}"
            v-model="editableType.name"
            @input="removeError"
          />
          <div
            v-if="hasError('name')"
            class="error-message"
          > {{ firstError('name') }} </div>
        </div>
      </div>

      <div class="form-group">
        <label for="price">Cena v €</label>
        <div class="input-group">
          <input
            type="number"
            step="0.01"
            name="contribution"
            id="contribution"
            class="input"
            :class="{'error': hasError('contribution')}"
            v-model="editableType.contribution"
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
        > Upraviť pracovný pomer </obd-button>
      </div>
    </form>
  </obd-modal>
</template>

<script>
import formMixin from '../../../../assets/mixins/formMixin'

export default {
  name: 'TypeOfEmployeementsAddNew',
  props: ['active', 'typeId'],
  mixins: [formMixin],

  data() {
    return {
      editableType: {},
    }
  },

  watch: {
    active() {
      if (!this.active) return
      this.loadType()
    },
  },

  methods: {
    closePopup() {
      this.errors = {}
      this.editableType = {}
      this.$emit('closed')
    },

    loadType() {
      this.$store
        .dispatch('typeOfEmployments/fetchTypeOfEmployments', this.typeId)
        .then(() => {
          this.editableType = this.$store.getters[
            'typeOfEmployments/getTypeOfEmployments'
          ]
        })
        .catch(e => {
          this.flashError('Niečo sa pokazilo.', {
            timeout: 3000,
          })
        })
    },

    editType() {
      this.$store
        .dispatch('typeOfEmployments/editTypeOfEmployment', this.editableType)
        .then(() => {
          this.flashSuccess('Pracovný pomer bol úspešne upravený.', {
            timeout: 3000,
          })
          this.$emit('edited-type')
        })
        .catch(errors => {
          this.errors = errors
        })
    },
  },
}
</script>
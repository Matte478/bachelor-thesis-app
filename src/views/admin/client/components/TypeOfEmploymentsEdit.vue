<template>
  <obd-modal
    :active="active"
    @closed="closePopup"
    class="pop-up"
    modal-title="Upraviť pracovný pomer"
    modal-subtitle="Upravte existujúci pracovný pomer"
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
            v-model="editableType.name"
          />
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
            v-model="editableType.contribution"
          />
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
export default {
  props: ['active', 'typeId'],

  data() {
    return {
      editableType: {},
    }
  },

  watch: {
    typeId() {
      this.loadType()
    },
  },

  methods: {
    closePopup() {
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
          this.flashError('Niečo sa pokazilo.')
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
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné upraviť pracovný pomer.',
          )
          this.$emit('error')
        })
    },
  },
}
</script>
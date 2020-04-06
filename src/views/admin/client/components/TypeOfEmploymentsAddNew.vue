<template>
  <obd-modal
    :active="active"
    @closed="closePopup"
    class="pop-up"
    modal-title="Pridať pracovný pomer"
    modal-subtitle="Pridajte nový druh pracovného pomeru a jeho príspevok"
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
            v-model="newType.name"
          />
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
            v-model="newType.contribution"
          />
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
export default {
  props: ['active'],

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
        .then(() => {
          this.newType = {}
          this.flashSuccess('Nový pracovný pomer bol úspešne pridaný.', {
            timeout: 3000,
          })
          this.$emit('added-new-type')
        })
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné pridať nový pracovný pomer.',
          )
          this.$emit('error')
        })
    },
  }
}
</script>
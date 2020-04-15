<template>
  <section class="section">
    <type-of-employments-add-new
      :active="newTypePopup"
      @closed="closePopup"
      @added-new-type="addedNewType"
    />

    <type-of-employments-edit
      :active="editTypePopup"
      :typeId="editableId"
      @closed="closeEditPopup"
      @edited-type="editedType"
      @error="closeEditPopup"
    />

    <obd-card
      v-if="initialized"
      card-title="Pracovné pomery"
      card-subtitle="Zoznam pracovných pomerov a ich príspevkov na obedy"
    >
      <div slot="controls">
        <obd-button @click="togglePopup">Pridať pracovný pomer</obd-button>
      </div>
      
      <type-of-employments-table
        :type-of-employments="typeOfEmployments"
        @edit="openEdit"
        @delete="deleteType"
      />
    </obd-card>
  </section>
</template>

<script>
import axios from 'axios'
import typeOfEmploymentsTable from './components/TypeOfEmploymentsTable'
import typeOfEmploymentsAddNew from './components/TypeOfEmploymentsAddNew'
import typeOfEmploymentsEdit from './components/TypeOfEmploymentsEdit'

export default {
  components: {
    typeOfEmploymentsTable,
    typeOfEmploymentsAddNew,
    typeOfEmploymentsEdit,
  },

  data() {
    return {
      initialized: false,
      typeOfEmployments: [],
      newTypePopup: false,
      newType: {},

      editTypePopup: false,
      editableId: '',
    }
  },

  created() {
    this.loadTypeOfEmployments()
  },

  methods: {
    openEdit(id) {
      this.editableId = id
      this.editTypePopup = true
    },

    addedNewType(type) {
      this.typeOfEmployments.push(type)
      this.closePopup()
    },

    editedType() {
      this.loadTypeOfEmployments()
      this.closeEditPopup()
    },

    loadTypeOfEmployments() {
      this.$store
        .dispatch('typeOfEmployments/fetchTypeOfEmployments')
        .then(() => {
          this.typeOfEmployments = this.$store.getters[
            'typeOfEmployments/getTypeOfEmployments'
          ]
          this.initialized = true
        })
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať objednávky.<br>Skúste obnoviť stránku.',
          )
        })
    },

    togglePopup() {
      this.newTypePopup = !this.newTypePopup
    },
    closePopup() {
      this.newTypePopup = false
    },
    closeEditPopup() {
      this.editTypePopup = false
    },

    deleteType(typeId) {
      let response = confirm('Naozaj chcete vymazať daný pracovný pomer?')
      if (response) {
        this.$store
          .dispatch('typeOfEmployments/deleteTypeOfEmployment', typeId)
          .then(() => {
            let typeOfEmployments = this.typeOfEmployments.filter(
              type => type.id != typeId,
            )
            this.typeOfEmployments = typeOfEmployments

            this.flashSuccess('Pracovný pomer bol vymazaný.', {
              timeout: 3000,
            })
          })
          .catch(e => {
            this.flashError(
              'Niečo sa pokazilo, nebolo možné vymazať pracovný pomer.',
            )
          })
      }
    },
  },
}
</script>
<template>
  <section class="section">
    <type-of-employments-add-new
      :active="newTypePopup"
      @closed="closePopup"
      @added-new-type="addedNewType"
      @error="closePopup"
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
      <obd-table
        class="day-box__table"
        :data="JSON.stringify(typeOfEmployments)"
        :columns="JSON.stringify(columns)"
        :actions="JSON.stringify(tableActions)"
        @action="action"
      />
    </obd-card>
  </section>
</template>

<script>
import axios from 'axios'
import typeOfEmploymentsAddNew from './components/TypeOfEmploymentsAddNew'
import typeOfEmploymentsEdit from './components/TypeOfEmploymentsEdit'

export default {
  components: {
    typeOfEmploymentsAddNew,
    typeOfEmploymentsEdit,
  },

  data() {
    return {
      initialized: false,
      typeOfEmployments: [],
      newTypePopup: false,
      newType: {
        name: '',
        contribution: '',
      },

      editTypePopup: false,
      editableId: '',

      columns: [
        {
          key: 'name',
          text: 'Druh pracovného pomeru',
        },
        {
          key: 'contribution',
          text: 'Príspevok v €',
        },
      ],
      tableActions: [
        {
          text: '',
          action: 'edit',
          icon: 'fas fa-edit',
          color: '#2d4059',
        },
        {
          text: '',
          action: 'delete',
          icon: 'fas fa-trash-alt',
          color: '#ea5455',
        },
      ],
    }
  },

  created() {
    this.loadTypeOfEmployments()
  },

  methods: {
    action(e) {
      switch (e.detail.action) {
        case 'edit':
          this.editableId = e.detail.id
          this.editTypePopup = true
          break
        case 'delete':
          this.deleteType(e.detail.id)
          break
      }
    },

    addedNewType() {
      this.loadTypeOfEmployments()
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

<style lang="scss" scoped>
.pop-up {
  max-width: 500px;
}
</style>
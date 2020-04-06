<template>
  <section class="section">
    <obd-modal
      :active="newTypePopup"
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

    <obd-modal
      :active="editTypePopup"
      @closed="closeEditPopup"
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

export default {
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
      editableType: {
        id: '',
        name: '',
        contribution: '',
      },

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
          this.openEditPopup(e.detail.id)
          break
        case 'delete':
          this.deleteType(e.detail.id)
          break
      }
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
      document.body.classList.toggle('overlay')
    },
    closePopup() {
      this.newTypePopup = false
    },

    addType() {
      this.$store
        .dispatch('typeOfEmployments/submitTypeOfEmployment', this.newType)
        .then(() => {
          this.loadTypeOfEmployments()
          this.newType.name = ''
          this.newType.contribution = ''
          this.flashSuccess('Nový pracovný pomer bol úspešne pridaný.', {
            timeout: 3000,
          })
        })
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné pridať nový pracovný pomer.',
          )
        })

      this.togglePopup()
    },

    openEditPopup(typeId) {
      this.$store
        .dispatch('typeOfEmployments/fetchTypeOfEmployments', typeId)
        .then(() => {
          this.editableType = this.$store.getters[
            'typeOfEmployments/getTypeOfEmployments'
          ]
          document.body.classList.add('overlay')
          this.editTypePopup = true
        })
        .catch(e => {
          this.flashError('Niečo sa pokazilo.')
        })
    },

    editType(typeId) {
      this.$store
        .dispatch('typeOfEmployments/editTypeOfEmployment', this.editableType)
        .then(() => {
          this.loadTypeOfEmployments()
          this.flashSuccess('Pracovný pomer bol úspešne upravený.', {
            timeout: 3000,
          })
        })
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné upraviť pracovný pomer.',
          )
        })

      this.toggleEditPopup()
    },

    toggleEditPopup() {
      this.editTypePopup = !this.editTypePopup
      document.body.classList.toggle('overlay')
    },
    closeEditPopup() {
      this.editTypePopup = false
      document.body.classList.remove('overlay')
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
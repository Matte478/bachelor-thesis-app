<template>
  <section class="section section--admin">
    <menu-add-new
      :active="newMealPopup"
      @closed="closePopup"
      @added-meal="addedMeal"
    />

    <menu-edit
      :active="editMealPopup"
      :mealId="editableId"
      @closed="closeEditPopup"
      @edited-meal="editedMeal"
    />

    <obd-card
      card-title="Menu"
      v-if="initialized"
    >
      <div slot="controls">
        <obd-button @click="togglePopup">Pridať jedlo</obd-button>
      </div>

      <obd-table-menu
        :meals="JSON.stringify(meals)"
        @edit="openEditPopup"
        @delete="deleteMeal"
        v-if="meals.length"
      />
      <h3 v-else>Nemáte žiadne jedlo v ponuke</h3>
    </obd-card>
  </section>
</template>

<script>
import axios from 'axios'
// import MenuTable from './components/MenuTable'
import MenuAddNew from './components/MenuAddNew'
import MenuEdit from './components/MenuEdit'

export default {
  name: 'menuPage',
  components: {
    // MenuTable,
    MenuAddNew,
    MenuEdit,
  },

  data() {
    return {
      initialized: false,
      meals: [],

      newMealPopup: false,

      editMealPopup: false,
      editableId: '',
    }
  },

  mounted() {
    this.loadMeals()
  },
  methods: {
    loadMeals() {
      this.$store
        .dispatch('fetchMeals')
        .then(() => {
          this.meals = this.$store.getters.getMeals
          this.initialized = true
        })
        .catch(e => {
          this.flashError(
            'Niečo sa pokazilo, nebolo možné načítať obsah stránky.<br>Skúste obnoviť stránku.',
            {
              timeout: 3000,
            },
          )
        })
    },

    togglePopup() {
      this.newMealPopup = !this.newMealPopup
    },

    closePopup() {
      this.newMealPopup = false
    },

    toggleEditPopup() {
      this.editMealPopup = !this.editMealPopup
    },

    addedMeal(meal) {
      this.meals.push(meal)
      this.closePopup()
    },

    editedMeal() {
      this.loadMeals()
      this.editMealPopup = false
    },

    openEditPopup(e) {
      this.editableId = e.detail
      this.editMealPopup = true
    },

    closeEditPopup() {
      this.editMealPopup = false
    },

    deleteMeal(e) {
      const mealId = e.detail
      let response = confirm('Naozaj chcete vymazať dané jedlo?')
      if (response) {
        axios.defaults.headers.common['Authorization'] =
          this.$store.state.auth.tokenType + ' ' + this.$store.state.auth.token

        axios
          .delete('/meals/' + mealId)
          .then(() => {
            let meals = this.meals.filter(meal => meal.id != mealId)
            this.meals = meals

            this.flashSuccess('Jedlo bolo úspešne zmazané.', {
              timeout: 3000,
            })
          })
          .catch(error => {
            this.flashError('Niečo sa pokazilo, skúste to znova.', {
              timeout: 3000,
            })
          })
      }
    },
  },
}
</script>
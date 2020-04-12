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

      <menu-table
        :meals="meals"
        @edit="openEditPopup"
        @delete="deleteMeal"
      />
    </obd-card>
  </section>
</template>

<script>
import axios from 'axios'
import MenuTable from './components/MenuTable'
import MenuAddNew from './components/MenuAddNew'
import MenuEdit from './components/MenuEdit'

export default {
  components: {
    MenuTable,
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
  computed: {
    mealsStr() {
      return JSON.stringify(this.meals)
    },
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

    openEditPopup(mealId) {
      this.editableId = mealId
      this.editMealPopup = true
    },

    closeEditPopup() {
      this.editMealPopup = false
    },

    deleteMeal(mealId) {
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
            console.log(error)
            this.flashError('Niečo sa pokazilo, skúste to znova.', {
              timeout: 3000,
            })
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.pop-up {
  position: fixed;
  display: block;
  z-index: 150;
  width: 90%;
  max-width: 500px;
  left: 50%;
  top: calc(50vh - 62px);
  transform: translate(-50%, -50%);
  visibility: visible;
}
</style>
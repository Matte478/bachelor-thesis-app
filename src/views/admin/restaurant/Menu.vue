<template>
    <div class="section section--admin">
        <obd-modal :active="newMealPopup" @closed="closePopup" class="pop-up" card-title="Pridať jedlo" card-subtitle="Pridajte nové jedlo do ponuky">
            <form class="form" action="#" @submit.prevent="addMeal">
                <div class="form-group">
                    <label for="meal">Názov jedla</label>
                    <div class="input-group">
                        <input type="text" name="meal" id="meal" class="input" v-model="newMeal.meal">
                    </div>
                </div>

                <div class="form-group">
                    <label for="price">Cena v €</label>
                    <div class="input-group">
                        <input type="number" step="0.01" name="price" id="price" class="input" v-model="newMeal.price">
                    </div>
                </div>

                <div class="form-group">
                    <obd-button type="submit">Pridať jedlo</obd-button>
                </div>
            </form>
        </obd-modal>

        <obd-modal :active="editMealPopup" @closed="closeEditPopup" class="pop-up" card-title="Upraviť jedlo" card-subtitle="Upravte jedlo z ponuky.">
            <form class="form" action="#" @submit.prevent="editMeal(editableMeal.id)">
                <div class="form-group">
                    <label for="meal">Názov jedla</label>
                    <div class="input-group">
                        <input type="text" name="meal" id="meal" class="input" v-model="editableMeal.meal">
                    </div>
                </div>

                <div class="form-group">
                    <label for="price">Cena v €</label>
                    <div class="input-group">
                        <input type="number" step="0.01" name="price" id="price" class="input" v-model="editableMeal.price">
                    </div>
                </div>

                <div class="form-group">
                    <obd-button type="submit">Upraviť jedlo</obd-button>
                </div>
            </form>
        </obd-modal>

        <div class="row">
            <div class="col-12">
                <obd-button @click="togglePopup">Pridať jedlo</obd-button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <obd-card card-title="Menu">
                    <ul>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Názov jedla</th>
                                    <th>Cena</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="meal in meals" v-bind:key="meal.id">
                                    <td>{{meal.id}}</td>
                                    <td>{{meal.meal}}</td>
                                    <td>{{meal.price}} €</td>
                                    <td class="action">
                                        <button href="#" class="action__edit" title="Upraviť" @click="openEditPopup(meal.id)">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="action__delete" title="Vymazať" @click="deleteMeal(meal.id)">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </ul>
                </obd-card>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            meals: [],
            
            newMealPopup: false,
            newMeal: {
                meal: '',
                price: '', 
            },

            editMealPopup: false,
            editableMeal: {
                id: '',
                meal: '',
                price: '',
            }
        }
    },
    mounted() {
        this.loadMeals();
    },
    methods: {
        togglePopup() {
            this.newMealPopup = !this.newMealPopup;
            document.body.classList.toggle('overlay');
        },

        closePopup() {
            this.newMealPopup = false;
        },

        toggleEditPopup() {
            this.editMealPopup = !this.editMealPopup;
            document.body.classList.toggle('overlay');
        },

        openEditPopup(mealId) {
            axios.defaults.headers.common['Authorization'] = this.$store.state.tokenType + ' ' + this.$store.state.token;

            axios.get('/meals/' + mealId)
            .then(response => {
                let loadedMeal = response.data.data;
                
                this.editableMeal.id = loadedMeal.id;
                this.editableMeal.meal = loadedMeal.meal;
                this.editableMeal.price = loadedMeal.price;
                
                document.body.classList.add('overlay');
                this.editMealPopup = true;
            })
            .catch(error => {
                console.log(error);
                this.flashError('Niečo sa pokazilo, nebolo možné načítať obsah stránky.<br>Skúste obnoviť stránku.');
            })
        },

        closeEditPopup() {
            this.editMealPopup = false;
            document.body.classList.remove('overlay');
        },

        loadMeals() {
           axios.defaults.headers.common['Authorization'] = this.$store.state.tokenType + ' ' + this.$store.state.token;

            axios.get('/meals')
            .then(response => {
                this.meals = response.data.data;
            })
            .catch(error => {
                console.log(error);
                this.flashError('Niečo sa pokazilo, nebolo možné načítať obsah stránky.<br>Skúste obnoviť stránku.');
            })
        },

        addMeal() {
           axios.defaults.headers.common['Authorization'] = this.$store.state.tokenType + ' ' + this.$store.state.token;

            axios.post('/meals', {
                meal: this.newMeal.meal,
                price: this.newMeal.price,
            })
            .then(() => {
                this.loadMeals();
                this.togglePopup();
                this.flashSuccess('Jedlo bolo úspešne pridané.', {
                    timeout: 3000,
                });
            })
            .catch(error => {
                console.log(error)
                this.flashError('Niečo sa pokazilo, skúste to znova.', {
                    timeout: 3000,
                });
            })
        },

        editMeal(mealId) {
            axios.defaults.headers.common['Authorization'] = this.$store.state.tokenType + ' ' + this.$store.state.token;

            axios.post('/meals/' + mealId, this.editableMeal)
            .then(() => {
                this.loadMeals();

                this.flashSuccess('Jedlo bolo úspešne upravené.', {
                    timeout: 3000,
                });
            })
            .catch(error => {
                console.log(error);
                this.flashError('Niečo sa pokazilo, nebolo možné načítať obsah stránky.<br>Skúste obnoviť stránku.', {
                    timeout: 3000,
                });
            })

            this.closeEditPopup();
        },

        deleteMeal(mealId) {
            let response = confirm(`Naozaj chcete vymazať dané jedlo?`);
            if(response) {
                axios.defaults.headers.common['Authorization'] = this.$store.state.tokenType + ' ' + this.$store.state.token;

                axios.delete('/meals/' + mealId)
                .then(() => {
                    let meals = this.meals.filter(meal => meal.id != mealId);
                    this.meals = meals;

                    this.flashSuccess('Jedlo bolo úspešne zmazané.', {
                        timeout: 3000,
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.flashError('Niečo sa pokazilo, skúste to znova.', {
                        timeout: 3000,
                    });
                })
            }
        }
    }
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

.section--admin {
    position: relative;
    padding: 20px 0;
}
table {
    width: 100%;
    display: table;
    border-collapse: collapse;
    border-spacing: 0;

    tr {
        border-bottom: 1px solid $color-border-light;

        &:hover {
            background-color: rgba($color-primary-3, 0.1);
        }

        td,
        th {
            padding: 15px 5px;
            display: table-cell;
            text-align: left;
            vertical-align: middle;
            border-radius: 2px;

            &.action {
                width: 100px;
                .action__edit,
                .action__delete {
                    padding: 8px;
                    margin-right: 8px;
                    border-radius: 5px;
                    border: none;
                    color: #fff;
                    transition: all 0.1s ease-in-out;
                    cursor: pointer;

                    &:last-of-type {
                    margin-right: 0;
                    }

                    &:focus {
                        outline: none;
                    }
                }

                .action__edit {
                    background-color: $color-primary-1;
                    
                    &:hover {
                        background-color: lighten($color: $color-primary-1, $amount: 10%);
                    }
                }
                .action__delete {
                    background-color: $color-primary-2;

                    &:hover {
                        background-color: darken($color: $color-primary-2, $amount: 10%);
                    }
                }
            }
        }
    }
}
</style>
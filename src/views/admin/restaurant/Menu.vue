<template>
    <section class="section section--admin">
        <obd-modal :active="newMealPopup" @closed="closePopup" class="pop-up" modal-title="Pridať jedlo" modal-subtitle="Pridajte nové jedlo do ponuky">
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
                    <obd-button type="submit" block>Pridať jedlo</obd-button>
                </div>
            </form>
        </obd-modal>

        <obd-modal :active="editMealPopup" @closed="closeEditPopup" class="pop-up" modal-title="Upraviť jedlo" modal-subtitle="Upravte jedlo z ponuky.">
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
                    <obd-button type="submit" block>Upraviť jedlo</obd-button>
                </div>
            </form>
        </obd-modal>

        <div class="row">
            <div class="col-12">
                <obd-card card-title="Menu">
                    <div slot="controls">
                        <obd-button @click="togglePopup">Pridať jedlo</obd-button>
                    </div>
                    <obd-table
                        v-if="meals"
                        :data="mealsStr"
                        :columns="JSON.stringify(columns)"
                        :actions="JSON.stringify(tableActions)"
                        @action="action"
                    />
                </obd-card>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            meals: [],
            tableActions: [
                {
                    "text": "",
                    "action": "edit",
                    "icon": "fas fa-edit",
                    "color": "#2d4059"
                },
                {
                    "text": "",
                    "action": "delete",
                    "icon": "fas fa-trash-alt",
                    "color": "#ea5455"
                }
            ],
            columns: [
                {
                    "key": "id",
                    "text": "ID"
                },
                {
                    "key": "meal",
                    "text": "Názov jedla"
                },
                {
                    "key": "price",
                    "text": "Cena v €"
                },
            ],
            
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
    computed: {
        mealsStr() {
            return JSON.stringify(this.meals)
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

        action(e) {
            switch(e.detail.action) {
                case 'edit': 
                    this.openEditPopup(e.detail.id);
                    break;
                case 'delete':
                    this.deleteMeal(e.detail.id);
                    break;
            }
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
            .then(response => {
                this.meals.push(response.data.data);
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
                text-align: right;
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
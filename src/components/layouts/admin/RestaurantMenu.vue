<template>
    <div class="section section--admin">
        <obd-modal active class="pop-up" :class="{active: newMealPopup}" card-title="Pridať jedlo" card-subtitle="Pridajte nové jedlo do ponuky">
            <form class="form" action="#" @submit.prevent="addMeal">
                <div class="form-group">
                    <label for="meal">Názov jedla</label>
                    <div class="input-group">
                        <input type="text" name="meal" id="meal" class="input" v-model="newMealName">
                    </div>
                </div>

                <div class="form-group">
                    <label for="price">Cena v €</label>
                    <div class="input-group">
                        <input type="number" step="0.01" name="price" id="price" class="input" v-model="newMealPrice">
                    </div>
                </div>

                <div class="form-group">
                    <obd-button type="submit">Pridať jedlo</obd-button>
                </div>
            </form>
        </obd-modal>

        <div class="row">
            <div class="col-12">
                <obd-button @click="openPopup">Pridať jedlo</obd-button>
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="meal in meals" v-bind:key="meal.id">
                                    <td>{{meal.id}}</td>
                                    <td>{{meal.meal}}</td>
                                    <td>{{meal.price}} €</td>
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
            newMealName: '',
            newMealPrice: '',
        }
    },
    mounted () {
        axios.defaults.headers.common['Authorization'] = this.$store.state.tokenType + ' ' + this.$store.state.token;

        axios.get('/meals')
        .then(response => {
            this.meals = response.data.data;
            // resolve(response);
        })
        .catch(error => {
            console.log(error)
            // reject(error);
        })
    },
    methods: {
        openPopup() {
            console.log('open popup');
            this.newMealPopup = !this.newMealPopup;
            document.body.classList.toggle('overlay');
        },

        addMeal() {
           axios.defaults.headers.common['Authorization'] = this.$store.state.tokenType + ' ' + this.$store.state.token;

        axios.post('/meals', {
            meal: this.newMealName,
            price: this.newMealPrice,
        })
        .then(() => {
            this.meals.push({
                meal: this.newMealName,
                price: this.newMealPrice
            });
            this.openPopup();
            this.flashSuccess('Jedlo bolo úspešne pridané.', {
                timeout: 3000,
            });
            // resolve(response);
        })
        .catch(error => {
            console.log(error)
            this.flashError('Niečo sa pokazilo, skúste to znova.', {
                timeout: 3000,
            });
        }) 
        }
    }
}
</script>

<style lang="scss" scoped>

.pop-up {
    position: absolute;
    display: block;
    z-index: 150;
    width: 90%;
    max-width: 500px;
    left: 50%;
    top: calc(50vh - 62px);
    transform: translate(-50%, -50%);

    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out;

    &.active {
        visibility: visible;
        opacity: 1;
    }
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
        }
    }
}
</style>
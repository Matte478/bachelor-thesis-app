<template>
    <div class="section section--admin">
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
        }
    },
    mounted () {
        axios.defaults.headers.common['Authorization'] = this.$store.state.tokenType + ' ' + this.$store.state.token;
        console.log(this.$store.state.tokenType + ' ' + this.$store.state.token);

        axios.get('/meals')
        .then(response => {
            this.meals = response.data.data;
            // resolve(response);
        })
        .catch(error => {
            console.log(error)
            // reject(error);
        })
    }
}
</script>

<style lang="scss" scoped>
.section--admin {
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
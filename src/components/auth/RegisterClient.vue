<template>
        <section class="d-flex justify-content-center align-items-center section section--register">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-sm-10">
                    <form class="form" action="#" @submit.prevent="registerClient">
                        <div class="form__header">
                            <h2 class="form__header_title">Registrácia spoločnosti</h2>
                            <p class="form__header_subtitle">Registrujte vašu spoločnosť</p>
                        </div>
                        <div class="form__body">
                            <div class="row justify-content-around">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <p class="desc">Informácie o Vás</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="name">Meno a priezvisko</label>
                                        <div class="input-group">
                                            <input type="text" name="name" id="name" class="input" v-model="name">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="email">E-Mail</label>
                                        <div class="input-group">
                                            <input type="email" name="email" id="email" class="input" v-model="email">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="password">Heslo</label>
                                        <div class="input-group">
                                            <input type="password" name="password" id="password" class="input" v-model="password">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="password">Potvrdenie hesla</label>
                                        <div class="input-group">
                                            <input type="password" name="password_confirmation" id="password_confirmation" class="input" v-model="password_confirmation">
                                        </div>
                                    </div>
                                </div>
                            
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <p class="desc">Informácie o Vašej spoločnosti</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="name">Názov spoločnosti</label>
                                        <div class="input-group">
                                            <input type="text" name="company" id="company" class="input" v-model="company">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="name">Mesto</label>
                                        <div class="input-group">
                                            <input type="text" name="city" id="city" class="input" v-model="city">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn">Registrácia</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            company: '',
            city: '',
        }
    },
    methods: {
        registerClient() {
            this.$store.dispatch('registerClient', {
               name: this.name,
               email: this.email,
               password: this.password,
               password_confirmation: this.password_confirmation,
               company: this.company,
               city: this.city,
            })
            .then(() => {
                this.$router.push({ name: 'login' });
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.section--register {
    min-height: calc(100vh - 62px);
}

</style>
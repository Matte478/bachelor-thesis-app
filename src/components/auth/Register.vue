<template>
    <section class="d-flex justify-content-center align-items-center section section--register">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-sm-10">
                    <form class="form" action="#" @submit.prevent="registerContractor">
                        <div class="form__header">
                            <h2 class="form__header_title">Registrácia reštaurácie</h2>
                            <p class="form__header_subtitle">Registrujte vašu reštauráciu</p>
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
                                            <input type="email" name="contactor_email" id="contactor_email" class="input" v-model="contactor_email">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="password">Heslo</label>
                                        <div class="input-group">
                                            <input type="password" name="contactor_password" id="contactor_password" class="input" v-model="contactor_password">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="password">Potvrdenie hesla</label>
                                        <div class="input-group">
                                            <input type="password" name="contactor_password_confirmation" id="contactor_password_confirmation" class="input" v-model="contactor_password_confirmation">
                                        </div>
                                    </div>
                                </div>
                            
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <p class="desc">Informácie o Vašej reštaurácii</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="name">Názov reštaurácie</label>
                                        <div class="input-group">
                                            <input type="text" name="contactor_restaurant" id="contactor_restaurant" class="input" v-model="contactor_restaurant">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="name">Mesto</label>
                                        <div class="input-group">
                                            <input type="text" name="contactor_city" id="contactor_city" class="input" v-model="contactor_city">
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
                                        <label for="name">Meno a priezvisko</label>
                                        <div class="input-group">
                                            <input type="text" name="name" id="name" class="input" v-model="name">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="email">E-Mail</label>
                                        <div class="input-group">
                                            <input type="email" name="contactor_email" id="contactor_email" class="input" v-model="contactor_email">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="password">Heslo</label>
                                        <div class="input-group">
                                            <input type="password" name="contactor_password" id="contactor_password" class="input" v-model="contactor_password">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="password">Potvrdenie hesla</label>
                                        <div class="input-group">
                                            <input type="password" name="contactor_password_confirmation" id="contactor_password_confirmation" class="input" v-model="contactor_password_confirmation">
                                        </div>
                                    </div>
                                </div>
                            
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="name">Názov reštaurácie</label>
                                        <div class="input-group">
                                            <input type="text" name="contactor_restaurant" id="contactor_restaurant" class="input" v-model="contactor_restaurant">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="name">Mesto</label>
                                        <div class="input-group">
                                            <input type="text" name="contactor_city" id="contactor_city" class="input" v-model="contactor_city">
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
}
</script>

<style lang="scss" scoped>
    .section--register {
        min-height: calc(100vh - 62px);
    }

    .form {
        margin-bottom: 2em;
    }
</style>
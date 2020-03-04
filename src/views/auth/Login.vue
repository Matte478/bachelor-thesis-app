<template>
    <section class="d-flex justify-content-center align-items-center section section--login">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-sm-5">
                    <obd-card card-title="Prihlásenie" card-subtitle="Prihlásenie do účtu">
                        <form class="form" action="#" @submit.prevent="login">
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
                                <obd-button type="submit" block>Prihlásenie</obd-button>
                            </div>
                        </form>
                    </obd-card>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
           this.$store.dispatch('retrieveToken', {
               email: this.email,
               password: this.password,
           })
           .then(() => {
               this.$router.push({ name: 'admin' });
               this.flashSuccess('Boli ste úspešne prihlásený.', {
                    timeout: 3000,
                });
           })
        }
    }
}
</script>

<style lang="scss">
.section--login {
    min-height: calc(100vh - 62px);
}

.form-group {
    margin-bottom: 1.7em;

    label,
    .desc {
        text-transform: uppercase;
        font-weight: bold;
    }

    .desc {
        position: relative;
        display: inline-block;
        @include font-size(16);

        &:after {
            @include pseudo();
            bottom: 0;
            height: 1px;
            width: 50%;
            background-color: $color-primary-1;
        }
    }

    .input-group {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        width: 100%;

        .input {
            width: 100%;
            border: 1px solid $color-border;
            border-radius: 4px;
            padding: 1rem 0.75rem;
            height: 35px;

            &:focus {
                border: 1px solid $color-primary-1;
                outline: none;
            }
        }
    }
}
</style>
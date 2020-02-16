<template>
    <section class="d-flex justify-content-center align-items-center section section--login">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-sm-5">
                    <form class="form" action="#" @submit.prevent="login">
                        <div class="form__header">
                            <h1 class="form__header_title">Prihlásenie</h1>
                            <p class="form__header_subtitle">Prihlásenie do účtu</p>
                        </div>
                        <div class="form__body">
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
                                <button type="submit" class="btn">Prihlásenie</button>
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
               this.$router.push({ name: 'home' });
           })
        }
    }
}
</script>

<style lang="scss">
.section--login {
    min-height: calc(100vh - 62px);
}

.form {
    position: relative;
    background-color: $color-white;
    box-shadow: $box-shadow;
    border-radius: 5px;

    &__header {
        padding: 30px;
        border-bottom: 1px solid $color-border-light;

        &_title {
            text-transform: uppercase;
            color: $color-primary-1;
            @include font-size(25);
            font-weight: bold;
            margin-bottom: 0.4em;
        }
        &_subtitle {
            text-transform: uppercase;
            font-weight: bold;
            color: $color-text;
            @include font-size(14);
            letter-spacing: 0;
            margin-bottom: 0;  
        }
    }

    &__body {
        padding: 30px
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
}

.btn {
    display: block;
    width: 100%;
    font-weight: 400;
    color: $color-white;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375em 0.75em;
    @include font-size(14, 21);
    border-radius: 4px;
    background-color: $color-primary-3;
    transition: background-color 0.1s ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: darken($color-primary-3, 5%);
    }
}
</style>
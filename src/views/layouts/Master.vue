<template>
    <div id="app">
        <nav class="nav">
            <div class="nav__inner">
                <router-link to="/" class="logo">Obedovač</router-link>
                <ul>
                    <li><router-link :to="{ name: 'home' }" exact>Domov</router-link></li>
                    <li v-if="loggedIn && (userType == 'client')"><router-link :to="{ name: 'orders' }" exact>Obedy</router-link></li>
                    <li v-if="!loggedIn"><router-link :to="{ name: 'login' }">Prihlásenie <i class="fas fa-sign-in-alt"></i></router-link></li>
                    <li v-if="!loggedIn" class="has-dropdown">
                        <span>
                            Registrácia
                            <div class="dropdown">
                                <div class="dropdown__content">
                                    <ul>
                                        <li v-if="!loggedIn"><router-link :to="{ name: 'register-client' }">Pre&nbsp;spoločnosti</router-link></li>
                                        <li v-if="!loggedIn"><router-link :to="{ name: 'register-contractor' }">Pre&nbsp;reštaurácie</router-link></li> 
                                    </ul>
                                </div>
                            </div>
                        </span>
                    </li>
                    <li v-if="loggedIn"><router-link :to="{ name: 'admin' }">Administrácia</router-link></li>
                    <li v-if="loggedIn"><router-link :to="{ name: 'logout' }">Odhlásiť <i class="fas fa-sign-out-alt"></i></router-link></li>
                </ul>
            </div>
        </nav>
        <router-view></router-view>
        <flash-message class="flash-message"></flash-message>
    </div>
</template>

<script>
export default {
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        },
        userType() {
            return this.$store.getters.userType;
        }
    }
}
</script>

<style lang="scss">

@import '~@fortawesome/fontawesome-free/css/all.min.css';

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: $font-family;
}

html {
  font-size: 62.5%;
}

body {
    max-width: 100vw;
    font-family: $font-family;
    @include font-size(14, 22);
    color: $color-text;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background-color: $color-background;
    scroll-behavior: smooth;
    overflow-x: hidden;

    &.overlay {
        &:after {
            @include pseudo('', block, fixed);
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            background-color: rgba($color: $color-primary-1, $alpha: 0.5);
        }
    }
}

#app {
    padding-top: 68px;
}

.flash-message {
    position: absolute;
    right: 1%;
    bottom: 1%;
}

.nav {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    background: $color-primary-1;
    box-shadow: 0px 3px 19px -2px rgba($color-primary-1, 0.8);

    &__inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1140px;
        margin: 0 auto;
    }

    .logo {
        padding: 0 25px;
        color: #fff;
        @include font-size(14);
        font-weight: 600;
        letter-spacing: .1rem;
        text-decoration: none;
        text-transform: uppercase;
    }

    ul {
        display: flex;
        margin: 0;
        justify-content: flex-end;
        list-style: none;

        span,
        a {
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            color: $color-white;
            margin: 0 15px 0 0;
            padding: 23px 10px;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: .1rem;
            text-decoration: none;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.2s ease-in-out;

            &.router-link-active,
            &.router-link-exact-active,
            &:hover { 
                background-color: $color-primary-3;
                color: $color-white;
            }

            .fas {
                margin-left: 0.3em;
                @include font-size(20, 20);
            }
        }
    }

    .has-dropdown {
        .dropdown {
            position: absolute;
            display: inline-block;
            padding-top: 0;
            top: 100%;
            right: 0;
            width: 187px;
            z-index: 50;
            
            opacity: 0;
            visibility: hidden;
            top: calc(100% - 10px);
            -webkit-transition: all 0.2s ease-in-out;
            transition: all 0.2s ease-in-out;

            &__content {
                position: relative;
                background-color: $color-white;
                box-shadow: $box-shadow;
            

                &:after {
                    @include pseudo();
                    top: 1px;
                    right: 0;
                    width: 0;
                    height: 0;
                    transform: translateY(-100%);
                    border-style: solid;
                    border-width: 0 15px 15px 15px;
                    border-color: transparent transparent $color-white transparent;
                    z-index: -1;
                }
            }

            ul {
                flex-direction: column;
                
                a {
                    display: inline-block;
                    padding: 10px 15px;
                    width: 100%;
                    color: $color-primary-1;
                    transition: all 0.15s ease-in-out;

                    &.router-link-active,
                    &.router-link-exact-active,
                    &:hover { 
                        background-color: $color-primary-3;
                        color: $color-white;
                    }
                }
            }
        }

        &:hover {
            .dropdown {
                visibility: visible;
                opacity: 1;
                margin-top: 10px;
            }
        }
    }
}

.section {
    padding: 80px 0;

    &__title {
        margin-bottom: 1em;
        @include font-size(30);
        text-align: center;
    }

    &--full {
        min-height: calc(100vh - 68px);
    }
}

</style>
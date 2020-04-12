<template>
  <div id="app">
    <nav class="nav">
      <div class="nav__inner">
        <router-link
          to="/"
          class="logo"
        >Obedovač</router-link>
        <ul>
          <li v-if="client || employee">
            <router-link
              :to="{ name: 'orders' }"
              exact
            >Obedy</router-link>
          </li>
          <li v-if="!loggedIn">
            <router-link :to="{ name: 'login' }">Prihlásenie <i class="fas fa-sign-in-alt"></i></router-link>
          </li>
          <li
            v-if="!loggedIn"
            class="has-dropdown"
          >
            <span>
              Registrácia
              <div class="dropdown">
                <div class="dropdown__content">
                  <ul>
                    <li v-if="!loggedIn">
                      <router-link :to="{ name: 'register-client' }">Pre&nbsp;spoločnosti</router-link>
                    </li>
                    <li v-if="!loggedIn">
                      <router-link :to="{ name: 'register-contractor' }">Pre&nbsp;reštaurácie</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </span>
          </li>
          <li v-if="loggedIn">
            <router-link :to="{ name: 'admin' }">Administrácia</router-link>
          </li>
          <li v-if="loggedIn">
            <router-link :to="{ name: 'logout' }">Odhlásiť <i class="fas fa-sign-out-alt"></i></router-link>
          </li>
        </ul>
      </div>
    </nav>

    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>

    <flash-message class="flash-message"></flash-message>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    },
    employee() {
      return this.$store.getters.loggedInEmployee
    },
    client() {
      return this.$store.getters.loggedInClient
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/scss/app.scss';
</style>
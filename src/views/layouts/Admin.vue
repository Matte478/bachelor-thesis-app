<template>
  <div
    class="admin-wrapper"
    :class="{closed: isClosed}"
  >
    <div
      class="sidebar-wrapper fixed-top"
      :class="{closed: isClosed}"
    >
      <nav class="sidebar">
        <obd-button-arrow
          class="sidebar__toggle"
          @click="toggleClose"
        />

        <ul
          class="sidebar__menu"
          v-if="contractor"
        >
          <li>
            <router-link :to="{ name: 'restaurant-dashboard' }"><i class="fas fa-tachometer-alt"></i> Dashboard</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'restaurant-orders' }"><i class="fas fa-shopping-basket"></i>Objednávky</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'restaurant-menu' }"><i class="fas fa-utensils"></i> Menu</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'restaurant-clients' }"><i class="fas fa-calendar-week"></i> Klienti</router-link>
          </li>
        </ul>

        <ul
          class="sidebar__menu"
          v-if="client"
        >
          <li>
            <router-link :to="{ name: 'client-contractor' }"><i class="fas fa-tachometer-alt"></i> Dodávateľ</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'client-orders' }"><i class="fas fa-shopping-basket"></i>Objednávky</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'client-employees' }"><i class="fas fa-users"></i> Zamestnanci</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'client-type-of-employments' }"><i class="fas fa-money-bill-wave-alt"></i> Pracovné pomery</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="container-fluid">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClosed: false,
    }
  },
  computed: {
    userType() {
      return this.$store.getters.userType
    },
    contractor() {
      return this.$store.getters.loggedInContractor
    },
    client() {
      return this.$store.getters.loggedInClient
    },
  },
  methods: {
    toggleClose: function() {
      this.isClosed = !this.isClosed
    },
  },
}
</script>

<style lang="scss" scoped>
.section {
  position: relative;
  padding: 30px 0;
}

.admin-wrapper {
  display: flex;
  flex-direction: row;
  padding-left: 220px;
  transition: all 0.2s ease-in-out;

  &.closed {
    padding-left: 50px;
  }
}

.sidebar-wrapper {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 220px;
  transition: all 0.2s ease-in-out;

  position: fixed;
  z-index: 90;
  width: 220px;
  left: 0;

  &.closed {
    flex-basis: 50px;
    width: 50px;
  }

  .sidebar {
    padding: 3vh 0;
    left: 0;
    bottom: 0;
    height: calc(100vh - 68px);
    z-index: 5;
    color: $color-white;
    overflow: hidden auto;
    background-color: lighten($color-primary-1, 4%);

    &__toggle {
      position: absolute;
      right: 0;
      bottom: 5%;
      transform: translateX(50%);
      z-index: 100;
    }

    .sidebar__menu {
      @include font-size(14);
      list-style: none;
      padding: 0.5em 0;
      margin: 0;

      li {
        @include font-size(14, 25);
        cursor: pointer;

        a {
          display: flex;
          padding: 0.7em 1em;
          align-items: center;
          color: $color-white;
          text-decoration: none;
          transition: all 0.15s linear;
          white-space: nowrap;

          &.router-link-active,
          &.router-link-exact-active,
          &:hover {
            background-color: $color-primary-3;
          }

          .fas {
            flex: 0 0 23px;
            margin-right: 15px;
            width: 35px;
            @include font-size(20, 20);
            text-align: center;
          }
        }

        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
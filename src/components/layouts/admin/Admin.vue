<template>
<div class="admin-wrapper" :class="{closed: isClosed}">
    <div class="sidebar-wrapper fixed-top" :class="{closed: isClosed}">
        <nav class="sidebar">
            <button class="sidebar__toggle" @click="toggleClose">
                <i class="icofont-rounded-double-left"></i>
            </button>
            <ul class="sidebar__menu">
                <li>
                    <a href="#"><i class="icofont-dashboard"></i> Dashboard</a>
                </li>
                <li>
                    <router-link :to="{ name: 'restaurant-menu' }"><i class="icofont-restaurant-menu"></i> Naše menu</router-link>
                </li>
                <li>
                    <a href="#"><i class="icofont-book"></i> Týždenná ponuka</a>
                </li>
                <li>
                    <a href="#"><i class="icofont-users-alt-5"></i> Zamestnanci</a>
                </li>
            </ul>
        </nav>
    </div>
    <div class="container-fluid">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
             isClosed: false
        }
    },

    methods: {
        toggleClose: function() {
            this.isClosed = !this.isClosed;
        }
    }
}
</script>

<style lang="scss" scoped>
.admin-wrapper {
    display: flex;
    flex-direction: row;
    padding-left: 250px;
    transition: all 0.2s ease-in-out;

    &.closed {
        padding-left: 50px;
    }
}

.sidebar-wrapper {
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 250px;
    transition: all 0.2s ease-in-out;

    position: fixed;
    z-index: 100;
    width: 250px;
    left: 0;

     &.closed {
         flex-basis: 50px;
         width: 50px;
        .sidebar__toggle {
            transform: translateX(50%) rotate(180deg);
        }
        // @at-root .admin-wrapper {
        //     padding-left: 50px;
        // }
    }

    .sidebar {
        padding: 3vh 0;
        left: 0;
        bottom: 0;
        height: calc(100vh - 62px);
        z-index: 5;
        color: $color-white;
        overflow: scroll;
        background-color: lighten($color-primary-1, 4%);

        &__toggle {
            position: absolute;
            display: inline-block;
            padding: 5px;
            right: 0;
            bottom: 5%;
            background-color: $color-primary-3;
            border-radius: 50%;
            @include font-size(40);
            transform: translateX(50%);
            z-index: 100;
            border: none;
            outline: none;
            color: $color-white;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            
            i {
                display: block;
            }
        }
        
        .sidebar__menu {
            @include font-size(14);
            list-style: none;
            padding: 0.5em 0;
            margin: 0;
            
            li {
                padding: 0.7em 1em;
                @include font-size(14, 25);
                background-repeat: no-repeat;
                transition: all 0.15s linear;
                cursor: pointer;
                
                i {
                    margin-right: 10px;
                    @include font-size(25, 25);
                }

                a {
                    display: flex;
                    align-items: center;
                    color: $color-white;
                    text-decoration: none;
                }
                
                &:hover {
                    background-color: $color-primary-3;
                }
                
                &:focus {
                    outline: none;
                }
            }
        }
    }
}
</style>
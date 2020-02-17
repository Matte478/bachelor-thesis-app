// general
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RegisterContractor from './components/auth/RegisterContractor';
import RegisterClient from './components/auth/RegisterClient';
import Logout from './components/auth/Logout';


import Admin from './components/layouts/admin/Admin';

// restaurant
import RestaurantMenu from './components/layouts/admin/RestaurantMenu';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/register-contractor',
        name: 'register-contractor',
        component: RegisterContractor,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/register-client',
        name: 'register-client',
        component: RegisterClient,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
            requiresAuth: true,
        },

        children: [
            {
              path: 'menu',
              name: 'restaurant-menu',
              component: RestaurantMenu,
            },
          ]
    },
]

export default routes
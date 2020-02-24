// general
import Home from './views/Home';
import Login from './views/auth/Login';
import RegisterContractor from './views/auth/RegisterContractor';
import RegisterClient from './views/auth/RegisterClient';
import Logout from './views/auth/Logout';
import PageNotFound from './views/404';


import Admin from './views/layouts/Admin';

// restaurant
import RestaurantMenu from './views/admin/restaurant/Menu';
import RestaurantDashboard from './views/admin/restaurant/Dashboard';

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
            {
                path: 'dashboard',
                name: 'restaurant-dashboard',
                component: RestaurantDashboard,
            },
          ]
    },

    {
        path: "*",
        component: PageNotFound
    }
]

export default routes
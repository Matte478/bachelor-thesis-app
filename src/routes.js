// general
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import RegisterContractor from './components/auth/RegisterContractor';
import RegisterClient from './components/auth/RegisterClient';
import Logout from './components/auth/Logout';
import PageNotFound from './components/pages/404';


import Admin from './components/layouts/Admin';

// restaurant
import RestaurantMenu from './components/pages/admin/restaurant/Menu';
import RestaurantDashboard from './components/pages/admin/restaurant/Dashboard';

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
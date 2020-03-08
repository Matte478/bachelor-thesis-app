// general
import Home from './views/Home';
import Login from './views/auth/Login';
import RegisterContractor from './views/auth/RegisterContractor';
import RegisterClient from './views/auth/RegisterClient';
import Logout from './views/auth/Logout';
import PageNotFound from './views/404';


import Admin from './views/layouts/Admin';

// restaurant
import RestaurantDashboard from './views/admin/restaurant/Dashboard';
import RestaurantMenu from './views/admin/restaurant/Menu';
// import RestaurantWeekOffer from './views/admin/restaurant/WeekOffer';
import RestaurantClients from './views/admin/restaurant/Client';

// client
import ClientContractor from './views/admin/client/Contractor';

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
                path: 'dashboard',
                name: 'restaurant-dashboard',
                component: RestaurantDashboard,
            },
            {
                path: 'menu',
                name: 'restaurant-menu',
                component: RestaurantMenu,
            },
            // {
            //     path: 'week-offer',
            //     name: 'restaurant-week-offer',
            //     component: RestaurantWeekOffer,
            // },
            {
                path: 'clients',
                name: 'restaurant-clients',
                component: RestaurantClients,
            },

            {
                path: '/contractor',
                name: 'client-contractor',
                component: ClientContractor,
            },
          ]
    },

    {
        path: "*",
        component: PageNotFound
    }
]

export default routes
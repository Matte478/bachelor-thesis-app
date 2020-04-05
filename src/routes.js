// general
import Home from './views/Home'
import Login from './views/auth/Login'
import RegisterContractor from './views/auth/RegisterContractor'
import RegisterClient from './views/auth/RegisterClient'
import Logout from './views/auth/Logout'
import PageNotFound from './views/404'

// layout
import Admin from './views/layouts/Admin'

// restaurant
import RestaurantDashboard from './views/admin/restaurant/Dashboard'
import RestaurantMenu from './views/admin/restaurant/Menu'
import RestaurantClients from './views/admin/restaurant/Client'
import RestaurantOrders from './views/admin/restaurant/Orders'

// client
import ClientContractor from './views/admin/client/Contractor'
import ClientEmployees from './views/admin/client/Employees'
import ClientTypeOfEmployments from './views/admin/client/TypeOfEmployments'
import Orders from './views/Order'

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
    path: '/orders',
    name: 'orders',
    component: Orders,
    meta: {
      requiresAuth: true,
    },
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
      {
        path: 'clients',
        name: 'restaurant-clients',
        component: RestaurantClients,
      },
      {
        path: 'orders',
        name: 'restaurant-orders',
        component: RestaurantOrders,
      },

      {
        path: 'contractor',
        name: 'client-contractor',
        component: ClientContractor,
      },
      {
        path: 'employees',
        name: 'client-employees',
        component: ClientEmployees,
      },
      {
        path: 'type-of-employments',
        name: 'client-type-of-employments',
        component: ClientTypeOfEmployments,
      },
    ]
  },

  {
    path: "*",
    component: PageNotFound
  }
]

export default routes
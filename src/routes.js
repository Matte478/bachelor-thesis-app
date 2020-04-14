// general
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
import RestaurantClients from './views/admin/restaurant/Clients'
import RestaurantOrders from './views/admin/restaurant/Orders'

// client
import ClientContractor from './views/admin/client/Contractor'
import ClientEmployees from './views/admin/client/Employees'
import ClientTypeOfEmployments from './views/admin/client/TypeOfEmployments'
import ClientOrders from './views/admin/client/Orders'
import Orders from './views/Orders'

const routes = [
  {
    path: '/',
    redirect: { 
      name: 'admin'
    }
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
      requiresClientOrEmployee: true,
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      requiresAdmin: true,
    },

    children: [
      {
        path: 'dashboard',
        name: 'restaurant-dashboard',
        component: RestaurantDashboard,
        meta: {
          requiresContractor: true,
        },
      },
      {
        path: 'menu',
        name: 'restaurant-menu',
        component: RestaurantMenu,
        meta: {
          requiresContractor: true,
        },
      },
      {
        path: 'clients',
        name: 'restaurant-clients',
        component: RestaurantClients,
        meta: {
          requiresContractor: true,
        },
      },
      {
        path: 'orders',
        name: 'restaurant-orders',
        component: RestaurantOrders,
        meta: {
          requiresContractor: true,
        },
      },

      {
        path: 'contractor',
        name: 'client-contractor',
        component: ClientContractor,
        meta: {
          requiresClient: true,
        },
      },
      {
        path: 'employee-orders',
        name: 'client-orders',
        component: ClientOrders,
        meta: {
          requiresClient: true,
        },
      },
      {
        path: 'employees',
        name: 'client-employees',
        component: ClientEmployees,
        meta: {
          requiresClient: true,
        },
      },
      {
        path: 'type-of-employments',
        name: 'client-type-of-employments',
        component: ClientTypeOfEmployments,
        meta: {
          requiresClient: true,
        },
      },
    ]
  },

  {
    path: "*",
    name: 'page-not-found',
    component: PageNotFound
  }
]

export default routes
export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { layout: 'AppDefaultLayout' },
        children: [],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
        meta: { layout: 'AppDefaultLayout' },
        children: []
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/CartView.vue'),
        meta: { layout: 'AppDefaultLayout' },
        children: [],
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('@/views/UserView.vue'),
        meta: { layout: 'AppDefaultLayout' },
        children: [
            {
                path: '/orders',
                name: 'orders',
                component: () => import('@/views/OrdersView.vue'),
            },
            {
                path: '/profile',
                name: 'profile',
                component: () => import('@/views/OrdersView.vue')
            }
        ]
    }
]
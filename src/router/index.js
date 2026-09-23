import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import OrderView from '@/views/OrderView.vue'
import ProductView from '@/views/ProductView.vue'
import ProductAddView from '@/views/ProductAddView.vue'
import ProductUpdateView from '@/views/ProductUpdateView.vue'
import OrderListView from '@/views/OrderListView.vue'
import OrderDetailView from '@/views/OrderDetailView.vue'
import OrderReportView from '@/views/OrderReportView.vue'
import UserAddView from '@/views/UserAddView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView,
    },
    {
      path: '/order-list',
      name: 'orderList',
      component: OrderListView,
    },
    {
      path: '/order/:orderId',
      name: 'orderDetail',
      component: OrderDetailView,
      props: true,
    },
    {
      path: '/order-report',
      name: 'orderReport',
      component: OrderReportView,
      props: true,
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/product-add',
      name: 'productAdd',
      component: ProductAddView,
    },
    {
      path: '/product/:productId',
      name: 'productUpdate',
      component: ProductUpdateView,
      props: true,
    },
    {
      path: '/user-add',
      name: 'userAdd',
      component: UserAddView,
      meta: { requiresManager: true },
    },
  ],
})

router.beforeEach((to) => {
  const isLoggedIn = Boolean(localStorage.getItem('token') && localStorage.getItem('name'))

  if (to.name !== 'login' && !isLoggedIn) {
    return { name: 'login' }
  }

  if (to.name === 'login' && isLoggedIn) {
    return { name: 'home' }
  }

  if (to.meta.requiresManager && localStorage.getItem('role_id') !== '4') {
    return { name: 'home' }
  }
})

export default router

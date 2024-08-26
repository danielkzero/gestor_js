import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login/login.vue'),
    },
    {
      path: '/principal',
      name: 'Principal',
      component: () => import('../views/layout/principal.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('../views/inicio/dashboard_inicial.vue')
        }
      ]
    },
  ]
})

export default router

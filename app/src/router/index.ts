import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('app/views/Home.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('app/views/Form.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('app/views/Upload.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('app/views/Table.vue')
    }
  ]
})

export default router

// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue'),

  },
  {
    path: '/recommendations',
    name: 'recommendations',
    component: () => import('../views/RecommendationsPage.vue')
  },
  {
    path: '/film/:id',
    name: 'film',
    children: [
      {
        path: '',
        component() => import('../views/FilmPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

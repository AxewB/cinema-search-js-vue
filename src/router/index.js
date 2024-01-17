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
    path: '/favourites',
    name: 'favourites',
    component: () => import('../views/FavouritesPage.vue')
  },
  {
    path: '/film/:id',
    children: [
      {
        path: '',
        name: 'film',
        component: () => import('../views/FilmPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

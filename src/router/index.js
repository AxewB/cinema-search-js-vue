import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: () => import('../views/BookmarksPage.vue')
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
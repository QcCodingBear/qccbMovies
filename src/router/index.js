import { createRouter, createWebHistory } from 'vue-router'
import HomeMoviesView from '../views/HomeMoviesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: HomeMoviesView,
    },
    {
      path: '/searchMovies',
      name: 'searchMovies',
      component: () => import('../views/SearchMoviesView.vue'),
    },
    {
      path: '/detailsMovie',
      name: 'detailsMovie',
      component: () => import('../views/MovieDetailsView.vue'),
    },
  ],
})

export default router

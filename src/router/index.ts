import { createRouter, createWebHashHistory } from 'vue-router'
import ChaptersPage from '../views/ChaptersPage.vue'
import ScansPage from '../views/ScansPage.vue'
import TooManyRequests from '@/views/TooManyRequests.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'ChaptersPage',
      component: ChaptersPage,
    },
    {
      path: '/scans/:scans/:id',
      name: 'ScansPage',
      component: ScansPage,
    },
    {
      path: '/TooManyRequests',
      name: 'TooManyRequests',
      component: TooManyRequests,
    },
  ],
})

export default router

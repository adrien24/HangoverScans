import { createRouter, createWebHashHistory } from 'vue-router'
import ChaptersPage from '../views/ChaptersPage.vue'
import ScansPage from '../views/ScansPage.vue'

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
  ],
})

export default router

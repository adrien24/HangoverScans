import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "chapters" */ '../views/HomeView.vue'),
    },
    {
      path: '/:scan',
      name: 'ChaptersPage',
      component: () => import(/* webpackChunkName: "chapters" */ '../views/ChaptersPage.vue'),
    },
    {
      path: '/scans/:scans/:id',
      name: 'ScansPage',
      component: () => import(/* webpackChunkName: "scans" */ '../views/ScansPage.vue'),
    },
    {
      path: '/TooManyRequests',
      name: 'TooManyRequests',
      component: () =>
        import(/* webpackChunkName: "TooManyRequests" */ '../views/TooManyRequests.vue'),
    },
  ],
})

export default router

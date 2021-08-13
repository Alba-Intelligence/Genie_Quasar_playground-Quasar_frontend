import RouteRecordRaw from 'vue-router'

//
// Lazy-loading of the routes by Quasar
// see: https://quasar.dev/quasar-cli/lazy-loading
//
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes

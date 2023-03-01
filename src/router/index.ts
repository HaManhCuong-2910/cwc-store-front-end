import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { authRoute } from './auth';
import { cartPageRoute } from './cart';
import { categoryRoute } from './category';
import { detailProductRoute } from './detail-product';

const routes: Array<RouteRecordRaw> = [
  ...authRoute,
  ...categoryRoute,
  ...detailProductRoute,
  ...cartPageRoute,
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { layout: 'DefaultLayout', title: 'Trang chủ' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      layout: 'DefaultLayout',
      title: 'Không tìm thấy trang',
    },
    component: () =>
      import('../views/404/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

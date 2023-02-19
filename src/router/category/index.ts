export const categoryRoute = [
  {
    path: '/giay-bong-ro/:slug?',
    name: 'ShoesBasketBall',
    meta: {
      layout: 'DefaultLayout',
      title: 'cwc-store',
    },
    component: () =>
      import('@/views/category/shoes-basket-page/Slug.vue'),
  },
  {
    path: '/tin-tuc',
    name: 'News',
    meta: {
      layout: 'DefaultLayout',
      title: 'cwc-store',
    },
    component: () => import('@/views/category/News.vue'),
  },
  {
    path: '/gioi-thieu',
    name: 'Intro',
    meta: {
      layout: 'DefaultLayout',
      title: 'cwc-store',
    },
    component: () => import('@/views/category/Intro.vue'),
  },
  {
    path: '/phu-kien',
    meta: {
      layout: 'DefaultLayout',
      title: 'cwc-store',
    },
    component: () =>
      import('@/views/category/shoes-basket-page/Slug.vue'),
  },
];

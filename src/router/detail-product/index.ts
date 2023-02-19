export const detailProductRoute = [
  {
    path: '/chi-tiet-san-pham/:slug?',
    name: 'DetailBasket',
    meta: {
      layout: 'DefaultLayout',
      title: 'cwc-store',
    },
    component: () =>
      import(
        '@/views/category/shoes-basket-page/DetailBasket.vue'
      ),
  },
];

export const cartPageRoute = [
  {
    path: '/gio-hang',
    name: 'CartPage',
    meta: {
      layout: 'DefaultLayout',
      title: 'Giỏ hàng',
    },
    component: () => import('@/views/cart/CartPage.vue'),
  },
];

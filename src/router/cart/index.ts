export const cartPageRoute = [
  {
    path: '/gio-hang/:time_line?',
    name: 'CartPage',
    meta: {
      layout: 'DefaultLayout',
      title: 'Giỏ hàng',
    },
    component: () => import('@/views/cart/CartPage.vue'),
  },
];

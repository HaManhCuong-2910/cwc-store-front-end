export const authRoute = [
  {
    path: '/auth/login',
    name: 'Login',
    meta: {
      layout: 'DefaultLayout',
      title: 'login',
    },
    component: () =>
      import('@/views/auth/login/LoginPage.vue'),
  },
];

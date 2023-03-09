export const authRoute = [
  {
    path: '/auth/login',
    name: 'Login',
    meta: {
      layout: 'DefaultLayout',
      title: 'Đăng nhập',
    },
    component: () =>
      import('@/views/auth/login/LoginPage.vue'),
  },
  {
    path: '/auth/register',
    name: 'Register',
    meta: {
      layout: 'DefaultLayout',
      title: 'Đăng ký',
    },
    component: () =>
      import('@/views/auth/register/RegisterPage.vue'),
  },
];

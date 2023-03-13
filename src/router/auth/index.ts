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
    path: '/auth/forgot-password',
    name: 'ForgotPassword',
    meta: {
      layout: 'DefaultLayout',
      title: 'Quên mật khẩu',
    },
    component: () =>
      import(
        '@/views/auth/forgot-password/ForgotPassword.vue'
      ),
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
  {
    path: '/auth/forgot-password',
    name: 'ForgotPassword',
    meta: {
      layout: 'DefaultLayout',
      title: 'Quên mật khẩu',
    },
    component: () =>
      import(
        '@/views/auth/forgot-password/ForgotPassword.vue'
      ),
  },
];

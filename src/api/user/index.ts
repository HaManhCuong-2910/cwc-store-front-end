import { Router } from 'vue-router';

const getTokenFromClient = () => {
  return sessionStorage.getItem('access_token');
};

const storeToken = (access_token: string) => {
  sessionStorage.setItem('access_token', access_token);
  return;
};

const LoginAgain = (router: Router) => {
  router.push({
    name: 'Login',
  });
};

export const serviceUser = {
  getTokenFromClient,
  storeToken,
  LoginAgain,
};

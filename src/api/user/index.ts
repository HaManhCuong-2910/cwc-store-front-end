import { User } from '@/constant/constant';
import { Router } from 'vue-router';
import { Store } from 'vuex';

const getTokenFromClient = (store: Store<any>) => {
  return store.state.access_token;
};

const storeToken = (
  data: {
    access_token: string;
    user: User | null;
  },
  store: Store<any>
) => {
  store.commit('setAccessToken', data);
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

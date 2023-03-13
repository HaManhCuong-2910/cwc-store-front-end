import { User } from '@/constant/constant';
import { Router } from 'vue-router';
import { Store } from 'vuex';
import { IFormUserInfo } from '../auth/data';
import { instance } from '../axios';

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

const updateUserInfoApi = async (
  data: IFormUserInfo & { avatar: string },
  _id: string
) => {
  try {
    const res = (
      await instance.post('/account/update', {
        ...data,
        ...{ _id },
      })
    ).data;
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const serviceUser = {
  getTokenFromClient,
  storeToken,
  LoginAgain,
  updateUserInfoApi,
};

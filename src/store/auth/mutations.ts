import { User } from '@/constant/constant';

type TAuthMutations = {
  setAccessToken: (
    state: any,
    data: {
      access_token: string;
      user: User | null;
    }
  ) => void;

  logOut: (state: any) => void;
  clearTokenResetPassword: (state: any) => void;
  updateUserInfo: (state: any, user: User) => void;
  setTokenResetPassword: (
    state: any,
    token_reset_password: string
  ) => void;
};

const setAccessToken = (
  state: any,
  data: {
    access_token: string;
    user: User | null;
  }
) => {
  state.user = data.user;
  state.access_token = data.access_token;
};

const updateUserInfo = (state: any, user: User) => {
  state.user = user;
};

const setTokenResetPassword = (
  state: any,
  token_reset_password: string
) => {
  state.token_reset_password = token_reset_password;
};

const clearTokenResetPassword = (state: any) => {
  state.token_reset_password = '';
};

const logOut = (state: any) => {
  state.user = null;
  state.access_token = null;
};

export const handleAuthMutations: TAuthMutations = {
  setAccessToken,
  logOut,
  setTokenResetPassword,
  clearTokenResetPassword,
  updateUserInfo,
};

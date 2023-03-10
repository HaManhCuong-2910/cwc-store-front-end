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

const logOut = (state: any) => {
  state.user = null;
  state.access_token = null;
};

export const handleAuthMutations: TAuthMutations = {
  setAccessToken,
  logOut,
};

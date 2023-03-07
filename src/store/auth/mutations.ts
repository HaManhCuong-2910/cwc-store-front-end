import { User } from '@/constant/constant';

type TAuthMutations = {
  setAccessToken: (
    state: any,
    data: {
      access_token: string;
      user: User | null;
    }
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

export const handleAuthMutations: TAuthMutations = {
  setAccessToken,
};

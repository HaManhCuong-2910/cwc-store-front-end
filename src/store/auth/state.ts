import { User } from '@/constant/constant';

export type TAuthState = {
  access_token: string;
  user: User | null;
  token_reset_password: string;
};

export const handleAuthState: TAuthState = {
  access_token: localStorage.getItem('access_token')
    ? (localStorage.getItem('access_token') as string)
    : '',
  user: null,
  token_reset_password: '',
};

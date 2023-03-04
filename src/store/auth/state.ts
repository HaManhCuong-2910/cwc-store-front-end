import { User } from '@/constant/constant';

export type TAuthState = {
  access_token: string;
  user: User | null;
};

export const handleAuthState: TAuthState = {
  access_token: sessionStorage.getItem('access_token')
    ? (sessionStorage.getItem('access_token') as string)
    : '',
  user: null,
};

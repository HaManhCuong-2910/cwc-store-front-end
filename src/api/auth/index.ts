import { instance } from '../axios';
import { IDataFormLogin } from './data';

export const Login = async (data: IDataFormLogin) => {
  try {
    const res = await instance.post<any>(
      '/auth/login',
      data
    );
    return [res, null];
  } catch (err: any) {
    return [null, err];
  }
};

export const refreshToken = async () => {
  try {
    const res = await instance.post<any>(
      '/auth/refresh_access_token'
    );
    return [res, null];
  } catch (err: any) {
    return [null, err];
  }
};

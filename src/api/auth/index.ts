import { instance } from '../axios';
import {
  IDataFormLogin,
  IFormRegister,
  TRegisterAccountResponse,
} from './data';

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

export const RegisterApi = async (data: IFormRegister) => {
  try {
    const res =
      await instance.post<TRegisterAccountResponse>(
        '/auth/register',
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

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

export const ForgotPassword = async (email: string) => {
  try {
    const res = await instance.post<any>(
      '/auth/forgot-password',
      { email }
    );
    return [res, null];
  } catch (err: any) {
    return [null, err];
  }
};

export const ResetForgotPassword = async (data: {
  email: string;
  code: string;
}) => {
  try {
    const res = await instance.post<any>(
      '/auth/reset-forgot-password',
      data
    );
    return [res, null];
  } catch (err: any) {
    return [null, err];
  }
};

export const ResetPassword = async (data: {
  email: string;
  token_reset: string;
  password: string;
}) => {
  try {
    const res = await instance.post<any>(
      '/auth/reset-password',
      data
    );
    return [res, null];
  } catch (err: any) {
    return [null, err];
  }
};

import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const cancelToken = axios.CancelToken;

export let cancelSource = cancelToken.source();

export const instance = axios.create({
  baseURL: process.env.VUE_APP_API_END_POINT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const refreshCancelSource = (): void => {
  cancelSource = cancelToken.source();
};

export const isCancelRequest = (err: any): boolean =>
  axios.isCancel(err);

export const setAuthorization = (h: string): void => {
  instance.defaults.headers.common.Authorization = h;
};

instance.interceptors.response.use(
  (response) => {
    const { status, data } = response;

    if (status === 200 || status === 201) {
      return response;
    }

    return Promise.reject(response);
  },
  async (error: any) => {
    return Promise.reject(error.response?.data?.error);
  }
);

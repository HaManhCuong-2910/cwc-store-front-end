import { AxiosResponse } from 'axios';
import { instance } from '../axios';
import { TGetListProducts, TProduct } from './data';

export const getProducts = async (
  query?: TGetListProducts
) => {
  return await instance.get<{
    data: TProduct[];
    page: number;
    count: number;
  }>('/post/list', {
    params: query,
  });
};

export const findProductByCondition = async (
  query?: TGetListProducts
) => {
  return await instance.get<TProduct>('/post', {
    params: query,
  });
};

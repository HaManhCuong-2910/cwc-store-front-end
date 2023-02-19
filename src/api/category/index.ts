import { AxiosResponse } from 'axios';
import { instance } from '../axios';
import { TGetCategoryByCondition } from './data';

export const getListCategory = async () => {
  return await instance.get<any[]>('/category/list');
};

export const getCategoryByCondition = async (
  query: TGetCategoryByCondition
) => {
  return await instance.get<TGetCategoryByCondition>(
    '/category',
    {
      params: query,
    }
  );
};

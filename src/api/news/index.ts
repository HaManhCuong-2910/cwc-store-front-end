import { instance } from '../axios';
import {
  DataGetListNewsResponse,
  IGetListNewsResponse,
} from './data';

export const getListNews = async (query?: any) => {
  try {
    const res = await instance.get<IGetListNewsResponse>(
      '/news/list',
      {
        params: query,
      }
    );
    return [res, null];
  } catch (err: any) {
    return [null, err];
  }
};

export const getDetailNews = async (id: string) => {
  try {
    const res = await instance.get<DataGetListNewsResponse>(
      `/news/${id}/detail`
    );
    return [res, null];
  } catch (err: any) {
    return [null, err];
  }
};

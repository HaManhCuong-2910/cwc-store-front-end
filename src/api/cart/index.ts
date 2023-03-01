import { instance } from '../axios';
import { TOrderCart } from './data';

export const OrderCart = async (data: TOrderCart) => {
  try {
    const res = await instance.post<any>(
      '/cart/order',
      data
    );
    return [res, null];
  } catch (err) {
    return [null, err];
  }
};

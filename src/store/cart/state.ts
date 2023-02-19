import { TProduct } from '@/api/products/data';

type TCartState = {
  cart: TProduct[];
};

export const handleCartState: TCartState = {
  cart: sessionStorage.getItem('cart')
    ? JSON.parse(sessionStorage.getItem('cart') as string)
    : [],
};

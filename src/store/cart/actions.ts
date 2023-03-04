import { TProduct } from '@/api/products/data';
import { TProductCart } from '@/constant/constant';
import { ETimeline } from './state';
type TCartActions = {
  addProductToCart: (
    { commit }: any,
    product: TProductCart
  ) => void;
  changeTimeLineCart: (
    { commit }: any,
    timeline: ETimeline
  ) => void;
};

const addProductToCart = (
  { commit }: any,
  product: TProductCart
) => {
  commit('addProductToCart', product);
};

const changeTimeLineCart = (
  { commit }: any,
  timeline: ETimeline
) => {
  commit('changeTimeLineCart', timeline);
};

export const handleCartActions: TCartActions = {
  addProductToCart,
  changeTimeLineCart,
};

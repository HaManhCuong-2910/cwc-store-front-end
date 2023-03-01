import { TProduct } from '@/api/products/data';
import { ETimeline } from './state';
type TCartActions = {
  addProductToCart: (
    { commit }: any,
    product: TProduct
  ) => void;
  changeTimeLineCart: (
    { commit }: any,
    timeline: ETimeline
  ) => void;
  clearProductToCart: ({ commit }: any) => void;
};

const addProductToCart = (
  { commit }: any,
  product: TProduct
) => {
  commit('addProductToCart', product);
};

const clearProductToCart = ({ commit }: any) => {
  commit('clearProductToCart');
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
  clearProductToCart,
};

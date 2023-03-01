import { TProduct } from '@/api/products/data';
import { ETimeline } from './state';
type TCartMutations = {
  addProductToCart: (state: any, product: TProduct) => void;
  changeTimeLineCart: (
    state: any,
    timeline: ETimeline
  ) => void;
  clearProductToCart: (state: any) => void;
};

const addProductToCart = (state: any, product: any) => {
  const indexProduct = state.cart.findIndex(
    (item: any) =>
      item._id === product._id &&
      item.size_id === product.size_id
  );
  if (indexProduct >= 0) {
    state.cart[indexProduct].quantity += product.quantity;
  } else {
    state.cart.push(product);
  }
  sessionStorage.setItem(
    'cart',
    JSON.stringify(state.cart)
  );
};

const clearProductToCart = (state: any) => {
  state.cart = [];
  sessionStorage.removeItem('cart');
};

const changeTimeLineCart = (
  state: any,
  timeline: ETimeline
) => {
  state.timeline_cart = timeline;
};

export const handleCartMutations: TCartMutations = {
  addProductToCart,
  changeTimeLineCart,
  clearProductToCart,
};

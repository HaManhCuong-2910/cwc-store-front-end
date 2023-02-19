import { TProduct } from '@/api/products/data';
type TCartMutations = {
  addProductToCart: (state: any, product: TProduct) => void;
};

const addProductToCart = (
  state: any,
  product: TProduct
) => {
  state.cart.push(product);
};

export const handleCartMutations: TCartMutations = {
  addProductToCart,
};

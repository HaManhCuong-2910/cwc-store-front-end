import { TProduct } from '@/api/products/data';
type TCartActions = {
  addProductToCart: (
    { commit }: any,
    product: TProduct
  ) => void;
};

const addProductToCart = (
  { commit }: any,
  product: TProduct
) => {
  const sessionCart = sessionStorage.getItem('cart');
  if (sessionCart) {
    const newSessionCart = JSON.parse(sessionCart);
    newSessionCart.push(product);
    sessionStorage.setItem(
      'cart',
      JSON.stringify(newSessionCart)
    );
  } else {
    sessionStorage.setItem(
      'cart',
      JSON.stringify([product])
    );
  }
  commit('addProductToCart', product);
};

export const handleCartActions: TCartActions = {
  addProductToCart,
};

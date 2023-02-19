const getCartState = (state: any) => {
  return state.cart;
};

type TCartGetters = {
  getCartState: (state: any) => void;
};

export const handleCartGetters: TCartGetters = {
  getCartState,
};

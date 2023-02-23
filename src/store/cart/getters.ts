type TCartGetters = {
  getCartState: (state: any) => void;
  getTimeLineCartState: (state: any) => void;
};

const getCartState = (state: any) => {
  return state.cart;
};

const getTimeLineCartState = (state: any) => {
  return state.timeline_cart;
};

export const handleCartGetters: TCartGetters = {
  getCartState,
  getTimeLineCartState,
};

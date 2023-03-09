import { handleAuthGetters } from './auth/getters';
import { handleCartGetters } from './cart/getters';

export const handleGetters = {
  ...handleCartGetters,
  ...handleAuthGetters,
};

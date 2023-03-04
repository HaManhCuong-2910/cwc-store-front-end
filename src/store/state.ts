import { handleAuthState } from './auth/state';
import { handleCartState } from './cart/state';

export const handleState = {
  ...handleCartState,
  ...handleAuthState,
};

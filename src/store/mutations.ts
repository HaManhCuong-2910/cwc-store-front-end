import { handleAuthMutations } from './auth/mutations';
import { handleCartMutations } from './cart/mutations';

export const handleMutations = {
  ...handleCartMutations,
  ...handleAuthMutations,
};

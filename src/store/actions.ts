import { handleAuthActions } from './auth/actions';
import { handleCartActions } from './cart/actions';

export const handleActions = {
  ...handleCartActions,
  ...handleAuthActions
};

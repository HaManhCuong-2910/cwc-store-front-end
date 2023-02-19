import { createStore } from 'vuex';
import { handleActions } from './actions';
import { handleGetters } from './getters';
import { handleMutations } from './mutations';
import { handleState } from './state';

export default createStore({
  state: handleState,
  getters: handleGetters,
  mutations: handleMutations,
  actions: handleActions,
});

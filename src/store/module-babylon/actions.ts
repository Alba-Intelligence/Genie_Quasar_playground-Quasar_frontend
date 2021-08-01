import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { BabylonStateInterface } from './state';

const actions: ActionTree<BabylonStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;

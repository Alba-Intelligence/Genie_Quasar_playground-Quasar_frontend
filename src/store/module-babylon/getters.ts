import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { BabylonStateInterface } from './state';

const getters: GetterTree<BabylonStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;

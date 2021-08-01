import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { BabylonStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const babylonModule: Module<BabylonStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default babylonModule;

import { MutationTree } from 'vuex';
import { BabylonStateInterface } from './state';


const mutationUpdateState: MutationTree<BabylonStateInterface> = {
  updateRandomState(
    state: BabylonStateInterface,
    opened: boolean
  ) {
    state.randomStateVariable = opened
  }
}

export default mutationUpdateState


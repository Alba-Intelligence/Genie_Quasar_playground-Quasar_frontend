import { MutationTree } from 'vuex';
import { BabylonStateInterface } from './state';

function updateRandomState(
  state: BabylonStateInterface,
  opened: boolean
): MutationTree<BabylonStateInterface> {
  state.randomStateVariable = opened
  const returnValue: MutationTree<BabylonStateInterface> = null
  return returnValue
}

export default updateRandomState

export interface BabylonStateInterface {
  randomStateVariable: boolean;
}

function state(): BabylonStateInterface {
  return {
    randomStateVariable: false
  }
};

export default state;

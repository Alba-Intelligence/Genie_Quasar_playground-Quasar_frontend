export interface BabylonStateInterface {
  prop: boolean;
}

function state(): BabylonStateInterface {
  return {
    prop: false
  }
};

export default state;

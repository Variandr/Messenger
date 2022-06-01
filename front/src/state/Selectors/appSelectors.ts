import { StateType } from '../store';

export const getInitialize = (state: StateType) => {
  return state.appPage.isInitialized;
};

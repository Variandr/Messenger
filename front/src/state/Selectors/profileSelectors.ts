import { StateType } from '../store';

export const getProfile = (state: StateType) => {
  return state.profilePage.profile;
};
export const getProfileId = (state: StateType) => {
  return state.profilePage.profile?.id;
};

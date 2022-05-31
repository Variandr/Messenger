import { StateType } from '../state/store';

export const getUsersSelector = (state: StateType) => {
  return state.usersPage.users;
};

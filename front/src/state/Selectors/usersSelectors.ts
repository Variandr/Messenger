import { StateType } from '../store';

export const getUsersSelector = (state: StateType) => {
  return state.usersPage.users;
};

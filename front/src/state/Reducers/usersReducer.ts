import { UsersAPI } from '../../api/restAPI';
import { Actions, BaseThunk } from '../store';
import { Users } from '../../../types/types';

type State = typeof initialState;
type ActionTypes = Actions<typeof actions>;
type ThunkType = BaseThunk<ActionTypes>;

const initialState = {
  users: null as Array<Users> | null,
  isFetching: false,
};

const UsersReducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.users };
    default:
      return state;
  }
};

const actions = {
  _setUsers: (users: Array<Users>) => ({ type: 'SET_USERS', users } as const),
};

export const getUsers = (): ThunkType => async (dispatch) => {
  const users = await UsersAPI.getUsers();
  if (users) {
    dispatch(actions._setUsers(users));
  }
};
export default UsersReducer;

import { authMe } from './authReducer';
import { getUsers } from './usersReducer';
import { Actions, BaseThunk } from './store';

const initialState = {
  isInitialized: false,
};
type initialStateType = typeof initialState;
const AppReducer = (state = initialState, action: ActionTypes): initialStateType => {
  switch (action.type) {
    case 'SET_APP_LOADED':
      return { ...state, isInitialized: true };
    default:
      return state;
  }
};
export default AppReducer;
const actions = {
  _setInitialSuccess: () =>
    ({
      type: 'SET_APP_LOADED',
    } as const),
};
type ActionTypes = Actions<typeof actions>;
type ThunkType = BaseThunk<ActionTypes>;
export const initializeApp = (): ThunkType => async (dispatch) => {
  const promise = [dispatch(authMe()), dispatch(getUsers())];
  await Promise.all([promise]).then(() => {
    dispatch(actions._setInitialSuccess());
  });
};

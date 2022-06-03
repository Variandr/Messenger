import { authMe } from './authReducer';
import { getUsers } from './usersReducer';
import { Actions, BaseThunk } from '../store';

type State = typeof initialState;
type ActionTypes = Actions<typeof actions>;
type ThunkType = BaseThunk<ActionTypes>;

const initialState = {
  isInitialized: false,
};
const AppReducer = (state = initialState, action: ActionTypes): State => {
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
export const initializeApp = (): ThunkType => async (dispatch) => {
  const promise = [dispatch(authMe()), dispatch(getUsers())];
  await Promise.all([promise]).then(() => {
    dispatch(actions._setInitialSuccess());
  });
};

import { AuthAPI } from '../../api/restAPI';
import { Actions, BaseThunk } from '../store';
import { actions as snackbarActions } from './snackbarReducer';

type State = typeof initialState;
type ActionTypes = Actions<typeof actions> | Actions<typeof snackbarActions>;
type ThunkType = BaseThunk<ActionTypes>;

const initialState = {
  isAuth: false,
  login: null as string | null,
  id: null as number | null,
};
const AuthorizationReducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case 'SET_AUTH_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default AuthorizationReducer;
const actions = {
  _setAuthUserData: (login: string | null, id: number | null, isAuth: boolean) =>
    ({
      type: 'SET_AUTH_DATA',
      payload: { login, id, isAuth },
    } as const),
};

export const login =
  (log: string, password: string, remember: boolean): ThunkType =>
  async (dispatch) => {
    const userData = await AuthAPI.login(log, password, remember);
    if (!userData.message) {
      const { login, id } = userData.user;
      dispatch(actions._setAuthUserData(login, id, true));
      dispatch(
        snackbarActions.setSnackbar(true, 'success', `${login} was successfully authorized`)
      );
    } else dispatch(snackbarActions.setSnackbar(true, 'error', userData.message));
  };
export const logout = (): ThunkType => async (dispatch) => {
  await AuthAPI.logout();
  dispatch(actions._setAuthUserData(null, null, false));
};
export const registration =
  (log: string, password: string, username: string | null, remember: boolean): ThunkType =>
  async (dispatch) => {
    const userData = await AuthAPI.reg(log, password, username, remember);
    if (!userData.message) {
      const { login, id } = userData.user;
      dispatch(actions._setAuthUserData(login, id, true));
      dispatch(
        snackbarActions.setSnackbar(true, 'success', `${login} was successfully registered`)
      );
    } else dispatch(snackbarActions.setSnackbar(true, 'error', userData.message));
  };

export const authMe = (): ThunkType => async (dispatch) => {
  const tokenData = await AuthAPI.authMe();
  if (tokenData.data) {
    const { login, id } = tokenData.data.user;
    dispatch(actions._setAuthUserData(login, id, true));
    localStorage.setItem('accessToken', tokenData.data.accessToken);
    dispatch(snackbarActions.setSnackbar(true, 'success', `${login} was successfully authorized`));
  }
};

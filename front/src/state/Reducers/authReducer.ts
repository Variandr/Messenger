import { AuthAPI } from '../../api/restAPI';
import { Actions, BaseThunk } from '../store';

const initialState = {
  isAuth: false,
  login: null as string | null,
  id: null as number | null,
};
type initialStateType = typeof initialState;
const AuthorizationReducer = (state = initialState, action: ActionTypes): initialStateType => {
  switch (action.type) {
    case 'SET_AUTH_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default AuthorizationReducer;
type ActionTypes = Actions<typeof actions>;
type ThunkType = BaseThunk<ActionTypes>;

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
    }
  };
export const logout = (): ThunkType => async (dispatch) => {
  await AuthAPI.logout();
  dispatch(actions._setAuthUserData(null, null, false));
};
export const registration =
  (log: string, password: string, username: string | null, remember: boolean): ThunkType =>
  async (dispatch) => {
    const userData = await AuthAPI.reg(log, password, username, remember);
    if (userData) {
      const { login, id } = userData.user;
      dispatch(actions._setAuthUserData(login, id, true));
    }
  };

export const authMe = (): ThunkType => async (dispatch) => {
  const tokenData = await AuthAPI.authMe();
  if (tokenData) {
    const { login, id } = tokenData.data.user;
    dispatch(actions._setAuthUserData(login, id, true));
    localStorage.setItem('accessToken', tokenData.data.accessToken);
  }
};

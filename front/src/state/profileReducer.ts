import { ProfileAPI } from '../API/api';
import { Actions, BaseThunk } from './store';

type profileType = {
  id: number;
  username: string;
  login: string;
  status: string | null;
};
const initialState = {
  profile: null as profileType | null,
  isFetching: false,
};
type initialStateType = typeof initialState;
const ProfileReducer = (state = initialState, action: ActionTypes): initialStateType => {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.profile };
    default:
      return state;
  }
};
type ActionTypes = Actions<typeof actions>;
type ThunkType = BaseThunk<ActionTypes>;
const actions = {
  _setProfile: (profile: profileType) => ({ type: 'SET_PROFILE', profile } as const),
};
export const getProfile =
  (userId: number | string): ThunkType =>
  async (dispatch) => {
    const profile = await ProfileAPI.getProfile(userId);
    if (profile) {
      dispatch(actions._setProfile(profile));
    }
  };
export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch, getState) => {
    const data = await ProfileAPI.updateStatus(status);
    if (data.status) {
      const userId = getState().profilePage.profile?.id;
      console.log(userId);
      if (userId) await dispatch(getProfile(userId));
    }
  };

export const updateUsername =
  (username: string): ThunkType =>
  async (dispatch, getState) => {
    const data = await ProfileAPI.updateUsername(username);
    if (data.username) {
      const userId = getState().profilePage.profile?.id;
      if (userId) await dispatch(getProfile(userId));
    }
  };
export default ProfileReducer;

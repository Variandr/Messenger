import { ProfileAPI } from '../../api/restAPI';
import { Actions, BaseThunk } from '../store';
import { Profile } from '../../../types/types';
import { actions as snackbarActions } from './snackbarReducer';

type State = typeof initialState;
type ActionTypes = Actions<typeof actions> | Actions<typeof snackbarActions>;
type ThunkType = BaseThunk<ActionTypes>;

const initialState = {
  profile: null as Profile | null,
  isFetching: false,
};
const ProfileReducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.profile };
    default:
      return state;
  }
};
const actions = {
  _setProfile: (profile: Profile) => ({ type: 'SET_PROFILE', profile } as const),
};
export const getProfile =
  (userId: number | string): ThunkType =>
  async (dispatch) => {
    const profile = await ProfileAPI.getProfile(userId);
    if (profile) {
      dispatch(actions._setProfile(profile));
    } else dispatch(snackbarActions.setSnackbar(true, 'error', `Profile wasn't found`));
  };
export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch, getState) => {
    const data = await ProfileAPI.updateStatus(status);
    if (data.status) {
      const userId = getState().profilePage.profile?.id;
      dispatch(snackbarActions.setSnackbar(true, 'success', 'Status was successfully changed'));
      if (userId) await dispatch(getProfile(userId));
    } else dispatch(snackbarActions.setSnackbar(true, 'error', `Status wasn't changed`));
  };

export const updateUsername =
  (username: string): ThunkType =>
  async (dispatch, getState) => {
    const data = await ProfileAPI.updateUsername(username);
    if (data.username) {
      const userId = getState().profilePage.profile?.id;
      dispatch(snackbarActions.setSnackbar(true, 'success', `Username was successfully changed`));
      if (userId) await dispatch(getProfile(userId));
    } else dispatch(snackbarActions.setSnackbar(true, 'error', `Username wasn't changed`));
  };
export default ProfileReducer;

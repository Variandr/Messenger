import { Actions } from '../store';
import { Snackbar } from '../../../types/types';
import { AlertColor } from '@mui/material';

type ActionTypes = Actions<typeof actions>;

const initialState = {
  open: false,
  severity: 'info' as AlertColor,
  message: '',
};
const SnackbarReducer = (state = initialState, action: ActionTypes): Snackbar => {
  switch (action.type) {
    case 'SET_SNACKBAR':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default SnackbarReducer;
export const actions = {
  setSnackbar: (open: boolean, severity: AlertColor, message: string) =>
    ({
      type: 'SET_SNACKBAR',
      payload: { open, severity, message },
    } as const),
};

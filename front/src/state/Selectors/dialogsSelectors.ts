import { StateType } from '../store';

export const getDialogsSelector = (state: StateType) => {
  return state.dialogsPage.dialogs;
};

export const getDialogDataSelector = (state: StateType) => {
  return state.dialogsPage.chat;
};

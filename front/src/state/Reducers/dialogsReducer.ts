import { DialogsAPI } from '../../api/restAPI';
import { Actions, BaseThunk } from '../store';
import { ChatState, Dialogs, Message, User } from '../../../types/types';
import { actions as snackbarActions } from './snackbarReducer';

type State = typeof initialState;
type ActionTypes = Actions<typeof actions> | Actions<typeof snackbarActions>;
type ThunkType = BaseThunk<ActionTypes>;

const initialState = {
  dialogs: null as Array<Dialogs> | null,
  chat: null as ChatState | null,
};

const changeMessages = (arr: ChatState | null, msg: Message, type: string) => {
  if (arr) {
    switch (type) {
      case 'ADD_MESSAGE': {
        const find = arr.messages.find((f) => f.date.slice(0, 10) === msg.created_at.slice(0, 10));
        if (find) {
          const messages = arr.messages.map((f) => {
            if (f.date.slice(0, 10) === msg.created_at.slice(0, 10))
              return { ...f, messages: [...f.messages, msg] };
            return f;
          });
          return { ...arr, messages: messages };
        } else
          return { ...arr, messages: [...arr.messages, { date: msg.created_at, messages: [msg] }] };
      }
      case 'EDIT_MESSAGE': {
        return {
          ...arr,
          messages: [
            ...arr.messages.map((m) => {
              if (m.date.slice(0, 10) === msg.created_at.slice(0, 10)) {
                const messages = m.messages.map((f) => {
                  if (f.id === msg.id) {
                    f.body = msg.body;
                    f.updated_at = msg.updated_at;
                  }
                  return f;
                });
                return { ...m, messages: messages };
              }
              return m;
            }),
          ],
        };
      }
      case 'DELETE_MESSAGE': {
        return {
          ...arr,
          messages: [
            ...arr.messages.map((m) => {
              if (m.date.slice(0, 10) === msg.created_at.slice(0, 10))
                return { ...m, messages: m.messages.filter((m) => m.id !== msg.id) };
              return m;
            }),
          ],
        };
      }
      default:
        return arr;
    }
  } else return null;
};
const DialogsReducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case 'SET_DIALOGS':
      return { ...state, dialogs: action.dialogs };
    case 'SET_DIALOG_DATA':
      return { ...state, chat: action.dialogData };
    case 'ADD_MESSAGE':
      return <State>{ ...state, chat: changeMessages(state.chat, action.msg, action.type) };
    case 'EDIT_MESSAGE':
      return <State>{ ...state, chat: changeMessages(state.chat, action.msg, action.type) };
    case 'DELETE_MESSAGE':
      return <State>{ ...state, chat: changeMessages(state.chat, action.msg, action.type) };
    default:
      return state;
  }
};
export default DialogsReducer;
export const actions = {
  setDialogs: (dialogs: Array<Dialogs>) => ({ type: 'SET_DIALOGS', dialogs } as const),
  setChat: (dialogData: ChatState) => ({ type: 'SET_DIALOG_DATA', dialogData } as const),
  addMessage: (msg: Message) => ({ type: 'ADD_MESSAGE', msg } as const),
  editMessage: (msg: Message) => ({ type: 'EDIT_MESSAGE', msg } as const),
  deleteMessage: (msg: Message) => ({ type: 'DELETE_MESSAGE', msg } as const),
};

export const addParticipant =
  (chatId: number, userId: number): ThunkType =>
  async (dispatch) => {
    const data = await DialogsAPI.addParticipant(chatId, userId);
    if (data) {
      dispatch(snackbarActions.setSnackbar(true, 'success', `User was added to the chat`));
    } else dispatch(snackbarActions.setSnackbar(true, 'error', `User wasn't added to the chat`));
  };

export const createChat =
  (chatName: string, users: Array<User>): ThunkType =>
  async (dispatch) => {
    const data = await DialogsAPI.createChat(chatName, users);
    if (data) {
      dispatch(snackbarActions.setSnackbar(true, 'success', `Chat was created`));
    } else dispatch(snackbarActions.setSnackbar(true, 'error', `Chat wasn't created`));
  };

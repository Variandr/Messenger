import { DialogsAPI } from '../../api/restAPI';
import { Actions, BaseThunk } from '../store';
import { Chat, Dialogs, Message, User } from '../../../types/types';

type State = typeof initialState;
type ActionTypes = Actions<typeof actions>;
type ThunkType = BaseThunk<ActionTypes>;

const initialState = {
  dialogs: null as Array<Dialogs> | null,
  chat: null as Chat | null,
};

const changeMessages = (arr: Chat | null, msg: Message, type: string) => {
  if (arr) {
    switch (type) {
      case 'ADD_MESSAGE':
        return { ...arr, messages: [...arr.messages, msg] };
      case 'EDIT_MESSAGE':
        return {
          ...arr,
          messages: [
            ...arr.messages.map((m) => {
              if (m.id === msg.id) {
                m.body = msg.body;
                m.updated_at = msg.updated_at;
              }
              return m;
            }),
          ],
        };
      case 'DELETE_MESSAGE':
        return { ...arr, messages: [...arr.messages.filter((m) => m.id !== msg.id)] };
    }
  }
  return null;
};

const DialogsReducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case 'SET_DIALOGS':
      return { ...state, dialogs: action.dialogs };
    case 'SET_DIALOG_DATA':
      return { ...state, chat: action.dialogData };
    case 'ADD_MESSAGE':
      return { ...state, chat: changeMessages(state.chat, action.msg, action.type) };
    case 'EDIT_MESSAGE':
      return { ...state, chat: changeMessages(state.chat, action.msg, action.type) };
    case 'DELETE_MESSAGE':
      return { ...state, chat: changeMessages(state.chat, action.msg, action.type) };
    default:
      return state;
  }
};
export default DialogsReducer;
export const actions = {
  setDialogs: (dialogs: Array<Dialogs>) => ({ type: 'SET_DIALOGS', dialogs } as const),
  setChat: (dialogData: Chat) => ({ type: 'SET_DIALOG_DATA', dialogData } as const),
  addMessage: (msg: Message) => ({ type: 'ADD_MESSAGE', msg } as const),
  editMessage: (msg: Message) => ({ type: 'EDIT_MESSAGE', msg } as const),
  deleteMessage: (msg: Message) => ({ type: 'DELETE_MESSAGE', msg } as const),
};

export const addParticipant =
  (chatId: number, userId: number): ThunkType =>
  async () => {
    await DialogsAPI.addParticipant(chatId, userId);
  };

export const createChat =
  (chatName: string, users: Array<User>): ThunkType =>
  async () => {
    await DialogsAPI.createChat(chatName, users);
  };

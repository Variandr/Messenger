import { dialogs } from '../../state/Reducers/dialogsReducer';

export const isChatExisting = (dialogs: Array<dialogs> | null, chatName: string) => {
  let isExisting = false;
  let chatId;
  dialogs?.map((d) => {
    if (d.chat_name === chatName) {
      isExisting = true;
      chatId = d.id;
    }
    return d;
  });
  return { isExisting: isExisting, chatId: chatId };
};

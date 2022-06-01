import { Dialogs } from '../../../types/types';

export const isChatExisting = (dialogs: Array<Dialogs> | null, chatName: string) => {
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

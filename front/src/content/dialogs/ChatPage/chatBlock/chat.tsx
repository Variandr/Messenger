import s from './chat.module.css';
import chatBg from './chatBg.png';
import { Button } from 'antd';
import { IoMdSend } from 'react-icons/io';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { messages } from '../../../../state/dialogsReducer';
import { MessageItem } from './messageItem';
import { useSelector } from 'react-redux';
import { getDialogDataSelector } from '../../../../selectors/dialogsSelectors';
import socket from '../../../../API/socket';
import { getUserId } from '../../../../selectors/authSelectors';

export const Chat: FC = () => {
  const userId = useSelector(getUserId);
  const dialogData = useSelector(getDialogDataSelector);
  useEffect(() => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
  }, [dialogData]);

  const [isEditingAvailable, setEditing] = useState(false);
  const [messageBody, setMessageBody] = useState<string>('');
  const addMessage = () => {
    if (dialogData) {
      socket.emit('chat:sendMessage', { chatId: dialogData.id, message: messageBody });
      setMessageBody('');
    }
  };

  const editMessage = (m: messages, messageForEdit: string) => {
    if (
      userId === m.user_id &&
      messageForEdit !== m.body &&
      messageForEdit.length > 0 &&
      dialogData
    ) {
      socket.emit('chat:changeMessage', {
        chatId: dialogData.id,
        msgId: m.id,
        message: messageForEdit,
      });
    }
  };

  const deleteMessageOnClick = (m: messages) => {
    if (userId === m.user_id && dialogData) {
      socket.emit('chat:deleteMessage', { chatId: dialogData.id, msgId: m.id });
    }
  };
  const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageBody(e.target.value);
  };
  const sortedMessages = dialogData?.messages.sort((a, b) => {
    return +new Date(a.created_at) - +new Date(b.created_at);
  });
  const showMessages = sortedMessages?.map((m) => {
    return (
      <MessageItem
        key={m.id}
        m={m}
        userId={userId}
        deleteMessageOnClick={deleteMessageOnClick}
        editMessage={editMessage}
        isEditingAvailable={isEditingAvailable}
        setEditing={setEditing}
      />
    );
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  return (
    <div className={s.chatContainer}>
      <img className={s.bg} src={chatBg} alt="chat-background" />
      <div className={s.messagesBlock}>
        <div>{showMessages}</div>
        <div ref={messagesEndRef} />
      </div>
      <div className={s.messageInputBlock}>
        <input
          className={s.messageInput}
          type="text"
          value={messageBody}
          onChange={onMessageChange}
          placeholder="Message"
        />
        <Button onClick={addMessage} type="primary">
          <IoMdSend />
        </Button>
      </div>
    </div>
  );
};

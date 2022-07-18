import s from './index.module.css';
import chatBg from './chatBg.png';
import React, { ChangeEvent, FC, useContext, useEffect, useRef, useState } from 'react';
import { MessageItem } from './messageItem';
import { useSelector } from 'react-redux';
import { getDialogDataSelector } from '../../../state/Selectors/dialogsSelectors';
import { SocketContext } from '../../../api/socket';
import { getUserId } from '../../../state/Selectors/authSelectors';
import { Message } from '../../../../types/types';
import { Box, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const Chat: FC = () => {
  const userId = useSelector(getUserId);
  const dialogData = useSelector(getDialogDataSelector);
  const socket = useContext(SocketContext);

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

  const editMessage = (m: Message, messageForEdit: string) => {
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

  const deleteMessageOnClick = (m: Message) => {
    if (userId === m.user_id && dialogData) {
      socket.emit('chat:deleteMessage', { chatId: dialogData.id, msgId: m.id });
    }
  };
  const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageBody(e.target.value);
  };

  const showMessages = dialogData?.messages.map((m) => {
    const newDate = new Date().getFullYear();
    const date = new Date(m.date).getFullYear();
    let showDate;
    if (newDate === date) {
      showDate = new Date(m.date).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
      });
    } else
      showDate = new Date(m.date).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    const messages = m.messages.map((msg) => {
      return (
        <MessageItem
          key={msg.id}
          m={msg}
          userId={userId}
          deleteMessageOnClick={deleteMessageOnClick}
          editMessage={editMessage}
          isEditingAvailable={isEditingAvailable}
          setEditing={setEditing}
        />
      );
    });
    return (
      <React.Fragment key={m.date + m.messages}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              color: 'white',
              fontWeight: 700,
              background: 'rgba(0, 0, 0, 0.31)',
              borderRadius: '8px',
              padding: '2px 10px',
            }}
          >
            {showDate}
          </div>
        </div>
        {messages}
      </React.Fragment>
    );
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  return (
    <Box width="75vw" height="85vh" sx={{ position: 'relative' }}>
      <img src={chatBg} className={s.bg} alt="chat background" />
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
        <Button disabled={!messageBody} onClick={addMessage} variant="contained">
          <SendIcon />
        </Button>
      </div>
    </Box>
  );
};

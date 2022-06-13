import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { actions } from '../../state/Reducers/dialogsReducer';
import { useDispatch } from 'react-redux';
import { ChatInfo } from './Info';
import { Chat } from './Chat';
import socket from '../../api/socket';
import { ChatState } from '../../../types/types';
import { Box } from '@mui/material';

const ChatPage: React.FC = () => {
  const dispatch = useDispatch();
  const { dialogId } = useParams();

  useEffect(() => {
    if (dialogId) {
      socket.emit('chat:join', { chatId: dialogId });
      socket.on('chatData', (data: ChatState) => {
        dispatch(actions.setChat(data));
      });
      socket.on('message', (req) => {
        console.log(req);
        switch (req.type) {
          case 'send-message':
            dispatch(actions.addMessage(req.data));
            break;
          case 'change-message':
            dispatch(actions.editMessage(req.data));
            break;
          case 'delete-message':
            dispatch(actions.deleteMessage(req.data));
        }
      });
    }
  }, [dialogId, dispatch]);
  return (
    <Box display="flex">
      <Chat />
      <ChatInfo />
    </Box>
  );
};
export default ChatPage;

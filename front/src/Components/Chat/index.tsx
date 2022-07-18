import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { actions } from '../../state/Reducers/dialogsReducer';
import { useDispatch } from 'react-redux';
import { ChatInfo } from './Info';
import { Chat } from './Chat';
import { ChatState } from '../../../types/types';
import { Box } from '@mui/material';
import { SocketContext } from '../../api/socket';

const ChatPage: React.FC = () => {
  const dispatch = useDispatch();
  const { dialogId } = useParams();
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (dialogId) {
      socket.emit('chat:join', { chatId: dialogId });
      socket.on('chatData', (data: ChatState) => {
        dispatch(actions.setChat(data));
      });
      socket.on('message', (req) => {
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
  }, [socket, dialogId, dispatch]);

  return (
    <Box display="flex">
      <Chat />
      <ChatInfo />
    </Box>
  );
};
export default ChatPage;

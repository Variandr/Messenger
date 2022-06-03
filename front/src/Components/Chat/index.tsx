import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { actions } from '../../state/Reducers/dialogsReducer';
import { useDispatch } from 'react-redux';
import withAuthRedirect from '../../helpers/hoc/withAuthRedirect';
import s from '../Dialogs/index.module.css';
import { ChatInfo } from './Info';
import { Chat } from './Chat';
import socket from '../../api/socket';
import { ChatState } from '../../../types/types';

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
    <div className={s.chatPage}>
      <Chat />
      <ChatInfo />
    </div>
  );
};
export default withAuthRedirect(ChatPage);

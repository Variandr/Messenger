import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import s from './users.module.css';
import { createChat } from '../../state/Reducers/dialogsReducer';
import ChatIcon from '@mui/icons-material/Chat';
import { NavLink } from 'react-router-dom';
import { isChatExisting } from '../../helpers/isChatExisting';
import { UsersProps } from '../../../types/types';

const Users: FC<UsersProps> = ({ u, myData, userId, dialogs }) => {
  const dispatch = useDispatch();
  if (u.id === userId) return null;
  const data = isChatExisting(dialogs, u.username);
  return (
    <div className={s.userBlock}>
      <NavLink end to={'/Profile/' + u.id} className={s.navLink}>
        <div className={s.userNickAndImgBlock}>
          <div className={s.memberImg}>{u.username[0].toUpperCase()}</div>
          <div className={s.userNick}>{u.username}</div>
        </div>
      </NavLink>
      <div className={s.userTextBtnBlock}>
        {data.isExisting ? (
          <NavLink to={'/Dialogs/' + data.chatId} className={s.navLink}>
            <ChatIcon />
          </NavLink>
        ) : (
          <ChatIcon
            onClick={() => {
              dispatch(createChat(u.login, [...myData, { id: u.id, username: u.username }]));
            }}
            className={s.userTextBtn}
          />
        )}
      </div>
    </div>
  );
};
export default Users;

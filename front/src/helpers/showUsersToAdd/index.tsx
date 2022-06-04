import isUserParticipant from '../isUserParticipant';
import s from './index.module.css';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getUsersSelector } from '../../state/Selectors/usersSelectors';
import { ShowFreeUsersProps } from '../../../types/types';
import { Avatar } from '@mui/material';

const ShowFreeUsers: FC<ShowFreeUsersProps> = ({ chatMembers, setUsersShow, addParticipant }) => {
  const users = useSelector(getUsersSelector);
  const showUsers = users?.map((u) => {
    const d = new Date(u.last_online);
    const localDate = new Date();
    const offline = () => {
      if (d.getDate() === localDate.getDate()) {
        return d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      } else return 'last seen recently';
    };
    const check = isUserParticipant(chatMembers, u.id);
    if (check) return null;
    return (
      <div
        key={u.id}
        className={s.chatMemberBlock}
        onClick={() => {
          addParticipant(u.id, u.username);
          setUsersShow(false);
        }}
      >
        <Avatar alt="user avatar">{u.username[0].toUpperCase()}</Avatar>
        <div>
          <div className={s.memberName + ' ' + s.truncateText}>{u.username}</div>
          <div className={u.online ? s.onlineStatus : s.offlineStatus}>
            {u.online ? 'online' : offline()}
          </div>
        </div>
      </div>
    );
  });
  return <div>{showUsers}</div>;
};
export default ShowFreeUsers;

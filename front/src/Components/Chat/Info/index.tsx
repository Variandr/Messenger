import s from './index.module.css';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { addParticipant } from '../../../state/Reducers/dialogsReducer';
import { getDialogDataSelector } from '../../../state/Selectors/dialogsSelectors';
import ShowFreeUsers from '../../../helpers/showUsersToAdd';
import { Avatar } from '@mui/material';

export const ChatInfo: FC = () => {
  const dispatch = useDispatch();
  const dialogData = useSelector(getDialogDataSelector);
  const [isUsersShow, setUsersShow] = useState(false);
  const participants = dialogData?.chatMembers.map((m) => {
    const d = new Date(m.last_online);
    const localDate = new Date();
    const offline = () => {
      if (d.getDate() === localDate.getDate()) {
        return d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      } else return 'last seen recently';
    };
    return (
      <div key={m.id} className={s.chatMemberBlock}>
        <Avatar alt="user avatar">{m.username[0].toUpperCase()}</Avatar>
        <div>
          <div className={s.memberName + ' ' + s.truncateText}>{m.username}</div>
          <div className={m.online ? s.onlineStatus : s.offlineStatus}>
            {m.online ? 'online' : offline()}
          </div>
        </div>
      </div>
    );
  });
  const setParticipant = (id: number) => {
    if (dialogData) dispatch(addParticipant(dialogData.id, id));
  };

  return (
    <div className={s.infoBlock}>
      <div className={s.chatName + ' ' + s.truncateText}>{dialogData?.chat_name}</div>
      <div className={s.participantsBlock}>
        <div>Participants</div>
        <div className={s.participants}>{participants}</div>
        <div className={s.addParticipantBtnBlock}>
          <PersonAddAltRoundedIcon
            className={s.addParticipantBtn}
            onClick={() => setUsersShow(!isUsersShow)}
          />
        </div>
        {isUsersShow && (
          <div className={s.usersBlock}>
            <ShowFreeUsers
              chatMembers={dialogData && dialogData.chatMembers}
              setUsersShow={setUsersShow}
              addParticipant={setParticipant}
            />
          </div>
        )}
      </div>
    </div>
  );
};

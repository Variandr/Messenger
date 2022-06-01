import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, createChat, user } from '../../state/Reducers/dialogsReducer';
import { getDialogsSelector } from '../../state/Selectors/dialogsSelectors';
import s from './index.module.css';
import { NavLink } from 'react-router-dom';
import withAuthRedirect from '../../helpers/hoc/withAuthRedirect';
import { BiCommentAdd } from 'react-icons/bi';
import { IoMdPersonAdd } from 'react-icons/io';
import { AiOutlineSend } from 'react-icons/ai';
import { getUserId, getUserLogin } from '../../state/Selectors/authSelectors';
import ShowFreeUsers from '../../helpers/showUsersToAdd';
import socket from '../../api/socket';

const DialogsPage = () => {
  const showDate = (date: string) => {
    const d = new Date(date);
    const localDate = new Date();
    if (d.getDate() === localDate.getDate()) {
      return d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    } else if (Math.abs(d.getDate() - localDate.getDate()) <= 7) {
      return d.toLocaleString('en-US', { weekday: 'short' });
    } else if (d.getFullYear() === localDate.getFullYear()) {
      const month = d.toLocaleString('en-US', { month: 'short' }).toLowerCase();
      const day = d.toLocaleString('en-US', { day: '2-digit' });
      return day + ' ' + month + '.';
    } else return d.toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  const dispatch = useDispatch();
  const dialogs = useSelector(getDialogsSelector);
  const userId = useSelector(getUserId) || null;
  const login = useSelector(getUserLogin) || null;
  useEffect(() => {
    socket.emit('Dialogs:join');
  }, []);
  useEffect(() => {
    socket.on('dialogs', (dialogs) => {
      dispatch(actions.setDialogs(dialogs));
    });
  });
  let DialogItems;
  if (dialogs) {
    const sortedDialogs = dialogs.sort((a, b) => {
      const bDate = b.updated_at ? b.updated_at : b.created_at;
      const aDate = a.updated_at ? a.updated_at : a.created_at;
      return +new Date(bDate) - +new Date(aDate);
    });
    DialogItems = sortedDialogs.map((d) => {
      const actualDate = d.updated_at ? d.updated_at : d.created_at;
      return (
        <div key={d.id} className={s.dialogContainer}>
          <NavLink to={'/Dialogs/' + d.id} className={s.navLink}>
            <div className={s.chatAndDateBlock}>
              <div className={s.chatName}>{d.chat_name}</div>
              <div className={s.date}>{showDate(actualDate)}</div>
            </div>
            <div className={s.dialogText}>
              <div className={s.username}>{d.username ? d.username + ':' : ''}</div>
              <div className={s.truncateText}>{d.message && d.message}</div>
            </div>
          </NavLink>
        </div>
      );
    });
  }

  const [isAddChat, setAddChat] = useState(false);
  const [chatName, setChatName] = useState('');
  const [isUsersShow, setUsersShow] = useState(false);
  const [participants, setParticipant] = useState<Array<user>>([{ id: userId, username: login }]);
  const addParticipant = (id: number, username: string) => {
    setParticipant([...participants, { id: id, username: username }]);
  };
  const showParticipants = participants.map((p) => {
    if (p.id === userId) return null;
    return (
      <div key={p.id} className={s.participants}>
        <div className={s.participantImg}>{p.username && p.username[0].toUpperCase()}</div>
        <div className={s.participantName}>{p.username}</div>
      </div>
    );
  });
  return (
    <div className={s.dialogsPageBlock}>
      <div>
        <div>{DialogItems}</div>
        <div className={s.addChatBtnBlock}>
          <BiCommentAdd className={s.addChatBtn} onClick={() => setAddChat(!isAddChat)} />
        </div>
      </div>
      {isAddChat && (
        <div className={s.addChatBlock}>
          <input
            type="text"
            placeholder="Input chat name..."
            className={s.chatNameInput}
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
          />
          <div className={s.participants}>
            {showParticipants}
            <div className={s.addParticipantBtnBlock}>
              <IoMdPersonAdd className={s.addParticipantBtn} onClick={() => setUsersShow(true)} />
            </div>
          </div>
          {isUsersShow && (
            <div className={s.usersBlock}>
              <ShowFreeUsers
                chatMembers={participants}
                setUsersShow={setUsersShow}
                addParticipant={addParticipant}
              />
            </div>
          )}
          {participants.length > 1 && chatName.length > 3 && chatName.length < 40 && (
            <div className={s.createChatBtnBlock}>
              <AiOutlineSend
                className={s.createChatBtn}
                onClick={() => {
                  dispatch(createChat(chatName, participants));
                  setAddChat(false);
                  setChatName('');
                  setParticipant([]);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default withAuthRedirect(DialogsPage);

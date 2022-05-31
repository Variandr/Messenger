import React, { useState } from 'react';
import s from './chat.module.css';
import { TiDelete } from 'react-icons/ti';
import { messages } from '../../../../state/dialogsReducer';

interface Props {
  userId: number | null;
  isEditingAvailable: boolean;
  m: messages;

  editMessage(m: messages, messageForEdit: string): void;

  deleteMessageOnClick(m: messages): void;

  setEditing(prop: boolean): void;
}

export const MessageItem: React.FC<Props> = ({
  userId,
  editMessage,
  deleteMessageOnClick,
  m,
  setEditing,
  isEditingAvailable,
}) => {
  const [isEdit, setEdit] = useState(false);
  const [messageForEdit, setMessage] = useState<string>('');
  const date = new Date(m.created_at).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const onMessageForEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  return (
    <div key={m.id} className={s.messageContainer}>
      {userId === m.user_id ? (
        <div className={s.myMessageBlock}>
          {isEdit ? (
            <div className={s.chat + ' ' + s.right}>
              <textarea
                value={messageForEdit}
                onChange={onMessageForEditChange}
                onBlur={() => {
                  setEditing(false);
                  setEdit(false);
                  editMessage(m, messageForEdit);
                }}
                className={s.messageEditInput}
              />
              <TiDelete
                className={s.deleteBtn}
                onClick={() => {
                  deleteMessageOnClick(m);
                  setEditing(false);
                  setEdit(false);
                }}
              />
            </div>
          ) : (
            <div className={s.chat + ' ' + s.right}>
              <div className={s.bodyMessageBlock}>
                <div
                  className={s.message}
                  onDoubleClick={() => {
                    if (!isEditingAvailable) {
                      setEdit(true);
                      setEditing(true);
                      setMessage(m.body);
                    }
                  }}
                >
                  {m.body}
                </div>
                <div className={s.date}>
                  {m.updated_at && 'updated'} {date}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={s.messageBlock}>
          <div className={s.avatar}>{m.username[0].toUpperCase()}</div>
          <div className={s.chat + ' ' + s.left}>
            <div className={s.username + ' ' + s.truncateText}>{m.username}</div>
            <div className={s.bodyMessageBlock}>
              <div className={s.message}>{m.body}</div>
              <div className={s.date}>
                {m.updated_at && 'updated'} {date}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

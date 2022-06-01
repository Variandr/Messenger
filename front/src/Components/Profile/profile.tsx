import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus, updateUsername } from '../../state/Reducers/profileReducer';
import { getProfile } from '../../state/Selectors/profileSelectors';
import { getUserId } from '../../state/Selectors/authSelectors';

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const userId = useSelector(getUserId);
  const editStatus = () => {
    if (profile && profile.status !== status && status) dispatch(updateStatus(status));
  };
  const editUsername = () => {
    if (profile && profile.username !== username && username) dispatch(updateUsername(username));
  };
  let isMyProfile = false;
  if (profile) {
    isMyProfile = userId === profile.id;
  }
  const [status, setStatus] = useState<string | null>(profile ? profile.status : null);
  const [username, setUsername] = useState<string | null>(profile ? profile.username : null);
  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };
  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const [isEditUsername, setEditUsername] = useState(false);
  const [isEditStatus, setEditStatus] = useState(false);
  return (
    <div>
      {isMyProfile && isEditUsername && !isEditStatus ? (
        <div>
          <input
            onBlur={() => {
              setEditUsername(false);
              editUsername();
            }}
            onChange={onUsernameChange}
            value={username ? username : ''}
          />
        </div>
      ) : (
        <div onDoubleClick={() => !isEditStatus && setEditUsername(true)}>
          {profile && profile.username}
        </div>
      )}
      {isMyProfile && isEditStatus && !isEditUsername ? (
        <div>
          AboutMe:
          <input
            onBlur={() => {
              setEditStatus(false);
              editStatus();
            }}
            onChange={onStatusChange}
            value={status ? status : ''}
          />
        </div>
      ) : (
        <div onDoubleClick={() => !isEditUsername && setEditStatus(true)}>
          AboutMe: {profile && profile.status}
        </div>
      )}
    </div>
  );
};
export default Profile;

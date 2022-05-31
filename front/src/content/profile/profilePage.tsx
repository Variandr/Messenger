import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Profile from './profile';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import { getProfile } from '../../state/profileReducer';
import { useParams } from 'react-router-dom';

const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) dispatch(getProfile(id));
  }, [id, dispatch]);
  return <Profile />;
};
export default withAuthRedirect(ProfilePage);

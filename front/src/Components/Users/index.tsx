import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Users from './users';
import { getUsers } from '../../state/Reducers/usersReducer';
import { getUsersSelector } from '../../state/Selectors/usersSelectors';
import { getUserId, getUserLogin } from '../../state/Selectors/authSelectors';
import { getDialogsSelector } from '../../state/Selectors/dialogsSelectors';

const UsersPage: FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersSelector);
  const dialogs = useSelector(getDialogsSelector);
  const userId = useSelector(getUserId);
  const login = useSelector(getUserLogin);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const myData = [{ id: userId, username: login }];
  const showUsers = users?.map((u) => {
    return <Users dialogs={dialogs} key={u.id} u={u} myData={myData} userId={userId} />;
  });
  return <div>{showUsers}</div>;
};
export default UsersPage;

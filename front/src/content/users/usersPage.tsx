import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Users from './users';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import { getUsers } from '../../state/usersReducer';
import { getUsersSelector } from '../../selectors/usersSelectors';
import { getUserId, getUserLogin } from '../../selectors/authSelectors';
import { getDialogsSelector } from '../../selectors/dialogsSelectors';

const UsersPage = () => {
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
export default withAuthRedirect(UsersPage);

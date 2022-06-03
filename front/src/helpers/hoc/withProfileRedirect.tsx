import React, { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuth, getUserId } from '../../state/Selectors/authSelectors';

const withProfileRedirect = <T,>(Component: ComponentType<T>) => {
  return (hocProps: Omit<T, 'isAuth' | 'userId'>) => {
    const isAuth = useSelector(getAuth);
    const userId = useSelector(getUserId);
    if (isAuth) return <Navigate to={'/profile/' + userId} />;
    return <Component {...(hocProps as T)} />;
  };
};

export default withProfileRedirect;

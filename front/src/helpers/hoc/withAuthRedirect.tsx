import React, { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuth } from '../../state/Selectors/authSelectors';

const withAuthRedirect = <T,>(Component: ComponentType<T>) => {
  return (hocProps: Omit<T, 'isAuth'>) => {
    const isAuth = useSelector(getAuth);
    if (!isAuth) return <Navigate to="/auth" />;
    return <Component {...(hocProps as T)} />;
  };
};

export default withAuthRedirect;

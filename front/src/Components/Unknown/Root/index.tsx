import React, { useEffect } from 'react';
import { initializeApp } from '../../../state/Reducers/appReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../../../state/Selectors/authSelectors';
import { getInitialize } from '../../../state/Selectors/appSelectors';
import { App } from '../App';
import Auth from '../../Auth';
import SnackbarUI from '../../Snackbar';
import { CircularProgress } from '@mui/material';
import socket from '../../../api/socket';

const Root: React.FC = () => {
  const isAuth = useSelector(getAuth);
  const isInitialized = useSelector(getInitialize);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isInitialized) {
      dispatch(initializeApp());
    }
    if (isAuth) {
      socket.connect();
    }
  }, [isInitialized, dispatch, isAuth]);
  return (
    <>
      <SnackbarUI />
      {isInitialized ? (
        isAuth ? (
          <App />
        ) : (
          <Auth />
        )
      ) : (
        <CircularProgress sx={{ margin: 'auto' }} size={100} />
      )}
    </>
  );
};
export default Root;

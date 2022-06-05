import React, { useEffect } from 'react';
import { initializeApp } from '../../../state/Reducers/appReducer';
import Preloader from '../../../helpers/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../../../state/Selectors/authSelectors';
import { getInitialize } from '../../../state/Selectors/appSelectors';
import { App } from '../App';
import Auth from '../../Auth';
import SnackbarUI from '../../Snackbar';

const Root: React.FC = () => {
  const isAuth = useSelector(getAuth);
  const isInitialized = useSelector(getInitialize);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isInitialized) {
      dispatch(initializeApp());
    }
  }, [isInitialized, dispatch]);
  return (
    <>
      <SnackbarUI />
      {isInitialized ? isAuth ? <App /> : <Auth /> : <Preloader />}
    </>
  );
};
export default Root;

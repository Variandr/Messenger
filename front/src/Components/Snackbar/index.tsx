import React from 'react';
import { Alert, Fade, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../state/Reducers/snackbarReducer';
import { StateType } from '../../state/store';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackbarUI = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector((state: StateType) => state.snackbar.open);
  const severity = useSelector((state: StateType) => state.snackbar.severity);
  const message = useSelector((state: StateType) => state.snackbar.message);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(actions.setSnackbar(false, severity, message));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Alert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarUI;

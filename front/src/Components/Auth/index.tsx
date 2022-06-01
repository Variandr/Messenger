import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import Auth from './login';
import { login, registration } from '../../state/Reducers/authReducer';
import { compose } from 'redux';
import withProfileRedirect from '../../helpers/hoc/withProfileRedirect';
import { AuthProps } from '../../../types/types';

const AuthorizationContainer: React.FC<AuthProps> = (props) => {
  return <Auth login={props.login} registration={props.registration} />;
};

export default compose(
  withProfileRedirect,
  connect(null, { login, registration })
)(AuthorizationContainer) as ComponentType;

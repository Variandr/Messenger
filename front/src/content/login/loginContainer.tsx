import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import Auth from './login';
import { login, registration } from '../../state/authReducer';
import { compose } from 'redux';
import withProfileRedirect from '../../HOC/withProfileRedirect';

export interface Props {
  login(log: string, password: string, remember: boolean): void;

  registration(log: string, password: string, username: string | null, remember: boolean): void;
}

const AuthorizationContainer: React.FC<Props> = (props) => {
  return <Auth login={props.login} registration={props.registration} />;
};

export default compose(
  withProfileRedirect,
  connect(null, { login, registration })
)(AuthorizationContainer) as ComponentType;

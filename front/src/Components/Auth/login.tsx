import React, { useState } from 'react';
import s from './login.module.css';
import { SignInForm, SignUpForm } from './signForms';
import { Props } from './index';

export interface Login {
  login: string;
  password: string;
  remember: boolean;
}

export interface Register extends Login {
  username: string;
}

const Auth: React.FC<Props> = ({ login, registration }) => {
  const [isSignUp, setSignUp] = useState(false);
  const onSubmit = (values: Login) => {
    login(values.login, values.password, values.remember);
  };
  const onSubmitReg = (values: Register) => {
    registration(values.login, values.password, values.username, values.remember);
  };
  const RedirectRegForm = () => setSignUp(true);
  const RedirectLoginForm = () => setSignUp(false);
  return (
    <div className={s.body}>
      {isSignUp ? (
        <SignUpForm onSubmit={onSubmitReg} setSignUp={RedirectLoginForm} />
      ) : (
        <SignInForm onSubmit={onSubmit} setSignUp={RedirectRegForm} />
      )}
    </div>
  );
};

export default Auth;

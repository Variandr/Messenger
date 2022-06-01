import React, { useState } from 'react';
import s from './login.module.css';
import { SignInForm, SignUpForm } from './signForms';
import { AuthProps, LoginValues, RegisterValues } from '../../../types/types';

const Auth: React.FC<AuthProps> = ({ login, registration }) => {
  const [isSignUp, setSignUp] = useState(false);
  const onSubmit = (values: LoginValues) => {
    login(values.login, values.password, values.remember);
  };
  const onSubmitReg = (values: RegisterValues) => {
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

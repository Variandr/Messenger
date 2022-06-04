import { Box } from '@mui/material';
import React from 'react';
import * as yup from 'yup';
import Login from './Login';
import Register from './Register';
import { Route, Routes, Navigate } from 'react-router-dom';
import background from './background.png';

export const baseSchema = yup.object({
  login: yup
    .string()
    .min(5, 'Login should be of minimum 8 characters length')
    .max(20, 'Login should be of maximum 20 characters length')
    .required('Login is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .max(40, 'Password should be of maximum 40 characters length')
    .required('Password is required'),
  remember: yup.boolean(),
});

const Auth: React.FC = () => {
  return (
    <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
      <img
        alt="background"
        src={background}
        style={{ zIndex: -1, position: 'absolute', width: '100vw', height: '100vh' }}
      />
      <Box
        sx={{
          width: 400,
          height: 400,
          boxShadow: '4px 4px 5px 2px rgba(0,0,0,0.25)',
          background: 'rgba(220,220,220,0.75)',
        }}
      >
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Box>
    </Box>
  );
};
export default Auth;

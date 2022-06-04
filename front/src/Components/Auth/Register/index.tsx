import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { pink } from '@mui/material/colors';
import { registration } from '../../../state/Reducers/authReducer';
import { useDispatch } from 'react-redux';
import { baseSchema } from '../index';
import { NavLink } from 'react-router-dom';

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const validationSchema = baseSchema.shape({
    username: yup
      .string()
      .min(5, 'Username should be of minimum 8 characters length')
      .max(20, 'Username should be of maximum 20 characters length'),
  });

  const handleClickShowPassword = () => {
    setShow(!show);
  };

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      username: '',
      remember: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(registration(values.login, values.password, values.username, values.remember));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <FormControl sx={{ ml: 5, mt: 5, width: 300 }} variant="outlined">
          <TextField
            id="login"
            name="login"
            label="Login"
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
        </FormControl>
        <FormControl sx={{ m: 2, ml: 5, width: 300 }} variant="outlined">
          <TextField
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </FormControl>
        <FormControl sx={{ ml: 5, width: 300 }} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={show ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.touched.password && (
            <FormHelperText error>{formik.errors.password}</FormHelperText>
          )}
        </FormControl>
        <FormControl sx={{ ml: 5, width: 300 }} variant="outlined">
          <FormControlLabel
            control={
              <Checkbox
                id="remember"
                value={formik.values.remember}
                onChange={formik.handleChange}
                sx={{
                  color: pink[800],
                  '&.Mui-checked': {
                    color: pink[600],
                  },
                }}
              />
            }
            label="Remember me"
          />
        </FormControl>
        <FormControl sx={{ ml: 5, width: 300 }} variant="outlined">
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: pink[800], '&:hover': { bgcolor: pink[800] }, mb: 3 }}
          >
            Register
          </Button>
        </FormControl>
      </form>
      <Typography variant="button" display="block" gutterBottom sx={{ ml: 5, width: 300 }}>
        Already registered?{' '}
        <NavLink replace to="/login" style={{ textDecoration: 'none' }}>
          Login Here
        </NavLink>
      </Typography>
    </>
  );
};
export default Register;

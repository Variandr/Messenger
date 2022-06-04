import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { login } from '../../../state/Reducers/authReducer';
import { baseSchema } from '../index';
import { NavLink } from 'react-router-dom';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClickShowPassword = () => {
    setShow(!show);
  };

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      remember: false,
    },
    validationSchema: baseSchema,
    onSubmit: (values) => {
      dispatch(login(values.login, values.password, values.remember));
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
        <FormControl sx={{ m: 5, width: 300 }} variant="outlined">
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
            label="Password"
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
            Login
          </Button>
        </FormControl>
      </form>
      <Typography variant="button" display="block" gutterBottom sx={{ ml: 5, width: 300 }}>
        Don&apos;t have an account?{' '}
        <NavLink replace to="/register" style={{ textDecoration: 'none' }}>
          Register Here
        </NavLink>
      </Typography>
    </>
  );
};
export default Login;

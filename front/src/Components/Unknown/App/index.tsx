import React, { FC } from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Profile from '../../../Components/Profile/index';
import UsersPage from '../../../Components/Users/index';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId, getUserLogin } from '../../../state/Selectors/authSelectors';
import { logout } from '../../../state/Reducers/authReducer';
import DialogsPage from '../../Dialogs';
import Chat from '../../Chat';
import socket from '../../../api/socket';
import NotFound from '../NotFound';
import logo from './logo.png';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import { actions } from '../../../state/Reducers/snackbarReducer';

const Dialogs: FC = () => {
  return (
    <div>
      <Routes>
        <Route path=":dialogId" element={<Chat />} />
        <Route path="" element={<DialogsPage />} />
      </Routes>
    </div>
  );
};

export const App: FC = () => {
  const pages = [
    {
      name: 'Users',
      url: 'users',
    },
    {
      name: 'Dialogs',
      url: 'dialogs',
    },
  ];
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();
  const login = useSelector(getUserLogin);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box width="100vw" height="100vh">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img style={{ width: '10vw' }} src={logo} alt="logo" />
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <Menu
                open
                id="navbar"
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={NavLink}
                  to={page.url}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleClick} sx={{ ml: 2 }}>
                  <Avatar alt="user">{login ? login[0].toUpperCase() : null}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={() => setAnchorEl(null)}
                onClick={() => setAnchorEl(null)}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem component={NavLink} to={'/profile/' + userId}>
                  <Avatar alt="user">{login ? login[0].toUpperCase() : null}</Avatar> Profile
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    socket.disconnect();
                    dispatch(logout());
                    dispatch(actions.setSnackbar(true, 'success', `You successfully logout`));
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        <Route path="/" element={<Navigate to={'/profile/' + userId} />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/register" element={<Navigate to="/" />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="dialogs/*" element={<Dialogs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
};

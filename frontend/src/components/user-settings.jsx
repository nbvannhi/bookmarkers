import { authActions } from '../store';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const USER_SETTINGS = ['Profile', 'Account', 'Dashboard', 'Sign out'];

function UserSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const sendSignOutRequest = async () => {
    const res = await axios.post('http://localhost:5000/api/signout', null, {
      withCredentials: true,
    }).catch((err) => console.log(err.response));

    if (res.status === 200) {
      localStorage.removeItem('userId');
      return res;
    }
    return new Error('Unable to sign out. Please try again.');
  };

  const handleSignOut = () => {
    sendSignOutRequest()
      .then(() => dispatch(authActions.signOut()))
      .then(() => navigate('/signin'));
  };

  const ON_CLICK_FUNCTIONS = [handleCloseUserMenu, handleCloseUserMenu, handleCloseUserMenu, handleSignOut];

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {USER_SETTINGS.map((setting, index) => (
          <MenuItem key={setting} onClick={ON_CLICK_FUNCTIONS[index]}>
            <Typography textAlign='center'>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default UserSettings;

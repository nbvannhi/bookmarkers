import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AuthOptions() {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='inherit'
          onClick={() => navigate('/signup')}
        >
          <PersonOutlineIcon />
        </IconButton>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='inherit'
          onClick={() => navigate('/signin')}
        >
          <LoginIcon />
        </IconButton>
      </Box>
      <Box sx={{display: { xs: 'none', md: 'flex' } }}>
        <Button
          sx={{ my: 2, color: 'white', display: 'block' }}
          onClick={() => navigate('/signup')}
        >
          Sign up
        </Button>
        <Button
          sx={{ my: 2, color: 'white', display: 'block' }}
          onClick={() => navigate('/signin')}
        >
          Sign in
        </Button>
      </Box>
    </>
  );
}

export default AuthOptions;

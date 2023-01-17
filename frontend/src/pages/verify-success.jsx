import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function VerifySuccess() {
  const navigate = useNavigate();

  return (
    <Box marginTop={10}>
      <h1>Your account has been set up successfully! Click the button below to sign in:</h1>
      <Button
        onClick={() => navigate('./signin')}
        variant='contained'
      >
        Sign in
      </Button>
    </Box>
  );
}

export default VerifySuccess;

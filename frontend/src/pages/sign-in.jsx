import { authActions } from '../store';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios.post('http://localhost:5000/api/signin', {
      email: inputs.email,
      password: inputs.password,
    }).catch((err) => console.error(err.response));
    const data = await res.data;
    const user = data.user;

    if (user.verified) {
      dispatch(authActions.signIn());
      localStorage.setItem('userId', String(user._id));
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((isVerified) => {
        const to = isVerified ? '/user' : '/verifyemail';
        navigate(to);
      });
  };


  // redirect user to User page immediately if persistent sign-in 
  // is previously selected
  useEffect(() => {
    if (localStorage.getItem('userId') != null) {
      navigate('/user');
    }
  }, [navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          marginTop={10}
          marginLeft='auto'
          marginRight='auto'
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Typography variant='h2'>Sign in</Typography>
          <TextField name='email' onChange={handleChange} type={'email'} value={inputs.email} variant='outlined' placeholder='Email' margin='normal' />
          <TextField name='password' onChange={handleChange} type={'password'} value={inputs.password} variant='outlined' placeholder='Password' margin='normal' />
          <Button variant='contained' type='submit'>Sign in</Button>
        </Box>
      </form>
    </div>
  );
}

export default SignIn;

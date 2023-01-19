import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const sendRequest = async () => {
    await axios.post('http://localhost:5000/api/signup', {
      email: inputs.email,
      username: inputs.username,
      password: inputs.password,
    }).catch((err) => console.log(err.response));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate('/verifyemail'));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          marginTop={10}
          marginLeft='auto'
          marginRight='auto'
          width={300}
          display='flex'
          flexDirection={'column'}
          justifyContent='center'
          alignItems='center'
        >
          <Typography variant='h2'>Sign up</Typography>
          <TextField name='email' onChange={handleChange} type={'email'} value={inputs.email} variant='outlined' placeholder='Email' margin='normal' />
          <TextField name='username' onChange={handleChange} value={inputs.username} variant='outlined' placeholder='Username' margin='normal' />
          <TextField name='password' onChange={handleChange} type={'password'} value={inputs.password} variant='outlined' placeholder='Password' margin='normal' />
          <Button variant='contained' type='submit'>Sign up</Button>
        </Box>
      </form>
    </div>
  )
}

export default SignUp;

import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from "notistack";
import axios from 'axios';

function SignUp() {
   const { enqueueSnackbar } = useSnackbar();
  const history = useNavigate();
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
  console.log(inputs);
   if(validateInput(inputs))
   {
    e.preventDefault();
  
    sendRequest().then(() => history('/signin'));
   }
   else{
    if(inputs.username.length===0 )
    {    
      enqueueSnackbar("Username is a required field", { variant: `error` });
    }
    else if(inputs.username.length<6)
    {  
      enqueueSnackbar("Username must be at least 6 characters",  { variant: `error` });
    }
    else if(inputs.password.length===0)
    {
      enqueueSnackbar("Password is a required field",  { variant: `error` });
    }
    else if(inputs.password.length<6)
    {
      enqueueSnackbar("Password must be at least 6 characters", { variant: `error` });
    }
    else if(inputs.email.length===0)
    {
      enqueueSnackbar("Email should not be empty", { variant: `error` });
    }
    
   }
  };
  const validateInput = (data) => {
    if(data.username.length===0 ||data.username.length<6)
      {
        return false;
      }
    else if(data.password.length===0 ||data.password.length<6)
    {
      return false;
    }
    else if(data.email.length===0)
    { console.log(data.email,"Asda");
      return false;
    }
    
  return true;   
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

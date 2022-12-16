import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store';

function SignIn() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async () => {
        const res = await axios.post('http://localhost:5000/api/signin', {
            email: inputs.email,
            password: inputs.password,
        }).catch((err) => console.log(err.response));
        const data = await res.data;
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
            .then(() => dispatch(authActions.signIn()))
            .then(() => localStorage.setItem('isSignedIn', true))
            .then(() => history('/user'));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    marginLeft='auto'
                    marginRight='auto'
                    width={300}
                    display='flex'
                    flexDirection={'column'}
                    justifyContent='center'
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

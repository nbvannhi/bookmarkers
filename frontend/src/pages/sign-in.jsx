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
    const [persist, setPersist] = useState(localStorage.getItem('userId') != null);

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
        const userId = data.user._id;

        await dispatch(authActions.signIn());

        if (persist) {
            localStorage.setItem('userId', String(userId));
        }
    };

    const togglePersist = () => {
        setPersist((prev) => !prev);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
            .then(() => navigate('/user'));
    };

    
    // redirect user to User page immediately if persistent sign-in 
    // is previously selected
    useEffect(() => {
        if (localStorage.getItem('userId') != null) {
            navigate('/user');
        }
    }, []);
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
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
                    <div>
                        <input
                            type='checkbox'
                            id='persist'
                            onChange={togglePersist}
                            checked={persist}
                        />
                        <label>Keep me signed in</label>
                    </div>
                </Box>
            </form>
        </div>
    );
}

export default SignIn;

import axios from 'axios';
import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store';

axios.defaults.withCredentials = true;

function SignOutButton() {
    const dispatch = useDispatch();
    const history = useNavigate();

    const sendSignOutRequest = async () => {
        const res = await axios.post('http://localhost:5000/api/signout', null, {
            withCredentials: true,
        }).catch((err) => console.log(err.response));

        if (res.status === 200) {
            return res;
        }
        return new Error('Unable to sign out. Please try again.');
    };

    const handleSignOut = () => {
        sendSignOutRequest()
            .then(() => dispatch(authActions.signOut()))
            .then(() => localStorage.clear())
            .then(() => history('/signin'));
    };

    return (
        <div>
            <Button onClick={handleSignOut} variant='contained'>
                Sign out
            </Button>
        </div>
    );
}

export default SignOutButton;

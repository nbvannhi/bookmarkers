import SignOutButton from '../components/sign-out-button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

axios.defaults.withCredentials = true;

function User() {
    let firstRender = true;

    const [user, setUser] = useState();
    const signedInState = useSelector((state) => state.isSignedIn);

    const refreshToken = async () => {
        const res = await axios.get('http://localhost:5000/api/refresh', {
            withCredentials: true,
        }).catch((err) => console.log(err.response));
        const data = await res.data;
        return data;
    }
    const sendRequest = async () => {
        let res;
        if (signedInState) {
            res = await axios.get('http://localhost:5000/api/user', {
                withCredentials: true,
            }).catch((err) => console.error(err.response));
        } else {
            const userId = localStorage.getItem('userId');
            res = await axios.get(`http://localhost:5000/api/user/${userId}`, {
                withCredentials: true,
            }).catch((err) => console.error(err.response));
        }
        const data = await res.data;
        return data;
    };
    useEffect(() => {
        if (firstRender) {
            sendRequest().then((data) => setUser(data.user));
            firstRender = false;
        } else {
            let interval = setInterval(
                () => refreshToken().then((data) => setUser(data.user)),
                1000 * 29
            );
            return () => clearInterval(interval);
        }
    }, []);
    return (
        <div>
            {user && <h1>Welcome {user.username}!</h1>}
            {user && <SignOutButton />}
        </div>
    );
}

export default User;

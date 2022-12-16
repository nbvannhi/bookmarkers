import SignOutButton from '../components/sign-out-button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

axios.defaults.withCredentials = true;
let firstRender = true;

function User() {
    const [user, setUser] = useState();
    const refreshToken = async () => {
        const res = await axios.get('http://localhost:5000/api/refresh', {
            withCredentials: true,
        }).catch((err) => console.log(err.response));
        const data = await res.data;
        return data;
    }
    const sendRequest = async () => {
        let res;
        try {
            res = await axios.get('http://localhost:5000/api/user', {
                withCredentials: true,
            });
        } catch (err) {
            const encryptedId = localStorage.getItem('userId');
            res = await axios.get(`http://localhost:5000/api/user/${encryptedId}`, {
                withCredentials: true,
            }).catch((err) => console.log(err));
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

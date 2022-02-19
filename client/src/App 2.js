import './App.scss';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import postman from './services/api-2';
import token from './services/token';
import axios from 'axios';

export default function App() {
    const [state, setState] = useState(token.getLocalAccessToken());
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const intervalRef = useRef();
    const login = async () => {
        await postman
            .post('/auth/login', {
                username,
                password,
            })
            .catch((err) => console.log(err));
        return;
    };
    const getUserList = async () => {
        await postman.get('/user/').catch((err) => console.log(err));
    };
    const test = async () => {
        await postman.get('/user/test').catch((err) => console.log(err));
    };
    const logout = async () => {
        await postman.post('/auth/logout').catch((err) => console.log(err));
        clearInterval(intervalRef.current);
        window.localStorage.clear();
        setState('user logout');
    };
    const register = async () => {
        await postman.post('/auth/register', { username, password, email });
    };
    const deleteUser = async () => {
        await postman.delete('/user/del/' + username);
        window.location.reload();
    };

    const updateUserFunc = async () => {
        const updatedValues = {};
        if (password.length > 0) updatedValues['password'] = password;
        if (email.length > 0) updatedValues['email'] = email;

        await postman.put('/user/update/' + username, updatedValues);
        window.location.reload();
    };

    const getToken = useCallback(async () => {
        if (token.getLocalRefreshToken()) {
            await axios
                .post('http://localhost:5000/api/auth/refresh', {
                    token: token.getLocalRefreshToken(),
                })
                .then((response) => {
                    const userStorage = token.getUser();
                    userStorage.accessToken = response.data.accessToken;
                    userStorage.refreshToken = response.data.refreshToken;
                    token.setUser(userStorage);
                    postman.defaults.headers.common['authorization'] =
                        response.data.accessToken;

                    return response;
                });
            setState(token.getLocalAccessToken());
        }
    }, []);
    useEffect(() => {
        console.log('first useEffect');
        window.localStorage.clear();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => getToken(), 500);
        intervalRef.current = interval;
        return () => clearInterval(interval);
    }, [getToken]);

    const handleClick = (e) => clearInterval(intervalRef.current);

    return (
        <div className='app'>
            <input
                type='text'
                placeholder='username'
                onChange={(e) => setUsername(e.target.value)}></input>
            <input
                type='password'
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={login}>LOGIN</button>
            <button onClick={getUserList}>UserList</button>
            <button onClick={test}>Test</button>
            <button onClick={handleClick}> Reset Interval </button>

            <button onClick={logout}>logout</button>
            <button onClick={register}>register</button>
            <button onClick={deleteUser}>delete</button>
            <button onClick={updateUserFunc}>UPDATE</button>

            <input
                type='email'
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}></input>

            <p>{state}</p>
        </div>
    );
}

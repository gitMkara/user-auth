import './App.scss';
import React from 'react';
import postman from './services/api';
import axios from 'axios';

export default function App() {
    const login = async () => {
        await postman
            .post('/auth/login', {
                username: 'murat',
                password: '123',
            })
            .catch((err) => console.log(err));
    };
    const getUserList = async () => {
        await postman.get('/user/').catch((err) => console.log(err));
    };
    const test = async () => {
        await postman.get('/user/test').catch((err) => console.log(err));
    };

    return (
        <div className='app'>
            <button onClick={login}>LOGIN</button>
            <button onClick={getUserList}>UserList</button>
            <button onClick={test}>Test</button>
        </div>
    );
}

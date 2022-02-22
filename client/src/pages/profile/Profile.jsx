import './profile.scss';

import React, { useState, useContext } from 'react';
import reqControler from '../../services/req-controler';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import token from '../../services/token';
import { AuthContext } from '../../context/AuthContext';

export default function Profile() {
    const { user, dispatch, isFetching } = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        reqControler
            .updateUserFunc(user, password, email)
            .then((res) => console.log('User Updated'))
            .catch((err) => console.log(err))
            .finally(() => window.location.reload());
    };
    return (
        <div className='profile'>
            <form className='profileForm' onSubmit={handleSubmit}>
                <h1>Update Page</h1>
                <h2>{user}</h2>
                <TextField
                    id='outlined-required'
                    className='textfield'
                    placeholder={user}
                    disabled={true}
                />
                <TextField
                    id='outlined-required'
                    className='textfield'
                    label='Email'
                    placeholder='Enter email'
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                />
                <TextField
                    id='outlined-required'
                    className='textfield'
                    label='Password'
                    placeholder='Enter password'
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                />

                <Button className='btn' variant='contained' type='submit'>
                    UPDATE
                </Button>
            </form>
        </div>
    );
}

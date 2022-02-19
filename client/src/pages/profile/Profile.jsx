import './profile.scss';

import React, { useState } from 'react';
import reqControler from '../../services/req-controler';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import token from '../../services/token';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        reqControler.register(username, password, email);
    };
    return (
        <div className='profile'>
            <form className='profileForm' onSubmit={handleSubmit}>
                <h1>Update Page</h1>

                <TextField

                    id='outlined-required'
                    className='textfield'
                    placeholder={token.getUser().username}
                    onChange={(e) => setUsername(e.target.value)}
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

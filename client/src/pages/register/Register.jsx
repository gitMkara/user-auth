import './register.scss';
import React, { useRef, useState } from 'react';
import reqControler from '../../services/req-controler';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        reqControler.register(username, password, email);
    };
    return (
        <div className='register'>
            <form className='registerForm' onSubmit={handleSubmit}>
                <h1>Register Page</h1>

                <TextField
                    required
                    id='outlined-required'
                    className='textfield'
                    label='Username'
                    placeholder='Enter your username'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    required
                    id='outlined-required'
                    className='textfield'
                    label='Email'
                    placeholder='Enter email'
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                />
                <TextField
                    required
                    id='outlined-required'
                    className='textfield'
                    label='Password'
                    placeholder='Enter password'
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                />

                <Button className='btn' variant='contained' type='submit'>
                    <Link to='/login'>
                        REGISTER
                    </Link>
                </Button>
            </form>
        </div>
    );
}

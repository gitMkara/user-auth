import './login.scss';
import React, { useRef, useState } from 'react';
import reqControler from '../../services/req-controler';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        reqControler.login(username, password);
    };

    return (
        <div className='login'>
            <form className='loginForm' onSubmit={handleSubmit}>
                <h1>Login Page</h1>

                <TextField
                    required
                    id='outlined-required'
                    className='textfield'
                    label='Username'
                    placeholder='Enter Your Username'
                    onChange={(e) => setUsername(e.target.value)}
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
                <Link to='/profile'>
                    <Button className='btn' variant='contained' type='submit'>
                        LOGIN
                    </Button>
                </Link>
            </form>
            <Button variant='contained'>
                <Link to='/register'>REGISTER</Link>
            </Button>
        </div>
    );
}

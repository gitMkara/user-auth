import './login.scss';
import React, { useContext, useState } from 'react';
import reqControler from '../../services/req-controler';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Actions from '../../context/Actions';
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, dispatch, isFetching } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(Actions.loginStart());
        reqControler
            .login(username, password)
            .then((response) => {
                dispatch(Actions.loginSuccess(response.data.username));
                navigate('/profile');
                return response;
            })
            .catch((err) => {
                dispatch(Actions.loginFailure());
                return err;
            });
    };

    return (
        <div className='login'>
            <form className='loginForm' onSubmit={handleSubmit}>
                <h1>Login Page</h1>
                <h2>{user}</h2>
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

                <Button className='btn' variant='contained' type='submit'>
                    LOGIN
                </Button>
            </form>
            <Button variant='contained' onClick={() => navigate('/register')}>
                REGISTER
            </Button>
        </div>
    );
}

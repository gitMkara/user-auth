import React, { useContext } from 'react';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import {
    Router,
    Switch,
    Route,
    Routes,
} from 'react-router-dom';
import token from './services/token';
import { AuthContext } from './context/AuthContext';

export default function App() {
    const { user, isFetching } = useContext(AuthContext);
    return (
        <div>
            <Routes>

                    <Route exact path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route
                        path='profile'
                        element={user ? <Profile /> : <Login />}
                    />

            </Routes>
        </div>
    );
}

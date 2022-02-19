import React from 'react';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
} from 'react-router-dom';
import token from './services/token';

export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/login' element={<Login />} />
                </Routes>
                <Routes>
                    <Route path='/register' element={<Register />} />
                </Routes>
                <Routes>
                    <Route
                        path='/profile'
                        element={token.getUser() ? <Profile /> : <Login />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

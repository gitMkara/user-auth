import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import postman from './api-2';
import token from './token';

const login = async (username, password) => {
    return await postman
        .post('/auth/login', {
            username,
            password,
        })
        .catch((err) => console.log(err));
};

const getUserList = async () => {
    await postman.get('/user/').catch((err) => console.log(err));
};
// const test = async () => {
//     await postman.get('/user/test').catch((err) => console.log(err));
// };
const logout = async () => {
    await postman.post('/auth/logout').catch((err) => console.log(err));
    window.localStorage.clear();
    window.location.reload();
};

const register = async (username, password, email) => {
    await postman.post('/auth/register', { username, password, email });
};
const deleteUser = async (username) => {
    await postman.delete('/user/del/' + username);
    window.location.reload();
};

const updateUserFunc = async (username, password, email) => {
    const updatedValues = {};
    if (password.length > 0) updatedValues['password'] = password;
    if (email.length > 0) updatedValues['email'] = email;

    return await postman.put('/user/update/' + username, updatedValues);
};

const reqControler = {
    login,
    getUserList,
    logout,
    register,
    deleteUser,
    updateUserFunc,
};

export default reqControler;

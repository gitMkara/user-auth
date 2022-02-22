const loginStart = () => {
    return { type: 'LOGIN_START' };
};
const loginSuccess = (user) => {
    return { type: 'LOGIN_SUCCESS', payload: user };
};
const loginFailure = () => {
    return { type: 'LOGIN_FAILURE' };
};
const logout = () => {
    return { type: 'LOGOUT' };
};
const Actions = { loginStart, loginSuccess, loginFailure, logout };
export default Actions;

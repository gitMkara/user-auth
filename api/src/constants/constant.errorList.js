//40X Api Errors
//50X Client  Errors
const apiError = {
    401: 'Database connection error',
    402: 'Registration failure',
    403: 'User could not be saved to database',
    404: 'User not found',
    405: 'Plural user searching error',
    406: 'Login failed',
    407: 'User not found',
    408: 'Password incorrect',
    409: 'You are not authenticated',
    410: 'AccessToken is invalid',
    411: 'RefreshToken is not valid',
    412: 'User not logout',
};

const clientError = { 501: 'Temp error' };

module.exports = {
    apiError,
    clientError,
};

//40X Api Errors
//50X Client  Errors
const apiError = {
    401: 'Database connection error',
    402: 'Registration failure',
    403: 'User could not be saved to database',
    404: 'User not found',
    405: 'Plural user searching error',
};

const clientError = { 501: 'Temp error' };

module.exports = {
    apiError,
    clientError,
};

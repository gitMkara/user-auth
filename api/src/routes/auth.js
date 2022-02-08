const {
    registerUser,
    loginUser,
    tokenRefresh,
    logoutUser,
} = require('../controllers/auth');
const jwToken = require('../helpers/tokenomix');

const router = require('express').Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', tokenRefresh);
router.post('/logout', jwToken.verifyAccesToken, logoutUser);

module.exports = router;

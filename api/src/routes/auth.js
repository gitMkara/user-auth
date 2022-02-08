const { registerUser } = require('../controllers/auth');

const router = require('express').Router();

router.post('/register', registerUser);

module.exports = router;

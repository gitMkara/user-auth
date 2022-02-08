const { getAllUser } = require('../controllers/user');
const router = require('express').Router();

router.get('/', getAllUser);

module.exports = router;

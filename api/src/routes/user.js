const { getAllUser } = require('../controllers/user');
const router = require('express').Router();
const jwToken = require('../helpers/tokenomix');

router.get('/', jwToken.verifyAccesToken, getAllUser);
router.get('/test', jwToken.verifyAccesToken, (req, res) => {
    try {
        res.status(200).json('Its Okey :)');
    } catch (error) {
        res.status(444).json(error);
    }
});

module.exports = router;

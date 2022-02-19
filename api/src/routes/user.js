const { getAllUser, deleteUser, updateUser } = require('../controllers/user');
const router = require('express').Router();
const jwToken = require('../helpers/tokenomix');

router.get('/', jwToken.verifyAccesToken, getAllUser);
router.delete('/del/:username', jwToken.verifyAccesToken, deleteUser);
router.put('/update/:username', jwToken.verifyAccesToken, updateUser);

router.put('/test', (req, res) => {
    try {
        console.log(req.query)
        res.status(200).json('Its Okey :)');
    } catch (error) {
        res.status(444).json(error);
    }
});

module.exports = router;

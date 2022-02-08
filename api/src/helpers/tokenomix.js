const {
    JWT_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN,
} = require('../constants/constant.common');
const jwt = require('jsonwebtoken');
const { apiError } = require('../constants/constant.errorList');
const printer = require('./printer');

const jwToken = {};
jwToken.refreshTokens = [];

jwToken.createAccessToken = (user) => {
    const accessToken = jwt.sign(
        { username: user.username, _id: user._id },
        JWT_ACCESS_TOKEN,
        {
            expiresIn: '30s',
        }
    );
    return accessToken;
};

jwToken.createRefreshToken = (user) => {
    const refreshToken = jwt.sign(
        { username: user.username, _id: user._id },
        JWT_REFRESH_TOKEN
    );
    jwToken.refreshTokens.push(refreshToken);
    return refreshToken;
};

jwToken.verifyAccesToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const accessToken = authHeader;
        jwt.verify(accessToken, JWT_ACCESS_TOKEN, (err, decode) => {
            if (err) {
                res.status(410).json(apiError[410]);
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(409).json(apiError[409]);
    }
};

jwToken.refresher = async (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) res.status(409).json(apiError[409]);
    if (!jwToken.refreshTokens.includes(refreshToken))
        res.status(411).json(apiError[411]);

    jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err, decode) => {
        if (err) {
            res.status(411).json(apiError[411]);
        } else {
            jwToken.refreshTokens = jwToken.refreshTokens.filter(
                (token) => token !== refreshToken
            );

            const newAccessToken = jwToken.createAccessToken(decode);
            const newRefreshToken = jwToken.createRefreshToken(decode);
            jwToken.refreshTokens.push(newRefreshToken);
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        }
    });
};

module.exports = jwToken;

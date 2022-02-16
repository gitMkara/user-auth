const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passwordHashing = require('../helpers/passwordHasing');
const { apiError } = require('../constants/constant.errorList');
const printer = require('../helpers/printer');
const { findOne } = require('../models/User');
const jwToken = require('../helpers/tokenomix');
const { JWT_REFRESH_TOKEN } = require('../constants/constant.common');

const registerUser = async (req, res) => {
    try {
        const hashedPassword = await passwordHashing.encryption(
            req.body.password
        );
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        });
        const user = await newUser.save().then(
            (user) => {
                console.log(printer.success('User is created.'));
                return user;
            },
            (err) => {
                console.log(err);
                res.status(403).json(apiError[403]);
            }
        );

        res.status(200).json(user);
    } catch (err) {
        res.status(402).json(apiError[402]);
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
            .then((user) => {
                if (user) return user;
                throw apiError[407];
            })
            .catch((err) => {
                console.log(printer.error(err));
            });
        let isPassTrue;
        if (user) {
            isPassTrue = await passwordHashing.compare(
                req.body.password,
                user.password
            );
        }

        if (isPassTrue) {
            const accessToken = jwToken.createAccessToken(user);
            const refreshToken = jwToken.createRefreshToken(user);
            res.status(200).json({
                username: user.username,
                accessToken,
                refreshToken,
            });
        } else {
            res.status(408).json(apiError[408]);
        }
    } catch (err) {
        console.log(printer.error(apiError[406]));
        res.status(406).json(apiError[406]);
    }
};

const logoutUser = async (req, res) => {
    try {
        const refreshToken = req.body.token;
        jwToken.tokenBox = jwToken.tokenBox.filter(
            (token) => token !== refreshToken
        );
        res.status(200).json('User Logout');
    } catch (error) {
        res.status(412).json(apiError[412]);
    }
};

const tokenRefresh = async (req, res) => {
    jwToken.refresher(req, res);
};

module.exports = {
    registerUser,
    loginUser,
    tokenRefresh,
    logoutUser,
};

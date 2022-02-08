const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passwordHashing = require('../helpers/passwordHasing');
const { apiError } = require('../constants/constant.errorList');
const printer = require('../helpers/printer');

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
                console.log(printer.error(apiError[403]));
                res.status(403).json(apiError[403]);
            }
        );

        res.status(200).json(user);
    } catch (err) {
        res.status(402).json(apiError[402]);
    }
};

const LoginUser = async () => {};
const LogoutUser = async () => {};

module.exports = {
    registerUser,
};

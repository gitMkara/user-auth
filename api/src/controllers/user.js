const mongoose = require('mongoose');
const User = require('../models/User');
const { apiError } = require('../constants/constant.errorList');
const printer = require('../helpers/printer');

const getAnUser = async () => {};

const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(405).json(apiError[405]);
    }
};

const deleteUser = async (req, res) => {
    try {
        console.log('here');
        if (req.user.username === req.params.username) {
            await User.deleteOne({
                username: req.params.username,
            })
                .then((response) => {
                    console.log('User is deleted');
                    return response;
                })
                .catch((err) => {
                    console.log(err);
                });

            res.status(200).json("User's been deleted.");
        } else {
            res.status(500).json('INVALID USERNAME');
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllUser,
    deleteUser,
};

const mongoose = require('mongoose');
const User = require('../models/User');
const { apiError } = require('../constants/constant.errorList');
const printer = require('../helpers/printer');
const passwordHashing = require('../helpers/passwordHasing');

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

const updateUser = async (req, res) => {
    try {
        if (req.user.username === req.params.username) {
            if (req.body.password) {
                req.body.password = await passwordHashing.encryption(
                    req.body.password.toString()
                );
            }

            const updatedUser = await User.findOneAndUpdate(
                { username: req.params.username },
                {
                    $set: req.body,
                },
                { new: true }
            )
                .then((response) => {
                    console.log('User Updated');
                    return response;
                })
                .catch((err) => {
                    console.log('User Not Updated');
                    res.status(500).json(err);
                });
            res.status(200).json(updatedUser);
        } else {
            res.status(500).json('Invalid User');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
module.exports = {
    getAllUser,
    deleteUser,
    updateUser,
};

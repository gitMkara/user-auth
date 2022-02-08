const mongoose = require('mongoose');
const User = require('../models/User');
const { apiError } = require('../constants/constant.errorList');
const printer = require('../helpers/printer');

const getAnUser = async () => {};

const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        res.status(405).json(apiError[405]);
    }
};

const deleteUser = async () => {};

module.exports = {
    getAllUser
}
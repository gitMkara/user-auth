const { MONGO_URI } = require('../constants/constant.common.js');
const mongoose = require('mongoose');
const printer = require('../helpers/printer.js');
const { apiError } = require('../constants/constant.errorList');

const database = {};

database.connect = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(
        () => {
            console.log(printer.success('Connected to MongoDB'));
        },
        (err) => {
            console.log(printer.error(apiError[401]));
        }
    );
};

module.exports = database;

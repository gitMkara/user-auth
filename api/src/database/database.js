const { MONGO_URI } = require('../constants/constant.common.js');
const mongoose = require('mongoose');
const printer = require('../helpers/printer.js');

const database = {};

database.connect = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(console.log(printer.success('Connected to MongoDB')))
        .catch((err) =>
            console.log(printer.error('Not Connected to MongoDB' + err))
        );
};

module.exports = database;

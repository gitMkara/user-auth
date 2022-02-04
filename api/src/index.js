const { PORT } = require('./constants/constant.common');
const express = require('express');
const database = require('./database/database');
const printer = require('./helpers/printer');
const app = express();

database.connect();

app.listen(PORT, () => {
    console.log(printer.success('Port ' + PORT + ' is listening...'));
});

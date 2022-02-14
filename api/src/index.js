const { PORT } = require('./constants/constant.common');
const express = require('express');
const database = require('./database/database');
const printer = require('./helpers/printer');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.listen(PORT, () => {
    database.connect();
    console.log(printer.success('Port ' + PORT + ' is listening...'));
});

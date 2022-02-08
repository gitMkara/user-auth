const chalk = require('chalk');

const printer = {};

printer.error = (str) => {
    return chalk.red.bold('An error occurred:\n\t' + str + '!');
};

printer.success = (str) => {
    return chalk.blue.italic.bold('\n' + str);
};

module.exports = printer;

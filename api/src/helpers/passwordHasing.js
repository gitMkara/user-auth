const bcrypt = require('bcrypt');

const passwordHashing = {};

passwordHashing.encryption = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

passwordHashing.compare = async (password, hasedPassword) => {
    return await bcrypt.compare(password, hasedPassword);
};

module.exports = passwordHashing;

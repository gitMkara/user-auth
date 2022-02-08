const bcrypt = require('bcrypt');

const passwordHashing = {};

passwordHashing.encryption = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

passwordHashing.decryption = async (hasedPassword) => {};

module.exports = passwordHashing;

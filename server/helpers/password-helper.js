const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

const checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = {hashPassword, checkPassword}
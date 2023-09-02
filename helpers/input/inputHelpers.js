const bcrypt = require('bcryptjs');
const asyncErrorWrapper = require('express-async-handler');

const validateUserInput = (email, password) => {
    return email && password;
};

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

module.exports = { validateUserInput, comparePassword };
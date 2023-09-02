const bcrypt = require('bcryptjs');
const asyncErrorWrapper = require('express-async-handler');

const validateUserInput = (email, password) => {
    return email && password;
};

const comparePassword = asyncErrorWrapper(async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
})

module.exports = { validateUserInput, comparePassword };
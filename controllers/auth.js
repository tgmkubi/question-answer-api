const User = require("../models/User");
const asyncErrorWrapper = require('express-async-handler');

const register = asyncErrorWrapper(async (req, res, next) => {
    const { name, email, password } = req.body;
    // async await 
    const user = await User.create({
        name,
        email,
        password
    });

    res.status(200).json({
        success: true,
        data: user
    });
});

module.exports = { register};
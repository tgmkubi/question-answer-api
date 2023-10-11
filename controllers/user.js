const User = require("../models/User");
const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');

const getSingleUser = asyncErrorWrapper(async (req, res, next) => {
    const user = req.user;

    return res.status(200).json({
        success: true,
        data: user
    })
});

module.exports = {getSingleUser};
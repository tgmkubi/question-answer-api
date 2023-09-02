const User = require("../models/User");
const asyncErrorWrapper = require('express-async-handler');
const { sendJwtToClient } = require('../helpers/authorization/tokenHelpers');
const { validateUserInput, comparePassword } = require('../helpers/input/inputHelpers');
const CustomError = require('../helpers/error/CustomError');

const register = asyncErrorWrapper(async (req, res, next) => {
    const { name, email, password } = req.body;
    // async await 
    const user = await User.create({
        name,
        email,
        password
    });

    sendJwtToClient(user, res);
});

const getUser = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    });
};

const login = asyncErrorWrapper(async (req, res, next) => {

    const { email, password } = req.body;

    if (!validateUserInput(email, password)) {
        return next(new CustomError("Please check your inputs", 400));
    };

    const user = await User.findOne({ email }).select("+password");

    const result = await comparePassword(password, user.password);
    if (!result) {
        return next(new CustomError("Please check your credentials", 400));
    }

    sendJwtToClient(user, res);
});

const logout = asyncErrorWrapper(async (req, res, next) => {
    const {JWT_COOKIE,NODE_ENV} = process.env;

    return res.status(200)
    // .cookie("access_token", null, {
    //     httpOnly: true,
    //     expires: new Date(Date.now()),
    //     secure: NODE_ENV === "development" ? false : true,
    // })
    .clearCookie('access_token')
    .json({
        success: true,
        message: "Logout Successfull"
    })
});

module.exports = { register, getUser, login, logout};
const User = require("../models/User");
const CustomError = require('../helpers/error/CustomError');

const register = async (req, res, next) => {


    try {
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
    } catch (error) {
        return next(error);
    }
}

const errorTest = (req, res, next) => {
    return next(new TypeError());
}

module.exports = { register, errorTest };
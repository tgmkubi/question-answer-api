const User = require("../models/User");

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
    throw new Error('BROKEN ulennn');
}

module.exports = { register, errorTest };
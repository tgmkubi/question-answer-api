const User = require("../models/User");
const asyncErrorWrapper = require('express-async-handler');
const { sendJwtToClient } = require('../helpers/authorization/tokenHelpers');
const { validateUserInput, comparePassword } = require('../helpers/input/inputHelpers');
const CustomError = require('../helpers/error/CustomError');
const sendEmail = require('../helpers/libraries/sendEmail');
const uuid4 = require('uuid4');

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
    const { JWT_COOKIE, NODE_ENV } = process.env;

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

const imageUpload = asyncErrorWrapper(async (req, res, next) => {
    // Image Upload Success
    // res.status(200).json({
    //     success: true,
    //     message: "Image upload successfull"
    // });

    const user = await User.findByIdAndUpdate(req.user.id, {
        "profile_image": req.savedProfiledImage
    }, {
        new: true,
        runValidators: true
    });
    return res.status(200)
        .json({
            success: true,
            message: "Image Upload Successful"
        });
});

const forgotPassword = asyncErrorWrapper(async (req, res, next) => {
    const resetEmail = req.body.email;
    const user = await User.findOne({ email: resetEmail });
    if (!user) {
        return next(new CustomError("There is no user with that email", 400))
    };
    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    const { URL, PORT } = process.env;
    const resetPaswwordUrl = `${URL}${PORT}/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

    const emailTemplate = `
        <h3>Reset Your Password</h3>
        <p>This <a href = '${resetPaswwordUrl}' target = "_blank">link</a> will expire in 1 hour</p>
    `;
    try {
        await sendEmail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Reset Your Password",
            html: emailTemplate
        })
        return res.status(200)
            .json({
                success: true,
                message: `Token sent to: ${user.email}. Check your inbox in order to reset your password.`
            });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return next(new CustomError("Email could not be sent", 500));
    }
});

const resetPassword = asyncErrorWrapper(async (req, res, next) => {

    const {resetPasswordToken} = req.query;
    const {password} = req.body;

    if(!resetPasswordToken) {
        return next(new CustomError("Please provide a valid Reset Password Token", 400));
    };

    let user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    });
    if (!user) {
        return next(new CustomError("Invalid Token or Session Expired", 400));
    };

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    
    return res.status(200).json({
        success: true,
        message: "Reset Password Process Successful"
    })
});

const editUser = asyncErrorWrapper(async (req, res, next) => {
    const filter = { _id:  req.user.id};
    const update = req.body;
    const user = await User.findOneAndUpdate(filter, update, {
        new: true,
        runValidators: true
    });

    return res.status(200).json({
        success: true,
        data: user
    });

});


//@ Only for testing
const getAllBooks = asyncErrorWrapper(async (req, res, next) => {
    res.status(200).json({
        success: true,
        books: [
            {
                id: uuid4(),
                name: "Harry Potter"
            },
            {
                id: uuid4(),
                name: "Sefiller"
            },
            {
                id: uuid4(),
                name: "Fareler ve İnsanlar"
            }
        ]
    })
});

module.exports = { register, getUser, login, logout, imageUpload, forgotPassword, resetPassword, editUser, getAllBooks};
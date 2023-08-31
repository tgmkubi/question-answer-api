const CustomError = require('../../helpers/error/CustomError');

const customErrorHandler = (err, req, res, next) => {
    // We'll get the CustomError from err param
    let customError = err;
    // console.log(err.name);

    if(err.name === "SyntaxError") {
        customError = new CustomError(err.message, 400);
    };
    if(err.name === "ValidationError") {
        customError = new CustomError(err.message, 400);
    };

    console.log(customError.message, customError.status);

    res.status(customError.status || 500).json({
        success: false,
        message: customError.message || "Internal Server Error"
    });
};

module.exports = customErrorHandler;
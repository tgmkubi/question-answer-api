const customErrorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(400).json({
        success: false
    });
};

module.exports = customErrorHandler;
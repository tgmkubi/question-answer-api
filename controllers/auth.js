const register = (req, res, next) => {

    console.log(req.body);

    res.status(200).json({
        success: true,
        message: 'Auth Register Page'
    });
}

module.exports = {register}
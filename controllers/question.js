const Question = require('../models/Question');
const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');

const askNewQuestion = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.user;
    const information = req.body;

    const question = await Question.create({
        ...information,
        user: id
    });

    return res.status(200).json({
        success: true,
        data: question
    });
});

module.exports = { askNewQuestion };
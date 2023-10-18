const User = require('../../models/User');
const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../../helpers/error/CustomError');
const Question = require('../../models/Question');
const Answer = require('../../models/Answer');

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
        return next(new CustomError("There is no user with that id", 400));
    };
    req.user = user;
    return next();
});

const checkQuestionExist = asyncErrorWrapper(async (req, res, next) => {
    const question_id = req.params.id || req.params.question_id;
    const question = await Question.findById({ _id: question_id });

    if (!question) {
        return next(new CustomError("There is no such question with that id"));
    }

    req.question = question;
    next();
});

const checkQuestionAndAnswerExist = asyncErrorWrapper(async (req, res, next) => {
    const { question_id } = req.params;
    const { answer_id } = req.params;
    const answer = await Answer.findOne({
        _id: answer_id,
        question: question_id
    });

    if (!answer) {
        return next(new CustomError("There is no answer with that id associated with question id", 400));
    };

    req.answer = answer;
    next();
});
module.exports = { checkUserExist, checkQuestionExist, checkQuestionAndAnswerExist };
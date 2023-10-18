const Answer = require('../models/Answer');
const Question = require('../models/Question');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const addNewAnswerToQuestion = asyncErrorWrapper(async (req, res, next) => {
    const {question_id} = req.params;
    const userId = req.user.id;
    const information = req.body;

    const answer = await Answer.create({
        ...information,
        question: question_id,
        user: userId
    });

    return res.status(200).json({
        success: true,
        data: answer
    })
});

const getAllAnswersByQuestion = asyncErrorWrapper(async (req, res, next) => {
    const {question_id} = req.params;
    const questions = await Question.findById(question_id).populate("answers");
    const answers = questions.answers;

    res.status(200).json({
        success: true,
        count: answers.length,
        data: answers
    })
});

module.exports = {addNewAnswerToQuestion, getAllAnswersByQuestion}
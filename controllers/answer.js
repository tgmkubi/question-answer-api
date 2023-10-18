const Answer = require('../models/Answer');
const Question = require('../models/Question');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const addNewAnswerToQuestion = asyncErrorWrapper(async (req, res, next) => {
    const { question_id } = req.params;
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
    const { question_id } = req.params;
    const questions = await Question.findById(question_id).populate("answers");
    const answers = questions.answers;

    return res.status(200).json({
        success: true,
        count: answers.length,
        data: answers
    });
});

const getSingleAnswer = asyncErrorWrapper(async (req, res, next) => {
    const { answer_id } = req.params;
    const answer = await Answer.findById(answer_id)
    .populate({
        path: "question",
        select: "title"
    })
    .populate({
        path: "user",
        select: "name profile_image"
    });

    return res.status(200).json({
        success: true,
        data: answer
    });
});

module.exports = { addNewAnswerToQuestion, getAllAnswersByQuestion, getSingleAnswer };
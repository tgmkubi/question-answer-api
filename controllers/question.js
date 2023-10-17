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

const getAllQuestions = asyncErrorWrapper(async (req, res, next) => {
    const questions = await Question.find({});

    return res.status(200).json({
        success: true,
        data: questions
    });
});

const getSingleQuestion = asyncErrorWrapper(async (req, res, next) => {
    const question = req.question;

    return res.status(200).json({
        success: true,
        data: question
    });
});

const editQuestion = asyncErrorWrapper(async (req, res, next) => {
    const {id} = req.params;
    const {title, content} = req.body;

    let question = await Question.findById(id);

    question.title = title;
    question.content = content;

    question = await question.save();

    return res.status(200).json({
        success: true,
        data: question
    });
});

const deleteQuestion = asyncErrorWrapper(async (req, res, next) => {
    const {id} = req.params;

    await Question.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: "Question delete operation successful"
    });
});

module.exports = { askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, deleteQuestion };
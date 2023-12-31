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

const editAnswer = asyncErrorWrapper(async (req, res, next) => {
    const { content } = req.body;
    const answer = req.answer;

    answer.content = content;
    await answer.save();

    return res.status(200).json({
        success: true,
        data: answer
    });
});

const deleteAnswer = asyncErrorWrapper(async (req, res, next) => {
    const { answer_id } = req.params;
    await Answer.findByIdAndRemove(answer_id);

    const question = req.question;
    question.answers.splice(question.answers.indexOf(answer_id), 1);
    question.answerCount = question.answers.length;

    await question.save();

    return res.status(200).json({
        success: true,
        message: "Answer deleted successfully"
    });
});

const likeAnswer = asyncErrorWrapper(async (req, res, next) => {
    const answer = req.answer;
    const userId = req.user.id;

    if (answer.likes.includes(userId)) {
        return next(new CustomError("You already like this answer", 400));
    };

    answer.likes.push(userId);
    await answer.save();

    return res.status(200).json({
        success: true,
        data: answer
    });
});

const undoLikeAnswer = asyncErrorWrapper(async (req, res, next) => {
    const answer = req.answer;
    const userId = req.user.id;

    if (!answer.likes.includes(userId)) {
        return next(new CustomError("You can not undo like operation for this answer", 400));
    };

    answer.likes.splice(answer.likes.indexOf(userId), 1);
    await answer.save();

    return res.status(200).json({
        success: true,
        data: answer
    });
});

module.exports = { addNewAnswerToQuestion, getAllAnswersByQuestion, getSingleAnswer, editAnswer, deleteAnswer, likeAnswer, undoLikeAnswer };
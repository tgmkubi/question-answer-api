const mongoose = require('mongoose');
const { Schema } = mongoose;
const Question = require('./Question');

const AnswerSchema = new Schema({
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [10, 'Please provide a content at least 10 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    question: {
        type: mongoose.Schema.ObjectId,
        ref: "Question"
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],

});

AnswerSchema.pre('save', async function (next) {
    if (!this.isModified("user")) {
        return next();
    }
    try {
        const question = await Question.findById(this.question);
        question.answers.push(this._id);
        question.answerCount = question.answers.length;

        await question.save();
        next();
    } catch (error) {
        return next(err);
    };
});

module.exports = mongoose.model('Answer', AnswerSchema);
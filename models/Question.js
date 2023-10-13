const mongoose = require('mongoose');
const { Schema } = mongoose;
const slugify = require('slugify')

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        minlength: [10, 'Please provide a title at least 10 characters']
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [20, 'Please provide a title at least 20 characters']
    },
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
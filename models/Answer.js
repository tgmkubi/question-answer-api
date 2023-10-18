const mongoose = require('mongoose');
const { Schema } = mongoose;

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
        required: true,
        ref: "User"
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

module.exports = mongoose.model('Answer', AnswerSchema);
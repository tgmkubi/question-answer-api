const express = require('express');
const router = express.Router();
const {askNewQuestion, getAllQuestions, getSingleQuestion} = require('../controllers/question');
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {checkQuestionExist} = require('../middlewares/database/databaseErrorHelpers');

router.post('/ask', getAccessToRoute, askNewQuestion);
router.get('/', getAllQuestions);
router.get('/:id', checkQuestionExist, getSingleQuestion);

module.exports = router;
const express = require('express');
const router = express.Router();
const {askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion} = require('../controllers/question');
const {getAccessToRoute, getQuestionOwnerAccess} = require('../middlewares/authorization/auth');
const {checkQuestionExist} = require('../middlewares/database/databaseErrorHelpers');

router.post('/ask', getAccessToRoute, askNewQuestion);
router.get('/', getAllQuestions);
router.get('/:id', checkQuestionExist, getSingleQuestion);
router.put('/:id/edit', [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], editQuestion);

module.exports = router;
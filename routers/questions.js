const express = require('express');
const router = express.Router();
const {askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, deleteQuestion, likeQuestion} = require('../controllers/question');
const {getAccessToRoute, getQuestionOwnerAccess} = require('../middlewares/authorization/auth');
const {checkQuestionExist} = require('../middlewares/database/databaseErrorHelpers');

router.post('/ask', getAccessToRoute, askNewQuestion);
router.get('/', getAllQuestions);
router.get('/:id', checkQuestionExist, getSingleQuestion);
router.put('/:id/edit', [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], editQuestion);
router.delete('/:id/delete', [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], deleteQuestion);
router.get('/:id/like', [getAccessToRoute, checkQuestionExist], likeQuestion);

module.exports = router;
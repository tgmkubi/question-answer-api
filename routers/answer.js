const express = require('express');
const router = express.Router({ mergeParams: true });
const { addNewAnswerToQuestion, getAllAnswersByQuestion, getSingleAnswer, editAnswer } = require('../controllers/answer');
const { getAccessToRoute, getAnswerOwnerAccess } = require('../middlewares/authorization/auth');
const { checkQuestionAndAnswerExist } = require('../middlewares/database/databaseErrorHelpers');

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswersByQuestion);
router.get("/:answer_id", checkQuestionAndAnswerExist, getSingleAnswer);
router.put("/:answer_id/edit", [checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess], editAnswer);

module.exports = router;
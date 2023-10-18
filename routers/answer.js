const express = require('express');
const router = express.Router({mergeParams: true});
const {addNewAnswerToQuestion, getAllAnswersByQuestion, getSingleAnswer} = require('../controllers/answer');
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {checkQuestionAndAnswerExist} = require('../middlewares/database/databaseErrorHelpers');

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswersByQuestion);
router.get("/:answer_id", checkQuestionAndAnswerExist, getSingleAnswer);

module.exports = router;
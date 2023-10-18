const express = require('express');
const router = express.Router({mergeParams: true});
const {addNewAnswerToQuestion, getAllAnswersByQuestion} = require('../controllers/answer');
const {getAccessToRoute} = require('../middlewares/authorization/auth');

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswersByQuestion);

module.exports = router;
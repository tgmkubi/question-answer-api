const express = require('express');
const router = express.Router({mergeParams: true});
const {addNewAnswerToQuestion} = require('../controllers/answer');
const {getAccessToRoute} = require('../middlewares/authorization/auth');

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
module.exports = router;
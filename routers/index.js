const express = require('express');
const router = express.Router();

const questions = require('./questions');
const auth = require('./auth');
const user = require('./user');
const admin = require('./admin');

router.use('/questions', questions);
router.use('/auth', auth);
router.use('/users', user);
router.use('/admin', admin);

module.exports = router;
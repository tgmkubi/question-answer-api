const express = require('express');
const router = express.Router();

// Controller
const {getAllQuestions} = require('../controllers/question');

router.get('/', getAllQuestions, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Questions Home Page'
    })
  })


module.exports = router;
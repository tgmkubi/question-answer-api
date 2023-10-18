const express = require('express');
const router = express.Router({mergeParams: true});

router.get("", (req, res, next) => {
    console.log(req.params.question_id);
    res.status(200).json({
        success: true,
        message: "Answers Page"
    })
})
module.exports = router;
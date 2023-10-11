const express = require('express');
const router = express.Router();
const {getSingleUser} = require('../controllers/user');

router.get('/:id', getSingleUser);

module.exports = router;
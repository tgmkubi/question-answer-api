const express = require('express');
const router = express.Router();
const User = require('../models/User');
const userQueryMiddleware = require('../middlewares/query/userQueryMiddleware');
const { getSingleUser } = require('../controllers/user');
const { checkUserExist } = require('../middlewares/database/databaseErrorHelpers');
const { getAllUsers } = require('../controllers/user');

router.get('/:id', checkUserExist, getSingleUser);
router.get('', userQueryMiddleware(User), getAllUsers);

module.exports = router;
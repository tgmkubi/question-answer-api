const express = require('express');
const router = express.Router();
const {getSingleUser} = require('../controllers/user');
const {checkUserExist} = require('../middlewares/database/databaseErrorHelpers');
const {getAllUsers} = require('../controllers/user');

router.get('/:id', checkUserExist, getSingleUser);
router.get('', getAllUsers)

module.exports = router;
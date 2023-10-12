const express = require('express');
const router = express.Router();
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {getAdminAccess} = require('../middlewares/authorization/auth');
const {checkUserExist} = require('../middlewares/database/databaseErrorHelpers');
const {blockOrUnblockUser} = require('../controllers/admin');

//Middlewares
router.use([getAccessToRoute, getAdminAccess]);

//Controllers
router.get('/block/:id/:block', checkUserExist, blockOrUnblockUser);

module.exports = router;
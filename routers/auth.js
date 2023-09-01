const express = require('express');
const router = express.Router();
const {register, getUser} = require('../controllers/auth');
const {getAccessToRoute} = require('../middlewares/authorization/auth');

router.post('/register', register);
router.get('/profile', getAccessToRoute, getUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const {register, getUser, login} = require('../controllers/auth');
const {getAccessToRoute} = require('../middlewares/authorization/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', getAccessToRoute, getUser);

module.exports = router;
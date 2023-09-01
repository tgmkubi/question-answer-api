const express = require('express');
const router = express.Router();
const {register, tokenTest} = require('../controllers/auth');
const {getAccessToRoute} = require('../middlewares/authorization/auth');

router.post('/register', register);
router.get('/tokenTest', getAccessToRoute, tokenTest);

module.exports = router;
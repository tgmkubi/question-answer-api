const express = require('express');
const router = express.Router();
const {register, getUser, login, logout, imageUpload, forgotPassword, getAllBooks} = require('../controllers/auth');
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const profileImageUpload = require('../middlewares/libraries/profileImageUpload');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', getAccessToRoute, getUser);
router.get('/logout', getAccessToRoute, logout);
router.post('/upload', [getAccessToRoute, profileImageUpload.single("profile_image")], imageUpload);
router.post('/forgotpassword', forgotPassword);

// @TODO: only for testing
router.get('/books', getAllBooks);

module.exports = router;
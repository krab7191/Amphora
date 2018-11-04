const express = require('express');
const router = express.Router();
const passport = require('../../passport');
const userController = require('../../controllers/userController');

// this route is just used to get the user basic info
router.get('/user', userController.getUser);
router.post('/login', userController.auth, passport.authenticate('custom'), userController.authenticate);
// router.post('/logout', userController.logout);

module.exports = router;

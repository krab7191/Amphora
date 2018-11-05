const express = require('express');
const router = express.Router();
// const passport = require('../../passport');
const userController = require('../../controllers/userController');

// this route is just used to get the user basic info
router.get('/user', userController.getUser);

// passport login
router.post('/login', userController.auth, passport.authenticate('custom'), userController.authenticate);

// Login route using pandoraJS
// router.post('/login', userController.pandoraAuth);

// router.post('/logout', userController.logout);

module.exports = router;

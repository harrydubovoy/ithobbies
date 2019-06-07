// npm import
const express = require('express');
const router = express.Router();
const passport = require("passport");

// controller
const User = require('../app/controllers/auth/user.controller');

router.get('/login', User.renderLogin);
// router.get('/register', User.renderRegister);
// router.post('/register', User.register);
router.post('/login', passport.authenticate('local'), User.login);
router.get('/logout', User.logout);


module.exports = router;
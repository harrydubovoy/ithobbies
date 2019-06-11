// npm import
const express = require('express');
const router = express.Router();
const passport = require("passport");

// path
const PATH = global.MODULE_PATH.AUTH_CONTROLLER;

// controller
const User = require(`${PATH}/user.controller`);

router.get('/login', User.renderLogin);
// router.get('/register', User.renderRegister);
// router.post('/register', User.register);
router.post('/login', passport.authenticate('local'), User.login);
router.get('/logout', User.logout);


module.exports = router;
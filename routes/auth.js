// npm import
const express = require('express');
const router = express.Router();

// controller
const User = require('../app/controllers/auth/user.controller');

router.get('/login', User.renderLogin);
// router.get('/register', User.renderRegister);
// router.post('/register', User.register);
router.post('/login', User.login());
router.get('/logout', User.logout);


module.exports = router;
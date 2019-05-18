// npm import
const express = require('express');
const router = express.Router();

// controllers
const User = require('../app/controllers/auth/user.controller');

const admin = require('./admin');
const auth = require('./auth');
const front = require('./front');

router.use('/admin', User.isAuth, admin);
// router.use('/admin', admin);
router.use('/', auth);
router.use('/', front);


module.exports = router;

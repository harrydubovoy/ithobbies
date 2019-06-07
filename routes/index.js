// npm import
const express = require('express');
const router = express.Router();

// controllers
const User = require('../app/controllers/auth/user.controller');
const Home = require('../app/controllers/admin/home.controller');

const admin = require('./admin');
const auth = require('./auth');
const front = require('./front');


router.use('/api', admin);
router.use('/admin/*', User.isAuth, Home.render);
// router.get('/admin/*', Home.render);
router.use('/', auth);
router.use('/', front);


module.exports = router;
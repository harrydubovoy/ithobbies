// npm import
const express = require('express');
const router = express.Router();

// Services
const validate = require('../app/services/validate');

// Сontroller
const Posts = require(`${global.MODULE_PATH.FRONT_CONTROLLER}/posts.controller`);
const Comment = require(`${global.MODULE_PATH.FRONT_CONTROLLER}/comment.controller`);
const Search = require(`${global.MODULE_PATH.FRONT_CONTROLLER}/search.controller`);
const Mail = require(`${global.MODULE_PATH.FRONT_CONTROLLER}/mail.controller`);
const Error = require(`${global.MODULE_PATH.FRONT_CONTROLLER}/error.controller`);

// Seaarch
router.get('/search', Search.render);

// Mail
router.post('/send-mail', Mail.send);

// Home
router.get('/', Posts.renderAll);
router.get('/:category', Posts.renderCategory);

//Article
router.get('/:category/:slug', Posts.renderOne);

// Comment
router.post('/add-comment', Comment.add);

// Error
router.get('*', Error.notFound);


module.exports = router;
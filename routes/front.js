// npm import
const express = require('express');
const router = express.Router();

// path
const PATH = global.MODULE_PATH.FRONT_CONTROLLER;

// Сontroller
const Posts = require(`${PATH}/posts.controller`);
const Comment = require(`${PATH}/comment.controller`);
const Search = require(`${PATH}/search.controller`);
const Mail = require(`${PATH}/mail.controller`);
const Error = require(`${PATH}/error.controller`);

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
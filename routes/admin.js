// npm import
const express = require('express');
const router = express.Router();

// services
const upload = require('../app/services/upload');
const validate = require('../app/services/validate');

// controllers
const Home = require(`${global.MODULE_PATH.ADMIN_CONTROLLER}/home.controller`);
const Posts = require(`${global.MODULE_PATH.ADMIN_CONTROLLER}/posts.controller`);
const Categories = require(`${global.MODULE_PATH.ADMIN_CONTROLLER}/categories.controller`);
const Mail = require(`${global.MODULE_PATH.ADMIN_CONTROLLER}/mail.controller`);
const Comments = require(`${global.MODULE_PATH.ADMIN_CONTROLLER}/comments.controller`);
const Search = require(`${global.MODULE_PATH.ADMIN_CONTROLLER}/search.controller`);
const User = require(`${global.MODULE_PATH.ADMIN_CONTROLLER}/user.controller`);
const TinyMCE = require(`${global.MODULE_PATH.ADMIN_CONTROLLER}/tinymce.controller`);

// Home
router.get('/', Home.render);

// Search
router.get('/search', Search.render);

// Posts
router.get('/posts', Posts.renderAll);
router.get('/create-post', Posts.renderCreate);
router.post('/create-post', validate.post, upload.single('image'), Posts.create);
router.delete('/remove-post', Posts.remove);
router.post('/edit-post', validate.post, upload.single('image'), Posts.edit);
router.get('/edit-post/:id', Posts.renderEdit);

// Categories
router.get('/categories', Categories.renderAll);
router.post('/create-category', validate.category, Categories.create);
router.put('/edit-category', Categories.edit);
router.delete('/remove-category', Categories.remove);

// Comments
router.get('/comments/:id', Comments.render);
router.put('/comment-approve', Comments.approve);
router.delete('/comment-remove', Comments.remove);

// Mail
router.get('/mail', Mail.render);

// User
router.get('/user', User.render);
router.get('/edit-user/:id', User.edit);

// TinyMCE
router.post('/image-upload', upload.single('file'), TinyMCE.uploadImage);



module.exports = router;
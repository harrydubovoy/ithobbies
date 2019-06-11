// npm import
const express = require('express');
const router = express.Router();

// services
const upload = require('../app/services/upload');

// path
const PATH = global.MODULE_PATH.ADMIN_CONTROLLER;

// controllers
const Posts = require(`${PATH}/posts.controller`);
const Categories = require(`${PATH}/categories.controller`);
const Mail = require(`${PATH}/mail.controller`);
const Comments = require(`${PATH}/comments.controller`);
const Search = require(`${PATH}/search.controller`);
const User = require(`${PATH}/user.controller`);
const TinyMCE = require(`${PATH}/tinymce.controller`);
const Image = require(`${PATH}/image.controller`);



// Search
router.get('/search', Search.render);

// Posts
router.get('/posts', Posts.renderAll);
router.get('/new-comments', Posts.renderWithNewComments);
router.get('/create-post', Posts.renderCreate);
router.post('/create-post', Posts.create);
router.delete('/remove-post', Posts.remove);
router.post('/edit-post', Posts.edit);
router.get('/edit-post/:id', Posts.renderEdit);
router.post('/upload-image', upload.single('image'), Image.uploadImage);

// Categories
router.get('/categories', Categories.renderAll);
router.post('/create-category', Categories.create);
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

// Images
router.get('/images', Image.renderAll);
router.delete('/remove-image', Image.removeImage);
router.delete('/remove-image-group', Image.removeImageGroup);


module.exports = router;
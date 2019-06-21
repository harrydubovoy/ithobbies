// npm import
const express = require('express');
const router = express.Router();

// services
const upload = require('../app/services/upload.service');

// path
const { ADMIN_CONTROLLER } = global.MODULE_PATH;

// controllers
const Posts = require(`${ADMIN_CONTROLLER}/posts.controller`);
const Categories = require(`${ADMIN_CONTROLLER}/categories.controller`);
const Comments = require(`${ADMIN_CONTROLLER}/comments.controller`);
const Search = require(`${ADMIN_CONTROLLER}/search.controller`);
const TinyMCE = require(`${ADMIN_CONTROLLER}/tinymce.controller`);
const Image = require(`${ADMIN_CONTROLLER}/image.controller`);



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
router.post('/upload-image', upload.single('image'), Image.upload);

// Categories
router.get('/categories', Categories.renderAll);
router.post('/create-category', Categories.create);
router.put('/edit-category', Categories.edit);
router.delete('/remove-category', Categories.remove);

// Comments
router.get('/comments/:id', Comments.render);
router.put('/comment-approve', Comments.approve);
router.delete('/comment-remove', Comments.remove);

// TinyMCE
router.post('/image-upload', upload.single('file'), TinyMCE.uploadImage);

// Images
router.get('/images', Image.renderAll);
router.delete('/remove-image', Image.removeOne);
router.delete('/remove-image-group', Image.removeGroup);


module.exports = router;
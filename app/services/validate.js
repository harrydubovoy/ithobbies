// npm
const { body } = require('express-validator/check');

const post = [
    body('image').not().isEmpty(),
    body('title').not().isEmpty(),
    body('content').not().isEmpty(),
    body('category').not().isEmpty()
];

const category = [
    body('name').not().isEmpty(),
    body('slug').not().isEmpty()
];


module.exports = {
    post,
    category
};
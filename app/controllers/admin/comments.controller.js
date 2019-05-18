// models
const { PostsModel } = require(`${global.MODULE_PATH.MODEL}/post.model`);

// services
const { formatedDate } = require('../../services');

async function render (req, res) {
    const _id = req.params.id;
    const post = await PostsModel.findById({ _id });
    const title = post.title;
    const comments = post.comments.reverse();

    res.render('admin/comments', {
        title: 'Dashboard - Comments',
        _id,
        title,
        comments,
        formatedDate
    })
};

async function approve (req, res) {
    const postId = req.body.postId;
    const commentId = req.body.commentId;
    const post = await PostsModel.findById({ _id: postId });
    const comments = post.comments;
    const comment = comments.id(commentId);

    comment.approved = true;

    try {
        await post.save();
        res.send('ok');
    } catch (e) {
        res.send('Something went wrong', e);
    }
};

async function remove (req, res) {
    const postId = req.body.postId;
    const commentId = req.body.commentId;
    const post = await PostsModel.findById({ _id: postId });
    const comments = post.comments;

    comments.id(commentId).remove();

    try {
        await post.save();
        res.send('ok');
    } catch (e) {
        res.send('Something went wrong', e);
    }
};

module.exports = {
    render,
    approve,
    remove
};
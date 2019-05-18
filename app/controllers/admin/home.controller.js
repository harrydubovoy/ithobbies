// services
const { formatedDate } = require('../../services');

// models
const { PostsModel } = require(`${global.MODULE_PATH.MODEL}/post.model`);

async function render (req, res) {
    const posts = await PostsModel
        .find({})
        .sort({ createdAt: -1 })
        .populate('category')
        .lean()
        .exec();

    const hasNewCommentsPosts = posts.filter((post) => {
        const hasNotApproved = post.comments.some((comment) => {
            return !comment.approved;
        });

        return hasNotApproved ? post : null;
    });
    if(hasNewCommentsPosts.length) {
        req.flash('info', 'You have new comments');
    }

    res.render('admin/home', {
        title: 'Dashboard - Home',
        posts: hasNewCommentsPosts,
        formatedDate
    })
}

module.exports = {
    render
};
// models
const { PostsModel } = require(`${global.MODULE_PATH.MODEL}/post.model`);

async function render (req, res) {
    res.render('admin/layout')
}

module.exports = {
    render
};
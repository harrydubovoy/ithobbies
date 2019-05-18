// models
const { PostsModel } = require(`${global.MODULE_PATH.MODEL}/post.model`);

async function add(req, res) {
    const data = req.body;
    const _id = data.id;
    const article = await PostsModel.findById({ _id });
    article.comments.push(data);

    try {
        await article.save();
        res.send('ok');
    } catch (e) {
        res.send('Something went wrong', e);
    }
}

module.exports = {
    add
};
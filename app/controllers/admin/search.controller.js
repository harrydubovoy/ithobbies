// models
const { PostsModel } = require(`${global.MODULE_PATH.MODEL}/post.model`);

async function render(req, res) {
  const string = req.query.search.toLowerCase();

  try {
    const posts = await PostsModel.find({$text: {$search: string}}).sort({ createdAt: -1 }).populate('category');
    res.send({posts, string})
  } catch (error) {
    res.status(400).send(`${error}`);
  }
}

module.exports = {
  render
};
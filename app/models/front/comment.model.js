// models
const { PostsModel } = require('../post.model');

async function save(req) {
  const data = req.body;
  const _id = data.id;
  const article = await PostsModel.findById({ _id });

  article.comments.push(data);
  await article.save();
}

module.exports = {
  save,
};
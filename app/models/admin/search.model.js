const { PostsModel } = require('../post.model');

async function find(req) {
  const string = req.query.search.toLowerCase();

  try {
    const posts = await PostsModel.find({$text: {$search: string}}).sort({ createdAt: -1 }).populate('category');
    return { posts, string }
  } catch (error) {
    return `Something went wrong: ${error}`;
  }
}


module.exports = {
  find
};
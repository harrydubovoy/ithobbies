// models
const { PostsModel } = require('../post.model');
const { CategoriesModel } = require('../category.model');

async function getAll() {
  try {
    const posts = await PostsModel.find({}).populate('category').sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    return `Something went wrong: ${error}`;
  }
}

async function create(req) {
  const data = req.body;
  const post = new PostsModel(data);

  try {
    await post.save();
    return 'Post created';
  } catch (error) {
    return `Something went wrong ${error}`;
  }
}

async function getEdit(req) {
  const _id = req.params.id;

  try {
    const post = await PostsModel.findById(_id).populate('category', '_id');
    const categories = await CategoriesModel.find();

    return { post, categories }
  } catch (error) {
    return `Something went wrong: ${error}`;
  }
}

async function setEdit(req) {
  const data = req.body;
  const _id = req.body._id;

  try {
    await PostsModel.updateOne({_id}, {$set: data});
    return 'Post edited';
  } catch (error) {
    return `Something went wrong: ${error}`;
  }
}

async function remove(req) {
  const { _id } = req.body;

  try {
    await PostsModel.findByIdAndRemove({_id});
    return 'Post deleted';
  } catch (e) {
    return `Something went wrong: ${error}`;
  }
}

async function getWithNewComments() {
  try {
    const posts = await PostsModel.find({}).populate('category').sort({ createdAt: -1 });

    const hasNewCommentsPosts = posts.filter((post) => {
      const hasNotApproved = post.comments.some((comment) => {
        return !comment.approved;
      });

      return hasNotApproved ? post : null;
    });

    return { posts: hasNewCommentsPosts };
  } catch (error) {
    return `Something went wrong: ${error}`;
  }
}


module.exports = {
  getAll,
  create,
  getEdit,
  setEdit,
  remove,
  getWithNewComments
};
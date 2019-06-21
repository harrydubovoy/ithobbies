// models
const { PostsModel } = require('../post.model');


async function getAll(req) {
  const _id = req.params.id;
  const post = await PostsModel.findById({ _id });
  const comments = post.comments.reverse();

  return comments;
}

async function approve(req) {
  const postId = req.body.postId;
  const commentId = req.body.commentId;
  const post = await PostsModel.findById({ _id: postId });
  const comments = post.comments;
  const comment = comments.id(commentId);

  comment.approved = true;

  try {
    await post.save();
    return 'Comment approved';
  } catch (error) {
    throw new Error(error)
  }
}

async function remove(req) {
  const postId = req.body.postId;
  const commentId = req.body.commentId;
  const post = await PostsModel.findById({ _id: postId });
  const comments = post.comments;

  comments.id(commentId).remove();

  try {
    await post.save();
    return 'Comment deleted';
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getAll,
  approve,
  remove
};
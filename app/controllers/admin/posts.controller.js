// models
const { PostsModel } = require(`${global.MODULE_PATH.MODEL}/post.model`);
const { CategoriesModel } = require(`${global.MODULE_PATH.MODEL}/category.model`);


async function renderAll (req, res) {
  const posts = await PostsModel.find({}).populate('category').sort({ createdAt: -1 });

  res.json(posts);
}

async function renderCreate (req, res) {
  const categories = await CategoriesModel.find();

  res.json({categories})
}

async function create (req, res) {
  const data = req.body;
  const post = new PostsModel(data);

  try {
    await post.save();
    res.send('Post created');
  } catch (e) {
    res.status(400).send('Something went wrong', e);
  }
}

async function renderEdit (req, res) {
  const _id = req.params.id;
  const post = await PostsModel.findById(_id).populate('category', '_id');
  const categories = await CategoriesModel.find();

  res.json({ post, categories })
}

async function edit (req, res) {
  const data = req.body;
  const _id = req.body._id;

  try {
    await PostsModel.updateOne({ _id }, { $set: data});
    res.send('Post edited');
  } catch (e) {
    res.status(400).send('Something went wrong', e);
  }
}

async function remove (req, res) {
  const { _id } = req.body;

  try {
    await PostsModel.findByIdAndRemove({_id});
    res.send('Post deleted');
  } catch (e) {
    res.status(400).send('Something went wrong', e);
  }
}

async function renderWithNewComments (req, res) {

  try {
    const posts = await PostsModel.find({}).populate('category').sort({ createdAt: -1 });

    const hasNewCommentsPosts = posts.filter((post) => {
      const hasNotApproved = post.comments.some((comment) => {
        return !comment.approved;
      });

      return hasNotApproved ? post : null;
    });

    res.json({posts: hasNewCommentsPosts});
  } catch (e) {
    res.status(400).send('Something went wrong', e);
  }
}

module.exports = {
  renderAll,
  renderCreate,
  renderEdit,
  create,
  edit,
  remove,
  renderWithNewComments
};
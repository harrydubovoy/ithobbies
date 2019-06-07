// Models
const { PostsModel } = require(`${global.MODULE_PATH.MODEL}/post.model`);
const { CategoriesModel } = require(`${global.MODULE_PATH.MODEL}/category.model`);


async function renderAll (req, res) {
  try {
    const categories = await CategoriesModel.find();

    res.json(categories);
  } catch (e) {
    res.status(400).redirect('back');
  }
}

async function create (req, res) {
  const { name, slug } = req.body;
  const category = new CategoriesModel({name, slug});

  try {
    await category.save();
    res.send('Category created');
  } catch (error) {
    res.status(400).send(`Something went wrong: ${error}`);
  }
}

async function edit (req, res) {
  const _id = req.body._id;
  const name = req.body.name;
  const slug = req.body.slug;

  try {
    await CategoriesModel.findByIdAndUpdate({_id}, { $set: { name, slug }});
    res.send('Category edited');
  } catch (error) {
    res.status(400).send(`Something went wrong: ${error}`);
  }
}

async function remove (req, res) {
  const { _id } = req.body;

  try {
    await PostsModel.updateMany({ category: _id }, { category: null });
    await CategoriesModel.findByIdAndRemove({_id});
    res.send('Category deleted');
  } catch (e) {
    res.status(400).send('Something went wrong', e);
  }
}

module.exports = {
  renderAll,
  create,
  edit,
  remove
};
// models
const { PostsModel } = require('../post.model');
const { CategoriesModel } = require('../category.model');

async function getAll() {
  try {
    return await CategoriesModel.find();
  } catch (error) {
    throw new Error(error)
  }
}

async function save(req) {
  const { name, slug } = req.body;
  const category = new CategoriesModel({name, slug});

  try {
    await category.save();
    return 'Category created';
  } catch (error) {
    throw new Error(error)
  }
}

async function update(req) {
  const { _id, name, slug } = req.body;

  try {
    await CategoriesModel.findByIdAndUpdate({_id}, { $set: { name, slug }});
    return 'Category edited';
  } catch (error) {
    throw new Error(error)
  }
}

async function remove(req) {
  const { _id } = req.body;

  try {
    await PostsModel.updateMany({ category: _id }, { category: null });
    await CategoriesModel.findByIdAndRemove({_id});
    return 'Category deleted';
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = {
  getAll,
  save,
  update,
  remove
};
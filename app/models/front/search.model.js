// npm
const paginate = require('express-paginate');

// services
const { formatedDate } = require('../../services/date.service');

// models
const { PostsModel } = require('../post.model');
const { CategoriesModel } = require('../category.model');

async function find(req) {
  const string = req.query.search.toLowerCase();
  const [ posts, itemCount ] = await Promise.all([
    PostsModel
      .find({$text: {$search: string}})
      .limit(req.query.limit)
      .skip(req.skip)
      .sort({ createdAt: -1 })
      .populate('category')
      .lean()
      .exec(),
    PostsModel.countDocuments ({})
  ]);
  const categories = await CategoriesModel.find();
  const pageCount = Math.ceil(itemCount / req.query.limit);
  const pages = paginate.getArrayPages(req)(5, pageCount, req.query.page);

  return {
    title: 'itHobbies - Search',
    posts,
    pageCount,
    itemCount,
    pages,
    formatedDate,
    string,
    categories
  }
}

module.exports = {
  find
};
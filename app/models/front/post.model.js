// npm
const paginate = require('express-paginate');

// Models
const { PostsModel } = require('../post.model');
const { CategoriesModel } = require('../category.model');

// services
const { formatedDate } = require('../../services/date.service');
const { isCategory, categoryParam } = require('../../services/category.service');


async function getAll(req) {
  const [ posts, itemCount ] = await Promise.all([
    PostsModel
      .find({published: true})
      .limit(req.query.limit)
      .skip(req.skip)
      .sort({ createdAt: -1 })
      .populate('category')
      .lean()
      .exec(),
    PostsModel.countDocuments({})
  ]);
  const pageCount = Math.ceil(itemCount / req.query.limit);
  const pageCurrent = req.query.page;
  const categories = await CategoriesModel.find();
  const pages = paginate.getArrayPages(req)(5, pageCount, pageCurrent);

  return {
    title: 'itHobbies - Home',
    posts,
    pageCount,
    pageCurrent,
    itemCount,
    pages,
    categories
  }
}


async function getOne(req) {
  const slug = req.params.slug;
  const category = req.params.category;
  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const domain = `${req.protocol}://${req.get('host')}`;

  const categories = await CategoriesModel.find();
  const article = await PostsModel.findOne({ slug });

  if(article && isCategory(categories, category)) {
    article.comments = article.comments.filter(comment => comment.approved);

    return {
      title: `itHobbies - ${article.title}`,
      article,
      categories,
      category,
      url,
      domain,
      formatedDate
    }
  }
}


async function getInCategory(req) {
  const category = req.params.category;
  const [ posts, itemCount ] = await Promise.all([
    PostsModel
      .find({published: true})
      .limit(req.query.limit)
      .skip(req.skip)
      .sort({ createdAt: -1 })
      .populate({
        path: 'category',
        match: { slug: category }
      })
      .lean()
      .exec(),
    PostsModel.countDocuments ({})
  ]);
  const postCategory = posts.filter(post => post.category);
  const categories = await CategoriesModel.find();
  const currentCategoryName = categoryParam(categories, category, 'name');
  const pageCount = Math.ceil(itemCount / req.query.limit);
  const pageCurrent = req.query.page;
  const pages = paginate.getArrayPages(req)(5, pageCount, pageCurrent);

  if(postCategory.length || isCategory(categories, category)) {
    return {
      title: `itHobbies - ${currentCategoryName}`,
      posts: postCategory,
      pageCount,
      pageCurrent,
      itemCount,
      pages,
      categories,
      category
    }
  }
}


module.exports = {
  getAll,
  getOne,
  getInCategory,
};
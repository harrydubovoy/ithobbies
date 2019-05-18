// npm
const moment = require('moment');
const paginate = require('express-paginate');

// models
const { PostsModel } = require(`${global.MODULE_PATH.MODEL}/post.model`);
const { CategoriesModel } = require(`${global.MODULE_PATH.MODEL}/category.model`);

// services
const { formatedDate } = require('../../services');

async function render(req, res) {
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
    const pageCount = Math.ceil(itemCount / req.query.limit);
    const categories = await CategoriesModel.find();

    res.render('front/search', {
        title: 'itHobbies - Search',
        posts,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(5, pageCount, req.query.page),
        formatedDate,
        string,
        categories
    })
}

module.exports = {
    render
};
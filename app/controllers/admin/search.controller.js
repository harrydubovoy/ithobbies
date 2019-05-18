// npm
const paginate = require('express-paginate');

// models
const { PostsModel } = require(`${global.MODULE_PATH.MODEL}/post.model`);

// services
const { formatedDate } = require('../../services');

async function render(req, res) {
    const string = req.query.search.toLowerCase();
    console.log(string)
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

    res.render('admin/search', {
        title: 'Dashboard - Search',
        posts,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(5, pageCount, req.query.page),
        formatedDate,
        string
    })
}

module.exports = {
    render
};
// npm
const paginate = require('express-paginate');

// Models
const { PostsModel } = require(`${global.MODULE_PATH.MODEL}/post.model`);
const { CategoriesModel } = require(`${global.MODULE_PATH.MODEL}/category.model`);

// services
const { formatedDate } = require('../../services');
const { isCategory } = require('../../services/category');


async function renderAll (req, res) {
        const [ posts, itemCount ] = await Promise.all([
            PostsModel
                .find({published: true})
                .limit(req.query.limit)
                .skip(req.skip)
                .sort({ createdAt: -1 })
                .populate('category')
                .lean()
                .exec(),
            PostsModel.countDocuments ({})
        ]);
        const pageCount = Math.ceil(itemCount / req.query.limit);
        const pageCurrent = req.query.page;
        const categories = await CategoriesModel.find();
        // console.log(posts)

        res.render('front/home', {
            title: 'Home',
            posts,
            pageCount,
            pageCurrent,
            itemCount,
            pages: paginate.getArrayPages(req)(5, pageCount, pageCurrent),
            categories
        })
}

async function renderOne (req, res) {
    const slug = req.params.slug;
    const category = req.params.category;
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const domain = `${req.protocol}://${req.get('host')}`;

    const categories = await CategoriesModel.find();
    const article = await PostsModel.findOne({ slug });

    if(article && isCategory(categories, category)) {
        article.comments = article.comments.filter(comment => comment.approved);

        res.render('front/article', {
            title: `itHobbies - ${article.title}`,
            article,
            categories,
            category,
            url,
            domain,
            formatedDate
        })
    } else {
        res.render('front/404');
    }

}

async function renderCategory (req, res) {
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
    const pageCount = Math.ceil(itemCount / req.query.limit);
    const pageCurrent = req.query.page;
    const categories = await CategoriesModel.find();

    if(postCategory.length || isCategory(categories, category)) {
        res.render('front/home', {
            title: 'Home',
            posts: postCategory,
            pageCount,
            pageCurrent,
            itemCount,
            pages: paginate.getArrayPages(req)(5, pageCount, pageCurrent),
            categories,
            category
        })
    } else {
        res.render('front/404');
    }
}


module.exports = {
    renderAll,
    renderOne,
    renderCategory
};
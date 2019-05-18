// npm
const paginate = require('express-paginate');

// models
const { PostsModel } = require(`${global.MODULE_PATH.MODEL}/post.model`);
const { CategoriesModel } = require(`${global.MODULE_PATH.MODEL}/category.model`);

// services
const { crop, formatedDate, validateMessage } = require('../../services');


async function renderAll (req, res) {
    const [ posts, itemCount ] = await Promise.all([
        PostsModel
            .find({})
            .limit(req.query.limit)
            .skip(req.skip)
            .sort({ createdAt: -1 })
            .populate('category')
            .lean()
            .exec(),
        PostsModel.countDocuments ({})
    ]);
    const pageCount = Math.ceil(itemCount / req.query.limit);

    res.render('admin/posts', {
        title: 'Dashboard - Posts',
        posts,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(5, pageCount, req.query.page),
        formatedDate
    })
}

async function renderCreate (req, res) {
    const categories = await CategoriesModel.find();

    res.render('admin/article', {
        title: 'Dashboard - Create Post',
        page: 'Create',
        action: 'create-post',
        post: {
            image: null,
            title: '',
            text: '',
            published: false,
            category: null
        },
        categories
    })
}

async function renderEdit (req, res) {
    const _id = req.params.id;
    const post = await PostsModel.findById(_id).populate('category');
    const categories = await CategoriesModel.find();

    res.render('admin/article', {
        title: 'Dashboard - Edit Posts',
        page: 'Edit',
        action: 'edit-post',
        post,
        categories
    })
}

async function create (req, res) {
    const file = req.file;
    let data = req.body;

    if(file) {
        crop(file, 'medium');
        const image = file.originalname;
        const thumb = `thumb-${file.originalname}`;
        data = {...data, image, thumb }
    }
    const post = new PostsModel(data);

    try {
        await post.save();
        req.flash('success', 'New post created');
        res.redirect('posts');
    } catch (e) {
        req.flash('danger', `Something went wrong: ${validateMessage(req)}`);
        res.status(400).redirect('back');
    }
}

async function edit (req, res) {
    const file = req.file;
    let data = req.body;
    const _id = req.body.id;

    if(file) {
        crop(file, 'medium');
        const image = file.originalname;
        const thumb = `thumb-${file.originalname}`;
        data = { ...data, image, thumb }
    }

    try {
        await PostsModel.updateOne({ _id }, { $set: data});
        req.flash('success', `Post edited`);
        res.redirect('back');
    } catch (e) {
        req.flash('danger', `Something went wrong: ${validateMessage(req)}`);
        res.redirect('back');
    }
}

async function remove (req, res) {
    const _id = req.body.id;

    try {
        await PostsModel.findByIdAndRemove({_id});
        res.send('Post deleted');
    } catch (e) {
        res.send('Something went wrong', e);
    }
}

module.exports = {
    renderAll,
    renderCreate,
    renderEdit,
    create,
    edit,
    remove
};
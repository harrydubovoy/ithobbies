// Models
const { CategoriesModel } = require(`${global.MODULE_PATH.MODEL}/category.model`);

// Services
const { validateMessage } = require('../../services');

async function renderAll (req, res) {
    const categories = await CategoriesModel.find();

    res.render('admin/categories', {
        title: 'Dashboard - Categories',
        categories
    })
}

async function create (req, res) {
    const data = req.body;
    const category = new CategoriesModel(data);

    try {
        await category.save();
        req.flash('success', 'Category created');
        res.redirect('back');
    } catch (e) {
        req.flash('danger', `Something went wrong: ${validateMessage(req)}`);
        res.status(400).redirect('back');
    }
}

async function edit (req, res) {
    const _id = req.body.id;
    const name = req.body.name;
    const slug = req.body.slug;

    try {
        await CategoriesModel.findByIdAndUpdate({_id}, { $set: { name, slug }});
        res.send('Category changed');
    } catch (e) {
        res.send('Something went wrong', e);
    }
}

async function remove (req, res) {
    const _id = req.body.id;

    try {
        await CategoriesModel.findByIdAndRemove({_id});
        res.send('Category deleted');
    } catch (e) {
        res.send('Something went wrong', e);
    }
}

module.exports = {
    renderAll,
    create,
    edit,
    remove
};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true }
});

const CategoriesModel = mongoose.model('Categories', categoriesSchema);


module.exports = {
    CategoriesModel
};
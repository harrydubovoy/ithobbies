const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// services
const { slugify } = require('../services/text.service');

const postsSchema = new Schema({
    image: { type: String, required: true },
    thumb: String,
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String, required: true },
    comments: [ new Schema({
        author: { type: String },
        email: { type: String },
        text: { type: String },
        date: { type: Date, default: Date.now },
        approved: { type: Boolean, default: false }
    })],
    slug: String,
    category: { type: Schema.Types.ObjectId, ref: 'Categories' },
    published: { type: Boolean, default: false }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

postsSchema.pre('updateOne', function(next) {
    const slug = slugify(this._update.$set.title);
    this.update({},{ $set: { slug } });
    next();
});

postsSchema.pre('save', function(next) {
    this.slug = slugify(this.title);
    next();
});

postsSchema.index({'$**': 'text'});

const PostsModel = mongoose.model('Posts', postsSchema);


module.exports = {
    PostsModel
};
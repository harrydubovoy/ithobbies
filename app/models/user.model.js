const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const Users = mongoose.model('Users', userSchema);

module.exports = {
    Users
};
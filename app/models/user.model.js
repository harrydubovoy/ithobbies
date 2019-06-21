const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userModel = new Schema({
    username: String,
    password: String
});

userModel.plugin(passportLocalMongoose);

const Users = mongoose.model('Users', userModel);

module.exports = {
    Users
};
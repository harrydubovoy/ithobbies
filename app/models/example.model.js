const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// *
// Example
// *
const exampleSchema = new Schema({
    name:  String,
    photo: String,
    description:   String
});

const Example = mongoose.model('Example', exampleSchema)

// *
// User
// *
const UserSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    passwordHash: { 
        type: String, 
        required: true 
    }
});

const Users = mongoose.model('Users', UserSchema)


module.exports = {
    Example,
    Users
};
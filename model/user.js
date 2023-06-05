const mongoose = require('mongoose');
const Books = require('./books');

const User = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true
    },
    booksRead: Array
});

module.exports = mongoose.model('UserDB', User), User

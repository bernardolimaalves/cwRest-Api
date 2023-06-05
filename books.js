const mongoose = require('mongoose');

const Books = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },    
    author: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    ISBN: {
        type: String,
        required: true
    },
    pageCount:{
        type: Number,
        required: true
    }
})

const BooksM = mongoose.model('BooksDB', Books)
module.exports = {
    BooksM,
    Books
}
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = mongoose.Schema({
    name: {
        first: String,
        last: String,
        username: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    saved_articles: [{
        type: ObjectId,
        ref: 'Article'
    }],
    account_type: {
        free: Boolean,
        paid: Boolean
    }
})

module.exports = mongoose.model('User', User);
const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;

const Article = mongoose.Schema({
    id: String,
    name: String,
    url: String,
    timestamp: Date,
    description: String,
    keywords: [String],
    summary: String,
    content: String,
    clickbait: String
});

module.exports = mongoose.model('Article', Article);
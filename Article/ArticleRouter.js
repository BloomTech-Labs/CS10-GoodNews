const router = require('express').Router();
const Article = require('./Article');

// Router to /api/article endpoint
router.route('/').get(get);
router.route('/:id').get(getID).put(putSavedArticle);

// GET request for all articles
function get(req, res) {
    Article.find()
        .then(expected => {
            res.status(200).json(expected);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
}

// GET request for Article ID
function getID(req, res) {
    const id = req.params.id;
    Article.findById(id)
    .then(found_article => {
        res.status(200).json(found_article);
    })
    .catch(err => {
        res.status(500).json(err.message);
    });
}

// PUT request to User's saved_articles
function putSavedArticle(req, res) {
    const article_id = req.params.id;
    const { user_id } = req.headers;
    Article.findById(article_id)
    .then(found_article => {
        User.findById({ _id: user_id })
        .then(user => {
            let savedArticles = user.saved_articles.push(found_article._id);
            res.status(200).json(savedArticles);
        })
    })
    .catch(err => {
        res.status(500).json(err.message);
    });
}

module.exports = router;
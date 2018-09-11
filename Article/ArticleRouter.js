const router = require('express').Router();
const Article = require('./Article');

// Router to /api/article endpoint
router
    .route('/')
    .get(get)
    .post(postSavedArticle)

// GET request
function get(req, res) {
    Article.find()
        .then(expected => {
            res.status(200).json(expected);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error in GET' });
        });
}

// POST request to User's saved_articles
function postSavedArticle(req, res) {
    const id = req.params.id;
    const { user_id } = req.headers;
    Article.findById(id)
    .then(found_article => {
        User.findById({id: user_id})
        .then(user => {
            let savedArticles = user.saved_articles.push(found_article.id)
            res.status(200).json(savedArticles);
        })
    })
    .catch(err => {
        res.status(500).json({ message: 'Unable to save the article!' })
    });
}

module.exports = router;
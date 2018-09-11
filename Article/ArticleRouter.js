const router = require('express').Router();
const Article = require('./Article');

// Router to /api/article endpoint
router
    .route('/')
    .get(get)
    .put(putSavedArticle)

// GET request
function get(req, res) {
    ArticleObj.find()
        .then(expected => {
            // console.log(expected);
            res.status(200).json(expected);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
}

// PUT request to User's saved_articles
function putSavedArticle(req, res) {
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
        res.status(500).json(err.message);
    });
}

module.exports = router;
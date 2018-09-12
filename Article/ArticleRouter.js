const router = require('express').Router();
const Article = require('./Article');
const User = require('../User/User');

// Router to /api/article endpoint
router.route('/').get(get).post(post);
router.route('/:id').get(getID);
router.route('/:article_id/:type').put(putSavedArticle);

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

// POST to create a new Article document
function post(req, res) {
    const article = new Article(req.body);
    article
    .save()
    .then(expected => {
        res.status(201).json(expected);
    })
    .catch(err => {
        res.status(500).json(err.message)
    });
}

// PUT request to User's saved_articles
function putSavedArticle(req, res) {
    const { article_id, type } = req.params;
    const { user_id } = req.headers;
    console.log(article_id, type, user_id);
    Article.findById(article_id)
    .then(found_article => {
        console.log(`Found Article ${found_article}`);
        User.findById({ _id: user_id })
        .then(user => {
            console.log(`Found User ${user}`);
                switch (type) {
                    case 'add':
                        let savedArticles = user.saved_articles.push(found_article._id);
                        res.status(200).json(savedArticles);
                        break;
                    case 'del':
                        const delArticleId = user.saved_articles.indexOf(found_article._id);
                        let delSavedArticles = user.saved_articles.splice(delArticleId, 1);
                        res.status(200).json(delSavedArticles);
                        break;
                    default:
                        res.status(500).json('Error adding/deleting an article!');
                        break;
                }
        })
    })
    .catch(err => {
        res.status(500).json(err.message);
    });
}

module.exports = router;
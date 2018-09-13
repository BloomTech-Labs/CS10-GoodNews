const router = require('express').Router();
const Article = require('./Article');
const User = require('../User/User');
const { isLoggedIn } = require('../controllers/auth');

// Router to /api/article endpoint
router.route('/').get(get).post(isLoggedIn, post);
router.route('/:articleid').get(getByID);
router.route('/:articleid/:type').put(isLoggedIn, putSavedArticle);

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
function getByID(req, res) {
    const articleid = req.params.articleid;
    Article.findById(articleid)
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
    const { articleid, type } = req.params;
    const { userid } = req.headers;
    // console.log(article_id, type, userid);
    Article.findById(articleid)
    .then(found_article => {
        // console.log(`Found Article ${found_article}`);
        User.findById({ _id: userid })
        .then(user => {
            // console.log(`Found User ${user}`);
                switch (type) {
                    case 'add':
                        user.saved_articles.push(found_article._id);
                        res.status(200).json(user);
                        break;
                    case 'del':
                        const delArticleId = user.saved_articles.indexOf(found_article._id);
                        user.saved_articles.splice(delArticleId, 1);
                        res.status(200).json(user);
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
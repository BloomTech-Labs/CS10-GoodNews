const router = require('express').Router();
const Article = require('./Article');
const User = require('../User/User');
const { isLoggedIn } = require('../controllers/auth');

// GET top 5 keywords. Error: 
router.route('/topfive').get(getTopFive);

// GET Article by keyword. Erro: "Cast to ObjectId failed for value \"authors\" at path \"_id\" for model \"Article\""
router.route('/:keyword').get(getByKey);

// GET User's saved articles
router.route('/user-saved').get(isLoggedIn, getUserSaved)

// Router to /api/article endpoint
router.route('/').get(getAll).post(isLoggedIn, post);
router.route('/:articleid').get(getByID);
router.route('/:articleid/:type').put(isLoggedIn, putSavedArticle);

// GET generate top keywords for Trending Topics
function getTopFive(req, res) {
    // { $match: {timestamp: {"$gt": new Date(Date.now() - 24*60*60 * 1000)}}},
    Article
    .aggregate([
        { $project: { keywords: 1 }},
        { $unwind: '$keywords' },
        { $group: {
            _id: { keyword: '$keywords' },
            count: { $sum: 1 },
            }
        },
        { $sort: { count: -1 }}
    ], (err, topKeys) => {
        if (err) res.status(500).json(err);
        const topFive = topKeys.slice(0, 5);
        res.status(200).json(topFive);
    });
}

// GET get articles by keyword Route=/:keyword
function getByKey(req, res) {
    const keyword = req.params.keyword;

    Article.find({ keywords: keyword })
    .then(articles => {
        res.status(200).json(articles);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

// GET request for all articles
function getAll(req, res) {
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

// GET User's saved_articles
function getUserSaved(req, res) {
    const { userid } = req.headers;
    User.findById({ _id: userid })
    .populate('saved_articles')
    .then(expected => {
        res.status(200).json(expected);
    })
    .catch(err => res.status(500).json(err));
}

module.exports = router;
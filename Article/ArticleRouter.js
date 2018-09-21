const router = require('express').Router();
const Article = require('./Article');
const User = require('../User/User');
const { isLoggedIn } = require('../controllers/auth');

// POST to /api/article/ endpoint
router.route('/post-article').post(isLoggedIn, post);
// GET Articles with either 1 or 0 flag for clickbait
router.route('/get-articles/:flag').get(getArticles);
// GET Article by its _id
router.route('/get/:articleid').get(getArticleId);
// GET User's saved articles. 
router.route('/user-saved').get(isLoggedIn, getUserSaved);
// GET top 5 keywords.
router.route('/topfive').get(getTopFive);
// GET Article by keyword.
router.route('/:keyword').get(getKey);
// PUT - add or del into/from User's saved_articles
router.route('/:articleid/:type').put(isLoggedIn, putSavedArticle);

// GET generate top keywords for Trending Topics
function getTopFive(req, res) {
    // { $match: {timestamp: {"$gt": new Date(Date.now() - 24*60*60 * 1000)}}},
    Article
    .aggregate([
        { $match: { 'clickbait': '0' }},
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
function getKey(req, res) {
    const keyword = req.params.keyword;

    Article.find({ keywords: keyword, clickbait: '0' })
    .sort({ timestamp: -1 })
    .then(articles => {
        res.status(200).json(articles);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

// GET request for articles
function getArticles(req, res) {
    const flag = req.params.flag;
    // console.log(`typeof ${flag}`);
    switch (flag) {
        case '0':
            Article.find({ clickbait: '0' })
            .sort({ timestamp: -1 })
            .then(found_articles => res.status(200).json(found_articles))
            .catch(err => res.status(500).json(err));
            break;
        case '1':
            Article.find({ clickbait: '1' })
            .sort({ timestamp: -1 })
            .then(found_articles => res.status(200).json(found_articles))
            .catch(err => res.status(500).json(err));
            break;
        default:
            Article.find()
            .sort({ timestamp: -1 })
            .then(expected => res.status(200).json(expected))
            .catch(err => res.status(500).json(err.message));
            break;
    }
}

// GET request for Article ID
function getArticleId(req, res) {
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
        .then(foundUser => {
            // console.log(`Found User ${user}`);
                switch (type) {
                    case 'add':
                        foundUser.saved_articles.push(found_article);
                        User.findByIdAndUpdate(userid, { saved_articles: foundUser.saved_articles })
                            .then(() => {
                                User.find({_id: userid})
                                .then(updatedUser => res.status(200).json(updatedUser))
                                .catch(err => res.status(500).json(err))
                            })
                            .catch(err => res.status(500).json(err));
                        break;
                    case 'del':
                        // const delArticleId = user.saved_articles.indexOf(found_article._id);
                        // user.saved_articles.splice(delArticleId, 1);
                        foundUser.saved_articles.pull(found_article);
                        User.findByIdAndUpdate(userid, { saved_articles: foundUser.saved_articles })
                            .then(() => {
                                User.find({_id: userid})
                                .then(deletedUser => res.status(200).json(deletedUser))
                                .catch(err => res.status(500).json(err))
                            })
                            .catch(err => res.status(500).json(err))
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

// GET User's saved_articles.
function getUserSaved(req, res) {
    const { userid } = req.headers;
    User.findById(userid)
    .populate({ path: 'saved_articles', options: { sort: { timestamp: -1 }}})
    .then(expected => {
        // console.log(expected);
        res.status(200).json(expected);
    })
    .catch(err => res.status(500).json(err));
}

module.exports = router;